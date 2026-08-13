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
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const isAuthorizedAdmin = currentUser?.role === 'admin';

  // Core Data
  const [config, setConfig] = useState<StudioConfig>(INITIAL_CONFIG);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
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
        const meRes = await fetch('/api/auth/me', { credentials: 'include' });
        if (meRes.ok) {
          const meData = await meRes.json();
          setCurrentUser(meData.user || null);
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

  // Fetch admin data whenever admin logs in
  useEffect(() => {
    if (isAuthorizedAdmin) {
      const fetchAdminData = async () => {
        try {
          const bRes = await fetch('/api/admin/bookings', { credentials: 'include' });
          if (bRes.ok) {
            const bData = await bRes.json();
            setBookings(bData);
          }

          const blkRes = await fetch('/api/admin/blocked-slots', { credentials: 'include' });
          if (blkRes.ok) {
            const blkData = await blkRes.json();
            setBlockedSlots(blkData);
          }
        } catch (err) {
          console.error('Error fetching admin data:', err);
        }
      };
      fetchAdminData();
    }
  }, [isAuthorizedAdmin]);

  // Auth Methods
  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Falha no login.' };
      }

      setCurrentUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  };

  const logoutAdmin = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore error
    } finally {
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
        headers: { 'Content-Type': 'application/json' },
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
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        const newService = await res.json();
        setServices((prev) => [...prev, newService]);
        return newService;
      }
    } catch (err) {
      console.error('Error adding service:', err);
    }
    return null;
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const updated = await res.json();
        setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
      }
    } catch (err) {
      console.error('Error updating service:', err);
    }
  };

  const deleteService = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  // Hours & Slot Blocker Actions
  const updateBusinessHours = async (updates: Partial<BusinessHours>): Promise<void> => {
    try {
      const res = await fetch('/api/admin/business-hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
    const defaultMsg = 'Olá, Mari! Vim pelo seu site e gostaria de agendar um horário. 💅✨';
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
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
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
