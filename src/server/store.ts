import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ServiceItem, BookingData, StudioConfig } from '../types';
import { INITIAL_CONFIG, INITIAL_SERVICES } from '../data/initialData';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'client';
  name: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  timeSlot: string;
  reason?: string;
}

export interface BusinessHours {
  workingDays: string[]; // e.g. ['terca', 'quarta', 'quinta', 'sexta', 'sabado']
  openTime: string; // '09:00'
  closeTime: string; // '19:00'
  slotInterval: number; // minutes, e.g. 90
  availableSlots: string[]; // ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30']
}

export interface DatabaseSchema {
  users: User[];
  services: ServiceItem[];
  bookings: BookingData[];
  businessHours: BusinessHours;
  blockedSlots: BlockedSlot[];
  config: StudioConfig;
}

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tonollibrenno@gmail.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  workingDays: ['terca', 'quarta', 'quinta', 'sexta', 'sabado'],
  openTime: '09:00',
  closeTime: '19:00',
  slotInterval: 90,
  availableSlots: ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'],
};

function initDb(): DatabaseSchema {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const adminUser: User = {
    id: 'user-admin-1',
    email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
    role: 'admin',
    name: 'Mari Nail Admin',
  };

  const initialData: DatabaseSchema = {
    users: [adminUser],
    services: INITIAL_SERVICES,
    bookings: [],
    businessHours: DEFAULT_BUSINESS_HOURS,
    blockedSlots: [],
    config: INITIAL_CONFIG,
  };

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    // Ensure admin user exists with current credentials
    let users = parsed.users || [];
    const existingAdminIdx = users.findIndex(
      (u: User) => u.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()
    );

    if (existingAdminIdx >= 0) {
      users[existingAdminIdx] = {
        ...users[existingAdminIdx],
        role: 'admin',
        passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
      };
    } else {
      users.push(adminUser);
    }

    const merged: DatabaseSchema = {
      users,
      services: parsed.services?.length ? parsed.services : INITIAL_SERVICES,
      bookings: parsed.bookings || [],
      businessHours: parsed.businessHours || DEFAULT_BUSINESS_HOURS,
      blockedSlots: parsed.blockedSlots || [],
      config: parsed.config || INITIAL_CONFIG,
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    return merged;
  } catch (err) {
    console.error('Failed to read db.json, re-initializing store:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

class Store {
  private data: DatabaseSchema;

  constructor() {
    this.data = initDb();
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save db.json:', err);
    }
  }

  // Users
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  // Services
  getServices(): ServiceItem[] {
    return this.data.services;
  }

  addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const newService: ServiceItem = {
      ...service,
      id: 'srv-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    };
    this.data.services.push(newService);
    this.save();
    return newService;
  }

  updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const idx = this.data.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.services[idx] = { ...this.data.services[idx], ...updates };
    this.save();
    return this.data.services[idx];
  }

  deleteService(id: string): boolean {
    const initialLen = this.data.services.length;
    this.data.services = this.data.services.filter((s) => s.id !== id);
    if (this.data.services.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Bookings
  getBookings(): BookingData[] {
    return this.data.bookings;
  }

  isSlotOccupied(date: string, timeSlot: string): boolean {
    // Check if slot is in blockedSlots
    const isBlocked = this.data.blockedSlots.some(
      (b) => b.date === date && b.timeSlot === timeSlot
    );
    if (isBlocked) return true;

    // Check if there is already an active booking (pending or confirmed or completed)
    const activeBooking = this.data.bookings.some(
      (b) =>
        b.date === date &&
        b.timeSlot === timeSlot &&
        (b.status === 'pending' || b.status === 'confirmed')
    );

    return activeBooking;
  }

  getOccupiedSlotsForDate(date: string): string[] {
    const occupiedFromBookings = this.data.bookings
      .filter((b) => b.date === date && (b.status === 'pending' || b.status === 'confirmed'))
      .map((b) => b.timeSlot);

    const occupiedFromBlocked = this.data.blockedSlots
      .filter((b) => b.date === date)
      .map((b) => b.timeSlot);

    return Array.from(new Set([...occupiedFromBookings, ...occupiedFromBlocked]));
  }

  addBooking(bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>): {
    booking?: BookingData;
    error?: string;
  } {
    if (this.isSlotOccupied(bookingData.date, bookingData.timeSlot)) {
      return {
        error: 'Este horário já está reservado ou bloqueado. Por favor, escolha outro horário.',
      };
    }

    const newBooking: BookingData = {
      ...bookingData,
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      status: 'pending',
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    this.data.bookings.unshift(newBooking);
    this.save();
    return { booking: newBooking };
  }

  updateBookingStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'recused' | 'cancelled' | 'completed'
  ): BookingData | null {
    const booking = this.data.bookings.find((b) => b.id === id);
    if (!booking) return null;
    (booking as any).status = status;
    this.save();
    return booking;
  }

  // Business Hours & Blocked Slots
  getBusinessHours(): BusinessHours {
    return this.data.businessHours;
  }

  updateBusinessHours(updates: Partial<BusinessHours>): BusinessHours {
    this.data.businessHours = { ...this.data.businessHours, ...updates };
    this.save();
    return this.data.businessHours;
  }

  getBlockedSlots(): BlockedSlot[] {
    return this.data.blockedSlots;
  }

  addBlockedSlot(date: string, timeSlot: string, reason?: string): BlockedSlot {
    const existing = this.data.blockedSlots.find(
      (b) => b.date === date && b.timeSlot === timeSlot
    );
    if (existing) return existing;

    const newBlocked: BlockedSlot = {
      id: 'blk-' + Date.now(),
      date,
      timeSlot,
      reason,
    };
    this.data.blockedSlots.push(newBlocked);
    this.save();
    return newBlocked;
  }

  removeBlockedSlot(id: string): boolean {
    const initialLen = this.data.blockedSlots.length;
    this.data.blockedSlots = this.data.blockedSlots.filter((b) => b.id !== id);
    if (this.data.blockedSlots.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Config
  getConfig(): StudioConfig {
    return this.data.config;
  }

  updateConfig(updates: Partial<StudioConfig>): StudioConfig {
    this.data.config = { ...this.data.config, ...updates };
    this.save();
    return this.data.config;
  }
}

export const dbStore = new Store();
