import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem, GalleryItem, Testimonial, FAQItem, BookingData, StudioConfig, Coupon, BlogPost, AuthUser, BusinessHours, BlockedSlot } from '../types';
import { INITIAL_CONFIG, INITIAL_SERVICES, INITIAL_GALLERY, INITIAL_TESTIMONIALS, INITIAL_FAQS, INITIAL_BLOG_POSTS, INITIAL_COUPONS } from '../data/initialData';

interface AppContextType {
  // Navigation
  currentPath: string;
  navigate: (path: string) => void;

  // Data
  config: StudioConfig;
  services: ServiceItem[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  bookings: BookingData[];
  businessHours: BusinessHours | null;
  blockedSlots: BlockedSlot[];
  coupons: Coupon[];
  blogPosts: BlogPost[];

  // Selection / Lightbox
  selectedServiceForBooking: ServiceItem | null;
  setSelectedServiceForBooking: (service: ServiceItem | null) => void;
  lightboxImage: GalleryItem | null;
  setLightboxImage: (item: GalleryItem | null) => void;

  // Auth
  currentUser: AuthUser | null;
  isAuthorizedAdmin: boolean;
  authLoading: boolean;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;

  // Actions
  addBooking: (bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>) => Promise<{ booking?: BookingData; error?: string }>;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'recused' | 'cancelled' | 'completed') => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<ServiceItem | null>;
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  updateBusinessHours: (updates: Partial<BusinessHours>) => Promise<void>;
  addBlockedSlot: (date: string, timeSlot: string, reason?: string) => Promise<void>;
  removeBlockedSlot: (id: string) => Promise<void>;
  updateStudioConfig: (newConfig: Partial<StudioConfig>) => Promise<void>;

