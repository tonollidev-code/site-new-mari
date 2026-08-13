import { ServiceItem, GalleryItem, Testimonial, FAQItem, StudioConfig, Coupon, BlogPost } from '../types';

export const INITIAL_CONFIG: StudioConfig = {
  whatsappNumber: '5511995866952',
  whatsappDisplay: '(11) 99586-6952',
  instagramHandle: '@leonesnail',
  address: 'Rua São Vicente das Minas, 47',
  addressShort: 'Rua São Vicente das Minas, 47',
  operatingHours: 'Terça a Sábado: 09h às 19h | Domingo e Segunda: Fechado',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Rua%20S%C3%A3o%20Vicente%20das%20Minas%2C%2047&t=&z=16&ie=UTF8&iwloc=&output=embed'
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'alongamento-fibra',
    name: 'Alongamento em Fibra de Vidro',
    category: 'alongamento',
    description: 'Técnica moderna que proporciona unhas longas, naturais, resistentes e com acabamento finíssimo.',
    duration: '120 min',
    price: 'A partir de R$ 180,00',
    numericPrice: 180,
    popular: true,
    iconName: 'Sparkles',
    image: 'https://i.postimg.cc/brszvv8Q/Whats-App-Image-2026-08-08-at-16-40-37.jpg'
  },
  {
    id: 'alongamento-molde-f1',
    name: 'Molde F1',
    category: 'alongamento',
    description: 'Técnica moderna e ágil com molde F1 em gel. Proporciona unhas com curvatura perfeita, brilho incomparável e excelente durabilidade.',
    duration: '90 min',
    price: 'A partir de R$ 160,00',
    numericPrice: 160,
    popular: true,
    iconName: 'Sparkles',
    image: 'https://i.postimg.cc/Hx7mGhtN/Whats-App-Image-2026-08-08-at-16-42-50.jpg'
  },
  {
    id: 'banho-de-gel',
    name: 'Banho de Gel / Blindagem',
    category: 'gel',
    description: 'Camada protetora de gel sobre a unha natural. Fortalece, evita quebras e garante brilho intenso por semanas.',
    duration: '90 min',
    price: 'A partir de R$ 120,00',
    numericPrice: 120,
    popular: true,
    iconName: 'ShieldCheck',
    image: 'https://i.postimg.cc/pLGMmHcV/Whats-App-Image-2026-08-08-at-16-43-22.jpg'
  },
  {
    id: 'manutencao-alongamento',
    name: 'Manutenção',
    category: 'manutencao',
    description: 'Reposição da estrutura de gel/fibra, nivelamento e novo acabamento para manter as unhas sempre impecáveis.',
    duration: '90 min',
    price: 'A partir de R$ 110,00',
    numericPrice: 110,
    popular: false,
    iconName: 'RefreshCw',
    image: 'https://i.postimg.cc/fbtpk00Y/Whats-App-Image-2026-08-08-at-21-38-19-(1).jpg'
  },
  {
    id: 'esmaltacao-gel',
    name: 'Esmaltação em Gel',
    category: 'gel',
    description: 'Esmalte secado em cabine LED/UV. Secagem imediata, durabilidade de até 20 dias sem descascar.',
    duration: '60 min',
    price: 'A partir de R$ 85,00',
    numericPrice: 85,
    popular: false,
    iconName: 'Gem',
    image: 'https://i.postimg.cc/wjPbKTb9/Whats-App-Image-2026-08-08-at-21-38-20.jpg'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Francesinha Reversa com Folhas de Ouro',
    category: 'francesinha',
    categoryLabel: 'Francesinha',
    imageUrl: 'https://i.postimg.cc/C1nDfww3/Whats-App-Image-2026-08-08-at-16-40-35-(2).jpg',
    description: 'Alongamento em fibra de vidro com formato amendoado, francesinha reversa delicada e detalhes em folha de ouro 24k.',
    likes: 184
  },
  {
    id: 'gal-2',
    title: 'Nude Minimalista Sofisticado',
    category: 'nude',
    categoryLabel: 'Nude',
    imageUrl: 'https://i.postimg.cc/5y10NJjW/Whats-App-Image-2026-08-08-at-16-40-36-(1).jpg',
    description: 'Banho de gel com tonalidade nude rosado champagne, tom natural de alta sofisticação para o dia a dia.',
    likes: 242
  },
  {
    id: 'gal-3',
    title: 'Encapsulada com Glitter Dourado',
    category: 'nailart',
    categoryLabel: 'Nail Art',
    imageUrl: 'https://i.postimg.cc/QxCDgC2k/Whats-App-Image-2026-08-08-at-16-40-36-(2).jpg',
    description: 'Arte encapsulada em gel transparente com microbrilhos dourados e efeito gradiente degradê.',
    likes: 310
  },
  {
    id: 'gal-4',
    title: 'Alongamento Bailarina Clássico',
    category: 'alongamento',
    categoryLabel: 'Alongamento',
    imageUrl: 'https://i.postimg.cc/C1hXF6YD/Whats-App-Image-2026-08-08-at-16-40-36-(3).jpg',
    description: 'Formato Ballerina simétrico perfeito, estrutura resistente e esmaltação gel nude brilho espelhado.',
    likes: 195
  },
  {
    id: 'gal-5',
    title: 'Vermelho Elegante de Longa Duração',
    category: 'gel',
    categoryLabel: 'Gel',
    imageUrl: 'https://i.postimg.cc/RZxPSbLR/Whats-App-Image-2026-08-08-at-16-40-36-(4).jpg',
    description: 'Esmaltação em gel em tom vermelho cereja fechado com alto brilho vitreous sem falhas.',
    likes: 278
  },
  {
    id: 'gal-6',
    title: 'Francesinha Sorriso Delicada',
    category: 'francesinha',
    categoryLabel: 'Francesinha',
    imageUrl: 'https://i.postimg.cc/Gp5gC3M6/Whats-App-Image-2026-08-08-at-16-40-37-(1).jpg',
    description: 'Traço fino e preciso no formato Stiletto suave, ideal para eventos e noivas.',
    likes: 167
  },
  {
    id: 'gal-7',
    title: 'Nude Milky White em Gel',
    category: 'nude',
    categoryLabel: 'Nude',
    imageUrl: 'https://i.postimg.cc/9fZwWJ1Z/Whats-App-Image-2026-08-08-at-16-40-37-(3).jpg',
    description: 'Efeito leitoso super suave estilo "Milky Nails", tendência absoluta entre celebridades.',
    likes: 289
  },
  {
    id: 'gal-8',
    title: 'Nail Art Mármore Rose Gold',
    category: 'nailart',
    categoryLabel: 'Nail Art',
    imageUrl: 'https://i.postimg.cc/L8sV8KZk/Whats-App-Image-2026-08-08-at-16-40-37-(2).jpg',
    description: 'Efeito marmorizado desenhado à mão livre com veios dourados e fundo quartz rosado.',
    likes: 345
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Camila Alencar',
    role: 'Advogada',
    comment: 'Eu simplesmente amei o resultado! O atendimento da Mari foi maravilhoso, pontual e minhas unhas em fibra ficaram extremamente naturais e impecáveis. Não troco por nada!',
    rating: 5,
    serviceDone: 'Alongamento Fibra de Vidro',
    date: 'Há 2 dias'
  },
  {
    id: 'test-2',
    name: 'Beatriz Vasconcelos',
    role: 'Empresária',
    comment: 'Além do trabalho impecável, a Mari é super atenciosa e o estúdio é extremamente limpo, acolhedor e cheiroso. O banho de gel dura intacto por quase 1 mês!',
    rating: 5,
    serviceDone: 'Banho de Gel',
    date: 'Há 1 semana'
  },
  {
    id: 'test-3',
    name: 'Fernanda Lima',
    role: 'Arquiteta',
    comment: 'Foi exatamente como eu imaginei! Levei uma referência do Pinterest com nail art e folha de ouro e a Mari superou todas as minhas expectativas. Acabamento perfeito!',
    rating: 5,
    serviceDone: 'Nail Art Exclusiva',
    date: 'Há 2 semanas'
  },
  {
    id: 'test-4',
    name: 'Juliana Mendes',
    role: 'Médica',
    comment: 'Encontrar uma profissional que respeite a saúde da unha natural e entregue um resultado tão limpo e indolor é raro. A Mari é uma verdadeira artista!',
    rating: 5,
    serviceDone: 'Esmaltação em Gel',
    date: 'Há 3 semanas'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Como faço para agendar?',
    answer: 'Você pode agendar diretamente pelo nosso formulário no site escolhendo o serviço, data e horário ideal, ou clicando no botão do WhatsApp para falar diretamente conosco.'
  },
  {
    id: 'faq-2',
    question: 'Quanto tempo dura o procedimento?',
    answer: 'O tempo varia de acordo com o serviço escolhido: alongamentos levam cerca de 2 horas, banho de gel aproximadamente 1h30m, e esmaltação gel cerca de 1 hora.'
  },
  {
    id: 'faq-3',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos Pix, cartões de crédito e débito (com opção de parcelamento), e dinheiro em espécie.'
  },
  {
    id: 'faq-4',
    question: 'Preciso marcar horário com antecedência?',
    answer: 'Recomendamos agendar com pelo menos 2 a 5 dias de antecedência para garantir seu horário no dia desejado, especialmente para atendimentos de quinta a sábado.'
  },
  {
    id: 'faq-5',
    question: 'Posso escolher o modelo e formato da unha?',
    answer: 'Com certeza! No início do atendimento faremos uma consultoria personalizada para escolher o melhor formato (Amendoado, Bailarina, Quadrado, Stiletto) e a cor ou Nail Art que combina com seu estilo.'
  },
  {
    id: 'faq-6',
    question: 'Como funciona o cancelamento ou reagendamento?',
    answer: 'Pedimos a gentileza de nos avisar com pelo menos 24 horas de antecedência caso precise reagendar ou cancelar, permitindo disponibilizar a vaga para outra cliente.'
  },
  {
    id: 'faq-7',
    question: 'Vocês fazem nail art personalizada?',
    answer: 'Sim! A Mari é especialista em desenhos manuais, encapsuladas, francesinha reversa, folha de ouro, efeitos marmorizados e pedrarias finas.'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: '5 Dicas de ouro para fazer seu Alongamento durar mais',
    snippet: 'Descubra hábitos simples do dia a dia para manter suas unhas impecáveis até a próxima manutenção.',
    content: 'O cuidado pós-atendimento é essencial para a durabilidade da fibra ou gel. Evite usar as unhas como ferramentas, use luvas para manipular produtos de limpeza pesados e hidrate as cutículas diariamente com óleo nutritivo.',
    date: '02 Agost 2026',
    readTime: '3 min de leitura',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
    author: 'Mari Nail Designer'
  },
  {
    id: 'post-2',
    title: 'Banho de Gel vs. Alongamento em Fibra: Qual escolher?',
    snippet: 'Entenda as diferenças de cada procedimento e descubra qual é o ideal para o seu objetivo.',
    content: 'Se você já possui unhas no comprimento desejado mas elas são fracas ou quebradiças, o Banho de Gel é a escolha ideal. Se deseja aumento imediato de comprimento com formato impecável, aposte no Alongamento em Fibra de Vidro.',
    date: '28 Julho 2026',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop',
    author: 'Mari Nail Designer'
  }
];

export const INITIAL_COUPONS: Coupon[] = [];
