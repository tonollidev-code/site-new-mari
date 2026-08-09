export interface ServiceItem {
  id: string;
  name: string;
  category: 'alongamento' | 'gel' | 'manicure' | 'nailart' | 'manutencao';
  description: string;
  duration: string;
  price: string; // e.g. "R$ 180,00" or "A partir de R$ 30,00"
  numericPrice: number;
  popular?: boolean;
  iconName: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'alongamento' | 'nailart' | 'francesinha' | 'nude' | 'gel';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  comment: string;
  rating: number;
  serviceDone: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BookingData {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface StudioConfig {
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramHandle: string;
  address: string;
  addressShort: string;
  operatingHours: string;
  googleMapsEmbedUrl: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  validUntil: string;
  description: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}