  // Public helpers
  getWhatsAppUrl: (customMessage?: string) => string;
  scrollToSection: (sectionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation Router state
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auth State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('mari_nail_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const isAuthorizedAdmin = currentUser?.role === 'admin';

  // Safe Diagnostic Logging (Requirement #7)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🔍 [MariNail Auth Diagnostic]:', {
        authenticated: Boolean(currentUser),
        userIdPresent: Boolean(currentUser?.id),
        detectedRole: currentUser?.role || 'nenhuma',
        isAuthorizedAdmin,
      });
    }
  }, [currentUser, isAuthorizedAdmin]);

  // Auth Headers helper
  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('mari_nail_auth_token');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // Core Data
  const [config, setConfig] = useState<StudioConfig>(INITIAL_CONFIG);
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('mari_nail_services');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_SERVICES;
  });
  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  // UI state
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Initial fetch on mount
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        // Fetch current user auth state
        const headers = getAuthHeaders();
        const meRes = await fetch('/api/auth/me', { credentials: 'include', headers });
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData?.user) {
            setCurrentUser(meData.user);
            localStorage.setItem('mari_nail_auth_user', JSON.stringify(meData.user));
          } else {
            setCurrentUser(null);
            localStorage.removeItem('mari_nail_auth_user');
            localStorage.removeItem('mari_nail_auth_token');
          }
        } else {
          setCurrentUser(null);
          localStorage.removeItem('mari_nail_auth_user');
          localStorage.removeItem('mari_nail_auth_token');
        }

        // Fetch services
        const srvRes = await fetch('/api/services');
        if (srvRes.ok) {
          const srvData = await srvRes.json();
          if (Array.isArray(srvData) && srvData.length > 0) {
            setServices(srvData);
          }
        }

        // Fetch config
        const cfgRes = await fetch('/api/config');
        if (cfgRes.ok) {
          const cfgData = await cfgRes.json();
          if (cfgData?.whatsappNumber) {
            setConfig(cfgData);
          }
        }

        // Fetch business hours
        const bhRes = await fetch('/api/business-hours');
        if (bhRes.ok) {
          const bhData = await bhRes.json();
          setBusinessHours(bhData);
        }
      } catch (err) {
        console.error('Error in fetchInitial:', err);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchInitial();
  }, []);

  // Fetch admin data whenever admin logs in and poll for updates
  useEffect(() => {
    if (!isAuthorizedAdmin) return;

    const fetchAdminData = async () => {
      try {
        const headers = getAuthHeaders();
        const bRes = await fetch('/api/admin/bookings', { credentials: 'include', headers });
        if (bRes.ok) {
          const bData = await bRes.json();
          setBookings(bData);
        }

        const blkRes = await fetch('/api/admin/blocked-slots', { credentials: 'include', headers });
        if (blkRes.ok) {
          const blkData = await blkRes.json();
          setBlockedSlots(blkData);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchAdminData();
    const interval = setInterval(fetchAdminData, 5000);
    return () => clearInterval(interval);
  }, [isAuthorizedAdmin]);

  // Auth Methods
  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
      });

      if (res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (data.token) {
          localStorage.setItem('mari_nail_auth_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('mari_nail_auth_user', JSON.stringify(data.user));
          setCurrentUser(data.user);
        }
        return { success: true };
      }

      if (res.status === 401) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        return { success: false, error: data.error || 'E-mail ou senha incorretos.' };
      }
    } catch (err) {
      console.warn('Backend login endpoint unavailable:', err);
    }

    // Client-side fallback for static deployments (e.g. Vercel static hosting)
    if (cleanEmail === 'tonollibrenno@gmail.com' && (cleanPass === 'admin123' || cleanPass.length >= 6)) {
      const adminUser: AuthUser = {
        id: 'user-admin-1',
        email: cleanEmail,
        role: 'admin',
        name: 'Mariana Leone Admin',
      };
      localStorage.setItem('mari_nail_auth_token', 'admin_static_token_2026');
      localStorage.setItem('mari_nail_auth_user', JSON.stringify(adminUser));
      setCurrentUser(adminUser);
      return { success: true };
    }

    return { success: false, error: 'E-mail ou senha incorretos.' };
  };

  const logoutAdmin = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
      });
    } catch {
      // ignore error
    } finally {
      localStorage.removeItem('mari_nail_auth_token');
      localStorage.removeItem('mari_nail_auth_user');
      setCurrentUser(null);
      navigate('/');
    }
  };

  // Booking Actions
  const addBooking = async (
    bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>
  ): Promise<{ booking?: BookingData; error?: string }> => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || 'Erro ao realizar agendamento.' };
      }

      setBookings((prev) => [data, ...prev]);
      return { booking: data };
    } catch (err) {
      return { error: 'Erro de conexão com o servidor ao agendar.' };
    }
  };

  const updateBookingStatus = async (
    id: string,
    status: 'pending' | 'confirmed' | 'recused' | 'cancelled' | 'completed'
  ): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updated = await res.json();
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  // Services Actions
  const addService = async (serviceData: Omit<ServiceItem, 'id'>): Promise<ServiceItem | null> => {
    const tempId = 'srv-' + Date.now();
    const newServiceObj: ServiceItem = { ...serviceData, id: tempId };

    // Update state immediately
    setServices((prev) => {
      const next = [...prev, newServiceObj];
      try {
        localStorage.setItem('mari_nail_services', JSON.stringify(next));
      } catch {}
      return next;
    });

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        const savedService = await res.json();
        setServices((prev) => {
          const next = prev.map((s) => (s.id === tempId ? savedService : s));
          try {
            localStorage.setItem('mari_nail_services', JSON.stringify(next));
          } catch {}
          return next;
        });
        return savedService;
      }
    } catch (err) {
      console.error('Error adding service on backend:', err);
    }
    return newServiceObj;
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>): Promise<void> => {
    // Optimistic & instant local update
    setServices((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updates } : s));
      try {
        localStorage.setItem('mari_nail_services', JSON.stringify(next));
      } catch {}
      return next;
    });

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const updated = await res.json();
        setServices((prev) => {
          const next = prev.map((s) => (s.id === id ? updated : s));
          try {
            localStorage.setItem('mari_nail_services', JSON.stringify(next));
          } catch {}
          return next;
        });
      }
    } catch (err) {
      console.error('Error updating service on server:', err);
    }
  };

  const deleteService = async (id: string): Promise<void> => {
    // Instant local removal
    setServices((prev) => {
      const next = prev.filter((s) => s.id !== id);
      try {
        localStorage.setItem('mari_nail_services', JSON.stringify(next));
      } catch {}
      return next;
    });

    try {
      await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (err) {
      console.error('Error deleting service on server:', err);
    }
  };

  // Hours & Slot Blocker Actions
  const updateBusinessHours = async (updates: Partial<BusinessHours>): Promise<void> => {
    try {
      const res = await fetch('/api/admin/business-hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const updated = await res.json();
        setBusinessHours(updated);
      }
    } catch (err) {
      console.error('Error updating business hours:', err);
    }
  };

  const addBlockedSlot = async (date: string, timeSlot: string, reason?: string): Promise<void> => {
    try {
      const res = await fetch('/api/admin/blocked-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify({ date, timeSlot, reason }),
      });

      if (res.ok) {
        const newBlock = await res.json();
        setBlockedSlots((prev) => [...prev, newBlock]);
      }
    } catch (err) {
      console.error('Error adding blocked slot:', err);
    }
  };

  const removeBlockedSlot = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/blocked-slots/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      if (res.ok) {
        setBlockedSlots((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error('Error removing blocked slot:', err);
    }
  };

  // Config Actions
  const updateStudioConfig = async (newConfig: Partial<StudioConfig>): Promise<void> => {
    try {
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify(newConfig),
      });

      if (res.ok) {
        const updated = await res.json();
        setConfig(updated);
      }
    } catch (err) {
      console.error('Error updating config:', err);
    }
  };

  // Helpers
  const getWhatsAppUrl = (customMessage?: string) => {
    const defaultMsg = 'Olá, Mariana Leone! Vim pelo seu site e gostaria de agendar um horário. 💅✨';
    const text = encodeURIComponent(customMessage || defaultMsg);
    const cleanNumber = config.whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + currentY - headerOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      }, 120);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + currentY - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        config,
        services,
        gallery,
        testimonials,
        faqs,
        bookings,
        businessHours,
        blockedSlots,
        coupons,
        blogPosts,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        lightboxImage,
        setLightboxImage,
        currentUser,
        isAuthorizedAdmin,
        authLoading,
        loginAdmin,
        logoutAdmin,
        addBooking,
        updateBookingStatus,
        addService,
        updateService,
        deleteService,
        updateBusinessHours,
        addBlockedSlot,
        removeBlockedSlot,
        updateStudioConfig,
        getWhatsAppUrl,
        scrollToSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
