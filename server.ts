import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { dbStore, hashPassword, User } from './src/server/store';

dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'mari_nail_designer_jwt_secret_2026';

// Middleware
app.use(express.json());
app.use(cookieParser());

// User payload interface
export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'client';
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// Authentication Middleware
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.auth_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
  } catch (err) {
    // Token expired or invalid
    res.clearCookie('auth_token');
  }
  next();
}

// Admin authorization guard
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autenticado. Por favor faça login.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado: Permissão restrita a administradores.' });
  }

  next();
}

app.use(authMiddleware);

// =========================================
// AUTH ROUTES
// =========================================

// POST /api/auth/login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const user = dbStore.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  const inputHash = hashPassword(password);
  if (inputHash !== user.passwordHash) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  const payload: AuthUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  // Set httpOnly secure cookie
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json({
    user: payload,
    message: 'Login realizado com sucesso.',
  });
});

// GET /api/auth/me
app.get('/api/auth/me', (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }
  return res.json({ user: req.user });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('auth_token');
  return res.json({ message: 'Sessão encerrada com sucesso.' });
});

// =========================================
// PUBLIC SERVICES & CONFIG
// =========================================

// GET /api/services
app.get('/api/services', (req: Request, res: Response) => {
  return res.json(dbStore.getServices());
});

// GET /api/config
app.get('/api/config', (req: Request, res: Response) => {
  return res.json(dbStore.getConfig());
});

// GET /api/business-hours
app.get('/api/business-hours', (req: Request, res: Response) => {
  return res.json(dbStore.getBusinessHours());
});

// GET /api/bookings/occupied-slots?date=YYYY-MM-DD
app.get('/api/bookings/occupied-slots', (req: Request, res: Response) => {
  const date = req.query.date as string;
  if (!date) {
    return res.status(400).json({ error: 'Data é obrigatória.' });
  }
  const occupiedSlots = dbStore.getOccupiedSlotsForDate(date);
  return res.json({ date, occupiedSlots });
});

// POST /api/bookings (Public booking with double-booking protection)
app.post('/api/bookings', (req: Request, res: Response) => {
  const { serviceId, serviceName, servicePrice, date, timeSlot, clientName, clientPhone, notes } = req.body;

  if (!serviceId || !date || !timeSlot || !clientName || !clientPhone) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios do agendamento.' });
  }

  const result = dbStore.addBooking({
    serviceId,
    serviceName: serviceName || 'Procedimento',
    servicePrice: servicePrice || '',
    date,
    timeSlot,
    clientName,
    clientPhone,
    notes: notes || '',
  });

  if (result.error) {
    return res.status(409).json({ error: result.error });
  }

  return res.status(201).json(result.booking);
});

// =========================================
// PROTECTED ADMIN ROUTES (requireAdmin)
// =========================================

// GET /api/admin/bookings
app.get('/api/admin/bookings', requireAdmin, (req: Request, res: Response) => {
  return res.json(dbStore.getBookings());
});

// PATCH /api/admin/bookings/:id/status
app.patch('/api/admin/bookings/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'confirmed', 'recused', 'cancelled', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Status de agendamento inválido.' });
  }

  const updated = dbStore.updateBookingStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Agendamento não encontrado.' });
  }

  return res.json(updated);
});

// POST /api/admin/services
app.post('/api/admin/services', requireAdmin, (req: Request, res: Response) => {
  const { name, category, description, duration, price, numericPrice, popular, iconName, image } = req.body;

  if (!name || !price || !duration) {
    return res.status(400).json({ error: 'Nome, preço e duração são obrigatórios.' });
  }

  const newService = dbStore.addService({
    name,
    category: category || 'alongamento',
    description: description || '',
    duration,
    price,
    numericPrice: Number(numericPrice) || 0,
    popular: Boolean(popular),
    iconName: iconName || 'Sparkles',
    image: image || 'https://i.postimg.cc/brszvv8Q/Whats-App-Image-2026-08-08-at-16-40-37.jpg',
  });

  return res.status(201).json(newService);
});

// PUT /api/admin/services/:id
app.put('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = dbStore.updateService(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: 'Serviço não encontrado.' });
  }

  return res.json(updated);
});

// DELETE /api/admin/services/:id
app.delete('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const success = dbStore.deleteService(id);

  if (!success) {
    return res.status(404).json({ error: 'Serviço não encontrado.' });
  }

  return res.json({ message: 'Serviço excluído com sucesso.' });
});

// PUT /api/admin/business-hours
app.put('/api/admin/business-hours', requireAdmin, (req: Request, res: Response) => {
  const updated = dbStore.updateBusinessHours(req.body);
  return res.json(updated);
});

// GET /api/admin/blocked-slots
app.get('/api/admin/blocked-slots', requireAdmin, (req: Request, res: Response) => {
  return res.json(dbStore.getBlockedSlots());
});

// POST /api/admin/blocked-slots
app.post('/api/admin/blocked-slots', requireAdmin, (req: Request, res: Response) => {
  const { date, timeSlot, reason } = req.body;

  if (!date || !timeSlot) {
    return res.status(400).json({ error: 'Data e horário são obrigatórios.' });
  }

  const blocked = dbStore.addBlockedSlot(date, timeSlot, reason);
  return res.status(201).json(blocked);
});

// DELETE /api/admin/blocked-slots/:id
app.delete('/api/admin/blocked-slots/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const success = dbStore.removeBlockedSlot(id);

  if (!success) {
    return res.status(404).json({ error: 'Bloqueio não encontrado.' });
  }

  return res.json({ message: 'Horário desbloqueado com sucesso.' });
});

// PUT /api/admin/config
app.put('/api/admin/config', requireAdmin, (req: Request, res: Response) => {
  const updated = dbStore.updateConfig(req.body);
  return res.json(updated);
});

// =========================================
// VITE MIDDLEWARE & SERVER BOOTSTRAP
// =========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Mari Nail Designer rodando na porta ${PORT}`);
  });
}

startServer();
