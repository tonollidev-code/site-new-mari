import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem, GalleryItem, Testimonial, FAQItem, BookingData, StudioConfig, Coupon, BlogPost } from '../types';
import { INITIAL_CONFIG, INITIAL_SERVICES, INITIAL_GALLERY, INITIAL_TESTIMONIALS, INITIAL_FAQS, INITIAL_BLOG_POSTS, INITIAL_COUPONS } from '../data/initialData';

interface AppContextType {
  config: StudioConfig;
  services: ServiceItem[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  bookings: BookingData[];
  coupons: Coupon[];
  blogPosts: BlogPost[];
  
  // Selection / Modal States
  selectedServiceForBooking: ServiceItem | null;
  setSelectedServiceForBooking: (service: ServiceItem | null) => void;
  lightboxImage: GalleryItem | null;
  setLightboxImage: (item: GalleryItem | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  // Admin Auth State
  adminEmail: string | null;
  isAuthorizedAdmin: boolean;
  loginAdmin: (email: string) => boolean;
  logoutAdmin: () => void;
  
  // Actions
  addBooking: (booking: Omit<BookingData, 'id' | 'createdAt' | 'status'>) => BookingData;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  updateServicePrice: (id: string, newPrice: string, numericPrice: number) => void;
  updateStudioConfig: (newConfig: Partial<StudioConfig>) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
  toggleLikeGalleryItem: (id: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCouponStatus: (id: string) => void;
  getWhatsAppUrl: (customMessage?: string) => string;
  scrollToSection: (sectionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<StudioConfig>(() => {
    const saved = localStorage.getItem('mari_nail_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CONFIG,
          ...parsed,
          address: INITIAL_CONFIG.address,
          addressShort: INITIAL_CONFIG.addressShort,
          whatsappNumber: INITIAL_CONFIG.whatsappNumber,
          whatsappDisplay: INITIAL_CONFIG.whatsappDisplay,
          instagramHandle: INITIAL_CONFIG.instagramHandle,
          googleMapsEmbedUrl: INITIAL_CONFIG.googleMapsEmbedUrl,
        };
      } catch {
        return INITIAL_CONFIG;
      }
    }
    return INITIAL_CONFIG;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('mari_nail_services');
    if (saved) {
      try {
        const parsed: ServiceItem[] = JSON.parse(saved);
        if (parsed.length === INITIAL_SERVICES.length && parsed.every((s, i) => s.id === INITIAL_SERVICES[i].id)) {
          return parsed.map((service) => {
            const defaultService = INITIAL_SERVICES.find((s) => s.id === service.id);
            return defaultService ? { ...service, image: defaultService.image, name: defaultService.name, description: defaultService.description } : service;
          });
        }
      } catch {
        // fallback to INITIAL_SERVICES
      }
    }
    return INITIAL_SERVICES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('mari_nail_gallery');
    if (saved) {
      try {
        const parsed: GalleryItem[] = JSON.parse(saved);
        return parsed.map((item) => {
          const defaultItem = INITIAL_GALLERY.find((g) => g.id === item.id);
          return defaultItem ? { ...item, imageUrl: defaultItem.imageUrl } : item;
        });
      } catch {
        return INITIAL_GALLERY;
      }
    }
    return INITIAL_GALLERY;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('mari_nail_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);

  const [bookings, setBookings] = useState<BookingData[]>(() => {
    const saved = localStorage.getItem('mari_nail_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('mari_nail_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('mari_nail_admin_email');
  });

  const ALLOWED_ADMIN_EMAIL = 'tonollibrenno@gmail.com';
  const isAuthorizedAdmin = adminEmail?.toLowerCase() === ALLOWED_ADMIN_EMAIL.toLowerCase();

  const loginAdmin = (email: string) => {
    const formatted = email.trim().toLowerCase();
    if (formatted === ALLOWED_ADMIN_EMAIL.toLowerCase()) {
      setAdminEmail(ALLOWED_ADMIN_EMAIL);
      localStorage.setItem('mari_nail_admin_email', ALLOWED_ADMIN_EMAIL);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminEmail(null);
    localStorage.removeItem('mari_nail_admin_email');
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('mari_nail_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('mari_nail_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('mari_nail_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('mari_nail_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('mari_nail_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('mari_nail_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const addBooking = (bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>): BookingData => {
    const newBooking: BookingData = {
      ...bookingData,
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      status: 'pending',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const updateServicePrice = (id: string, newPrice: string, numericPrice: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, price: newPrice, numericPrice } : s));
  };

  const updateStudioConfig = (newConfig: Partial<StudioConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: 'test-' + Date.now(),
      date: 'Recente'
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const toggleLikeGalleryItem = (id: string) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, likes: g.likes + 1 } : g));
  };

  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: 'cup-' + Date.now()
    };
    setCoupons(prev => [...prev, newCoupon]);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const getWhatsAppUrl = (customMessage?: string) => {
    const defaultMsg = 'Olá, Mari! Vim pelo seu site e gostaria de agendar um horário. 💅✨';
    const text = encodeURIComponent(customMessage || defaultMsg);
    // Sanitize number digits
    const cleanNumber = config.whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        config,
        services,
        gallery,
        testimonials,
        faqs,
        bookings,
        coupons,
        blogPosts,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        lightboxImage,
        setLightboxImage,
        isAdminOpen,
        setIsAdminOpen,
        adminEmail,
        isAuthorizedAdmin,
        loginAdmin,
        logoutAdmin,
        addBooking,
        updateBookingStatus,
        updateServicePrice,
        updateStudioConfig,
        addTestimonial,
        toggleLikeGalleryItem,
        addCoupon,
        toggleCouponStatus,
        getWhatsAppUrl,
        scrollToSection
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
