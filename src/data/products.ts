import { Product, BrandId } from '../types';

export const BRANDS: { id: BrandId; name: string; country: string; logoText: string }[] = [
  { id: 'Nike', name: 'Nike', country: 'USA', logoText: 'JUST DO IT' },
  { id: 'Adidas', name: 'adidas Originals', country: 'Germany', logoText: '3-STRIPES' },
  { id: 'New Balance', name: 'New Balance', country: 'USA', logoText: 'BOSTON 1906' },
  { id: 'Jordan', name: 'Air Jordan', country: 'USA', logoText: 'FLIGHT' },
  { id: 'Salomon', name: 'Salomon', country: 'France', logoText: 'ALPS OUTDOOR' },
  { id: 'Dr. Martens', name: 'Dr. Martens', country: 'UK', logoText: 'BOUNCING SOLES' },
  { id: 'Converse', name: 'Converse', country: 'USA', logoText: 'ALL STAR' },
  { id: 'Puma', name: 'Puma', country: 'Germany', logoText: 'FOREVER FASTER' },
  { id: 'Vans', name: 'Vans', country: 'USA', logoText: 'OFF THE WALL' },
  { id: 'Asics', name: 'Asics', country: 'Japan', logoText: 'SOUND MIND' },
];

export const COLOR_PALETTE = [
  { id: 'white', name: 'White Crisp', hex: '#FFFFFF' },
  { id: 'black', name: 'Midnight Black', hex: '#121212' },
  { id: 'red', name: 'Varsity Red', hex: '#DC2626' },
  { id: 'blue', name: 'Royal Blue', hex: '#2563EB' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#06B6D4' },
  { id: 'green', name: 'Forest Green', hex: '#16A34A' },
  { id: 'yellow', name: 'Electric Gold', hex: '#EAB308' },
  { id: 'purple', name: 'Neon Purple', hex: '#9333EA' },
  { id: 'orange', name: 'Sunset Orange', hex: '#EA580C' },
  { id: 'pink', name: 'Bubblegum Pink', hex: '#EC4899' },
  { id: 'beige', name: 'Oatmeal Beige', hex: '#D7C4B7' },
  { id: 'grey', name: 'Titanium Grey', hex: '#6B7280' },
  { id: 'gold', name: 'Metallic Gold', hex: '#D4AF37' },
  { id: 'silver', name: 'Chrome Silver', hex: '#C0C0C0' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'nike-air-force-1-3d',
    name: "Nike Air Force 1 '07 3D Edition",
    brand: 'Nike',
    category: 'sneakers',
    subCategory: 'Iconic Low-Top',
    price: 119.99,
    originalPrice: 139.99,
    rating: 4.9,
    reviewCount: 342,
    isNew: true,
    isBestSeller: true,
    isCustomizable: true,
    discountPercentage: 14,
    colors: [
      { id: 'white', name: 'Triple White', hex: '#FFFFFF' },
      { id: 'black', name: 'Triple Black', hex: '#1D1D1F' },
      { id: 'red-swoosh', name: 'White / University Red', hex: '#FFFFFF', secondaryHex: '#DC2626' },
      { id: 'royal-blue', name: 'White / Deep Royal', hex: '#FFFFFF', secondaryHex: '#2563EB' },
    ],
    availableSizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    description: 'The radiance lives on in the Nike Air Force 1 ’07 3D. Overlays, bold details, and 360-degree Air cushioning engineered for maximum street presence and premium comfort.',
    features: [
      'Genuine full-grain leather uppers',
      'Encapsulated Nike Air unit for lightweight cushioning',
      'Perforations on the toe box for breathability',
      'Non-marking rubber cupsole for durability and traction',
      'Fully customizable 3D color zones'
    ],
    materials: {
      upper: '100% Premium Grain Leather',
      lining: 'Soft Textile Mesh',
      sole: 'Durable Vulcanized Rubber'
    },
    defaultCustomColors: {
      upper: '#FFFFFF',
      midsole: '#F3F4F6',
      outsole: '#E5E7EB',
      swoosh: '#DC2626',
      laces: '#FFFFFF',
      heel: '#DC2626',
      tongue: '#FFFFFF',
      inner: '#1F2937',
      materialFinish: 'leather'
    },
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Julien M.',
        rating: 5,
        date: '18/07/2026',
        title: 'Incroyable en 3D !',
        comment: 'La personnalisation 3D en direct est bluffante. La couleur rouge varsity avec le cuir blanc rend super bien ! Livré en 48h.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Marco P.',
        rating: 5,
        date: '12/07/2026',
        title: 'Top qualite',
        comment: 'Spaziose, comode e l’effetto 3D nel personalizzatore mi ha fatto scegliere la combinazione di colori perfetta.',
        verified: true
      }
    ]
  },
  {
    id: 'air-jordan-1-retro-high',
    name: 'Air Jordan 1 Retro High OG 3D',
    brand: 'Jordan',
    category: 'sneakers',
    subCategory: 'High-Top Court',
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.95,
    reviewCount: 512,
    isNew: false,
    isBestSeller: true,
    isCustomizable: true,
    discountPercentage: 10,
    colors: [
      { id: 'chicago', name: 'Chicago Red/White', hex: '#DC2626', secondaryHex: '#FFFFFF' },
      { id: 'shadow', name: 'Shadow Grey/Black', hex: '#4B5563', secondaryHex: '#121212' },
      { id: 'royal', name: 'Royal Blue/Black', hex: '#2563EB', secondaryHex: '#121212' },
    ],
    availableSizes: [39, 40, 41, 42, 43, 44, 45, 46],
    description: 'Iconic basketball heritage rendered with modern 3D technology. Premium tumbled leather with iconic Wings logo embossing.',
    features: [
      'High-top silhouette for supportive fit',
      'Padded collar and classic Jordan Wings emblem',
      'Rubber outsole with deep flex grooves',
      '3D Interactive multi-angle preview'
    ],
    materials: {
      upper: 'Tumbled Leather & Suede',
      lining: 'Breathable Nylon Mesh',
      sole: 'Solid Rubber Outsole'
    },
    defaultCustomColors: {
      upper: '#DC2626',
      midsole: '#FFFFFF',
      outsole: '#121212',
      swoosh: '#121212',
      laces: '#121212',
      heel: '#DC2626',
      tongue: '#FFFFFF',
      inner: '#121212',
      materialFinish: 'suede'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Sophie L.',
        rating: 5,
        date: '04/07/2026',
        title: 'Un classique indispensable',
        comment: 'Très belle finition, le modèle 3D sur le site montre exactement la vraie chaussure !',
        verified: true
      }
    ]
  },
  {
    id: 'new-balance-550-3d',
    name: 'New Balance 550 Retro Heritage 3D',
    brand: 'New Balance',
    category: 'men',
    subCategory: 'Retro Basketball',
    price: 139.99,
    rating: 4.8,
    reviewCount: 219,
    isNew: true,
    isBestSeller: true,
    isCustomizable: true,
    colors: [
      { id: 'white-green', name: 'White / Forest Green', hex: '#FFFFFF', secondaryHex: '#16A34A' },
      { id: 'white-navy', name: 'White / Vintage Navy', hex: '#FFFFFF', secondaryHex: '#1E3A8A' },
      { id: 'white-burgundy', name: 'White / Burgundy', hex: '#FFFFFF', secondaryHex: '#800020' },
    ],
    availableSizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    description: 'Tribute to 1989 basketball legend. Clean, streamlined silhouette in heavy-duty leather with classic N logo.',
    features: [
      'Leather, synthetic, and mesh upper',
      'Non-marking rubber traction outsole',
      'Adjustable lace closure',
      'Vintage aesthetic with modern 3D customizable panels'
    ],
    materials: {
      upper: 'Leather & Mesh overlays',
      lining: 'Fabric mesh padding',
      sole: 'Composite rubber'
    },
    defaultCustomColors: {
      upper: '#FAFAFA',
      midsole: '#E5E7EB',
      outsole: '#16A34A',
      swoosh: '#16A34A',
      laces: '#FAFAFA',
      heel: '#16A34A',
      tongue: '#FAFAFA',
      inner: '#16A34A',
      materialFinish: 'leather'
    },
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Antoine D.',
        rating: 5,
        date: '10/06/2026',
        title: 'Style rétro impeccable',
        comment: 'Très confortable au quotidien. Le rendu 3D permet de changer les couleurs en temps réel !',
        verified: true
      }
    ]
  },
  {
    id: 'salomon-speedcross-6-3d',
    name: 'Salomon Speedcross 6 Trail 3D',
    brand: 'Salomon',
    category: 'running',
    subCategory: 'Trail & Outdoor Performance',
    price: 159.99,
    originalPrice: 175.00,
    rating: 4.88,
    reviewCount: 185,
    isNew: true,
    isCustomizable: true,
    colors: [
      { id: 'black-neon', name: 'Black / Lime Surge', hex: '#121212', secondaryHex: '#84CC16' },
      { id: 'cyan-blue', name: 'Alpine Cyan / Fiery Red', hex: '#06B6D4', secondaryHex: '#EF4444' },
      { id: 'all-black', name: 'Triple Stealth Black', hex: '#0A0A0A' }
    ],
    availableSizes: [39, 40, 41, 42, 43, 44, 45],
    description: 'Grip legendary status on technical mountain terrain. Quicklace system and Mud Contagrip aggressive lug design.',
    features: [
      'Mud Contagrip outsole with deep chevron lugs',
      'EnergyCell+ high-rebound midsole compound',
      'Sensifit construction for precise foot wrapping',
      'Quicklace minimalistic string lacing'
    ],
    materials: {
      upper: 'Ripstop Woven Anti-debris Mesh',
      lining: 'Textile lining',
      sole: 'Contagrip Rubber'
    },
    defaultCustomColors: {
      upper: '#06B6D4',
      midsole: '#1E293B',
      outsole: '#84CC16',
      swoosh: '#EF4444',
      laces: '#0A0A0A',
      heel: '#06B6D4',
      tongue: '#0A0A0A',
      inner: '#0F172A',
      materialFinish: 'patent'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'adidas-forum-low-3d',
    name: 'adidas Forum Low 84 3D Custom',
    brand: 'Adidas',
    category: 'sneakers',
    subCategory: 'Classic Low-Top',
    price: 109.99,
    rating: 4.75,
    reviewCount: 142,
    isBestSeller: false,
    isCustomizable: true,
    colors: [
      { id: 'white-blue', name: 'Cloud White / Royal Blue', hex: '#FFFFFF', secondaryHex: '#2563EB' },
      { id: 'white-black', name: 'White / Core Black', hex: '#FFFFFF', secondaryHex: '#121212' },
      { id: 'gold-edition', name: 'White / Metallic Gold', hex: '#FFFFFF', secondaryHex: '#EAB308' }
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    description: 'More than just a shoe, it is a statement. The adidas Forum hit the scene in 84 and gained deep love on both court and music stages.',
    features: [
      'Removable cross-ankle strap',
      'Coated leather upper with soft texture',
      'Durable rubber cupsole',
      '3-Stripes customizable dynamic canvas'
    ],
    materials: {
      upper: 'Coated Premium Leather',
      lining: 'Terry cloth lining',
      sole: 'Stitched Rubber Outsole'
    },
    defaultCustomColors: {
      upper: '#FFFFFF',
      midsole: '#F3F4F6',
      outsole: '#2563EB',
      swoosh: '#2563EB',
      laces: '#FFFFFF',
      heel: '#2563EB',
      tongue: '#FFFFFF',
      inner: '#1E3A8A',
      materialFinish: 'leather'
    },
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'dr-martens-1460-3d',
    name: 'Dr. Martens 1460 Smooth Leather Boot 3D',
    brand: 'Dr. Martens',
    category: 'boots',
    subCategory: '8-Eye Leather Boot',
    price: 189.99,
    rating: 4.9,
    reviewCount: 408,
    isBestSeller: true,
    isCustomizable: true,
    colors: [
      { id: 'black-smooth', name: 'Black Smooth', hex: '#111111' },
      { id: 'cherry-red', name: 'Cherry Red Antique', hex: '#800020' },
      { id: 'white-boot', name: 'White Smooth Leather', hex: '#FFFFFF' }
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    description: 'The original 8-eye boot. Built with Dr. Martens iconic AirWair bouncing sole, yellow welt stitching, and grooved sides.',
    features: [
      'AirWair oil and fat-resistant sole',
      'Goodyear welted construction',
      'Signature yellow contrast welt stitching',
      'Durable smooth polishable leather'
    ],
    materials: {
      upper: '100% Smooth Grain Bovine Leather',
      lining: 'Leather & Textile blend',
      sole: '100% PVC Air Cushion'
    },
    defaultCustomColors: {
      upper: '#111111',
      midsole: '#1F2937',
      outsole: '#CA8A04',
      swoosh: '#EAB308',
      laces: '#111111',
      heel: '#111111',
      tongue: '#111111',
      inner: '#374151',
      materialFinish: 'leather'
    },
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'converse-chuck-70-3d',
    name: 'Converse Chuck 70 Vintage High 3D',
    brand: 'Converse',
    category: 'women',
    subCategory: 'Canvas High Top',
    price: 89.99,
    rating: 4.85,
    reviewCount: 290,
    isBestSeller: true,
    isCustomizable: true,
    colors: [
      { id: 'black-canvas', name: 'Black Canvas', hex: '#18181B' },
      { id: 'parchment', name: 'Parchment Ecru', hex: '#F5EBE0' },
      { id: 'sunflower', name: 'Sunflower Yellow', hex: '#EAB308' },
      { id: 'pineneedle', name: 'Pine Green', hex: '#15803D' }
    ],
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    description: 'The Chuck 70 celebrates original details from 1970s Chuck Taylor All Stars with modern cushioning and premium heavy canvas.',
    features: [
      '12oz organic canvas for elevated durability',
      'OrthoLite insole for all-day comfort',
      'Varnished egret midsole and star ankle patch',
      '3D customizable canvas panels & eyelets'
    ],
    materials: {
      upper: '100% Recycled Heavy Canvas',
      lining: 'Soft Cotton Textile',
      sole: 'Vulcanized Rubber'
    },
    defaultCustomColors: {
      upper: '#18181B',
      midsole: '#F5EBE0',
      outsole: '#18181B',
      swoosh: '#18181B',
      laces: '#F5EBE0',
      heel: '#18181B',
      tongue: '#18181B',
      inner: '#F5EBE0',
      materialFinish: 'canvas'
    },
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'puma-suede-classic-3d',
    name: 'Puma Suede Classic XXI 3D',
    brand: 'Puma',
    category: 'sneakers',
    subCategory: 'Heritage Suede',
    price: 79.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviewCount: 164,
    discountPercentage: 11,
    isCustomizable: true,
    colors: [
      { id: 'black-white', name: 'Puma Black / White', hex: '#121212', secondaryHex: '#FFFFFF' },
      { id: 'red-white', name: 'High Risk Red / White', hex: '#DC2626', secondaryHex: '#FFFFFF' },
      { id: 'navy-white', name: 'Peacoat Blue / White', hex: '#1E3A8A', secondaryHex: '#FFFFFF' }
    ],
    availableSizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    description: 'Hit the streets with the classic low-cut Puma Suede. Worn by icons of every generation since 1968.',
    features: [
      'Full suede upper with velvet soft touch',
      'Synthetic leather lining',
      'Comfort sockliner for soft stepping',
      'Rubber midsole and rubber outsole'
    ],
    materials: {
      upper: '100% Genuine Suede',
      lining: 'Synthetic Leather',
      sole: 'Textured Rubber'
    },
    defaultCustomColors: {
      upper: '#DC2626',
      midsole: '#FFFFFF',
      outsole: '#E5E7EB',
      swoosh: '#FFFFFF',
      laces: '#FFFFFF',
      heel: '#DC2626',
      tongue: '#DC2626',
      inner: '#FFFFFF',
      materialFinish: 'suede'
    },
    imageUrl: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'vans-old-skool-3d',
    name: 'Vans Old Skool 3D Skate Edition',
    brand: 'Vans',
    category: 'kids',
    subCategory: 'Skate Low Top',
    price: 74.99,
    rating: 4.82,
    reviewCount: 310,
    isBestSeller: true,
    isCustomizable: true,
    colors: [
      { id: 'black-white', name: 'Black / True White', hex: '#121212', secondaryHex: '#FFFFFF' },
      { id: 'checkerboard', name: 'Black/White Checkerboard', hex: '#121212', secondaryHex: '#FFFFFF' },
      { id: 'navy', name: 'Navy / White Sidestripe', hex: '#1E3A8A', secondaryHex: '#FFFFFF' }
    ],
    availableSizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    description: 'First known as the Vans #36, the Old Skool debuted in 1977 with a unique new addition: a random doodle drawn by founder Paul Van Doren.',
    features: [
      'Sturdy suede and canvas uppers',
      'Re-enforced toecaps to withstand repeated wear',
      'Supportive padded collars',
      'Signature rubber waffle outsoles'
    ],
    materials: {
      upper: 'Suede Toe Cap & Heavy Canvas Body',
      lining: 'Canvas Textile',
      sole: 'Gum Rubber Waffle'
    },
    defaultCustomColors: {
      upper: '#121212',
      midsole: '#FFFFFF',
      outsole: '#D97706',
      swoosh: '#FFFFFF',
      laces: '#FFFFFF',
      heel: '#121212',
      tongue: '#121212',
      inner: '#FFFFFF',
      materialFinish: 'canvas'
    },
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'asics-gel-kayano-14-3d',
    name: 'Asics Gel-Kayano 14 Metallic 3D',
    brand: 'Asics',
    category: 'running',
    subCategory: 'Tech Running & Lifestyle',
    price: 169.99,
    rating: 4.89,
    reviewCount: 156,
    isNew: true,
    isCustomizable: true,
    colors: [
      { id: 'pure-silver', name: 'Pure Silver / Glacier Grey', hex: '#C0C0C0', secondaryHex: '#2563EB' },
      { id: 'black-pure', name: 'Black / Pure Gold', hex: '#121212', secondaryHex: '#EAB308' }
    ],
    availableSizes: [39, 40, 41, 42, 43, 44, 45, 46],
    description: 'Reinterpreting late 2000s running aesthetics with legendary GEL technology cushioning for maximum impact absorption.',
    features: [
      '2000s era metallic design language',
      'GEL technology cushioning in heel and forefoot',
      'TRUSSTIC support system for midfoot stability',
      'Solution dye sockliner reduces water usage'
    ],
    materials: {
      upper: 'Synthetic Metallic Leather & Open Mesh',
      lining: 'Comfort Padded Mesh',
      sole: 'AHAR Rubber Outsole'
    },
    defaultCustomColors: {
      upper: '#C0C0C0',
      midsole: '#1E293B',
      outsole: '#2563EB',
      swoosh: '#2563EB',
      laces: '#FFFFFF',
      heel: '#C0C0C0',
      tongue: '#C0C0C0',
      inner: '#1E293B',
      materialFinish: 'metallic'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  }
];
