import { Language } from '../types';

export interface TranslationDictionary {
  // Announcement Bar
  freeShipping: string;
  easyReturns: string;
  guaranteedOriginal: string;
  deployButton: string;

  // Navbar
  searchPlaceholder: string;
  studio3D: string;
  wishlist: string;
  cart: string;
  categories: {
    all: string;
    men: string;
    women: string;
    kids: string;
    sneakers: string;
    running: string;
    boots: string;
    sale: string;
  };

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  heroBullet1: string;
  heroBullet2: string;
  heroCtaStudio: string;
  heroCtaCatalog: string;
  presetPalette: string;

  // 3D Studio Customizer
  studioTitle: string;
  studioSubtitle: string;
  materialFinishLabel: string;
  finishes: {
    leather: string;
    suede: string;
    patent: string;
    canvas: string;
    metallic: string;
  };
  parts: {
    upper: string;
    midsole: string;
    outsole: string;
    swoosh: string;
    laces: string;
    heel: string;
    tongue: string;
    inner: string;
  };
  customLaserText: string;
  laserTextPlaceholder: string;
  presetColorways: string;
  explodedView: string;
  autoRotate: string;
  resetColors: string;
  addToCartCustom: string;
  downloadImage: string;
  closeStudio: string;

  // Catalog & Filters
  filterTitle: string;
  resetFilters: string;
  sortBy: string;
  sortOptions: {
    featured: string;
    priceAsc: string;
    priceDesc: string;
    rating: string;
    newest: string;
  };
  brands: string;
  priceRange: string;
  size: string;
  onlyCustomizable: string;
  onlySale: string;
  modelsFound: string;
  noModelsFound: string;
  noModelsSubtext: string;

  // Product Card
  bestseller: string;
  quickAdd: string;
  added: string;
  view2D: string;
  orbit3D: string;

  // Deploy / Export Modal
  deployTitle: string;
  deploySubtitle: string;
  githubStepTitle: string;
  vercelStepTitle: string;
  copyCommands: string;
  downloadProjectZip: string;

  // Cart & Checkout
  cartTitle: string;
  emptyCart: string;
  checkoutTitle: string;
  total: string;
  completePurchase: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  AR: {
    freeShipping: 'توصيل فابور فوت 50درهم / 50€ 🇲🇦',
    easyReturns: 'إرجاع ساهل فـ 30 يوم',
    guaranteedOriginal: 'منتجات أصلية 100%',
    deployButton: 'تنزيل ونشر فـ Vercel/GitHub 🚀',

    searchPlaceholder: 'قلب على سبييدري، ماركات (Nike, Jordan...)...',
    studio3D: 'ستوديو 3D',
    wishlist: 'المفضلة',
    cart: 'السلة',
    categories: {
      all: 'الكل',
      men: 'رجال',
      women: 'نساء',
      kids: 'أطفال',
      sneakers: 'سبييدري 3D',
      running: 'جرّي وبورفوارمانس',
      boots: 'بواط وصباط',
      sale: 'هميزات وتخفيضات',
    },

    heroBadge: 'موديل حصيري 2026',
    heroTitle1: 'صمم سبييدري',
    heroTitle2: 'أبيكس فانتوم 3D',
    heroDesc: 'اكتشف المجموعة الجديدة من Shoes.fr 3D. دور 360 درجة وخصص الألوان والدزاين كيف بغيتي فـ الوقت الفعلي.',
    heroBullet1: 'رؤية تفاعلية 360°',
    heroBullet2: 'إصدار محدود ومضمون',
    heroCtaStudio: 'خصص فـ ستوديو 3D',
    heroCtaCatalog: 'تصفح الكاطالوج',
    presetPalette: 'تنسيقات الألوان المفضلة:',

    studioTitle: 'ستوديو التخصيص 3D الحقيقي',
    studioSubtitle: 'اختر المواد والألوان والدزاين ديال كل جزء فـ السبييدري ديالك',
    materialFinishLabel: 'نوع الجلد والمادة:',
    finishes: {
      leather: 'جلد طبيعي ممتاز',
      suede: 'جلد الموهير / Suede',
      patent: 'جلد لماع Patent',
      canvas: 'ثوب Canvas قوي',
      metallic: 'معدني برّاق',
    },
    parts: {
      upper: 'الجزء العلوي (Tomaia)',
      midsole: 'النعل الأوسط (Midsole)',
      outsole: 'النعل السفلي (Outsole)',
      swoosh: 'الشعار والرمز (Logo)',
      laces: 'السيور (Laces)',
      heel: 'الخلفية (Tallone)',
      tongue: 'اللسان (Linguetta)',
      inner: 'الداخل والتبطين',
    },
    customLaserText: 'نقش بالليزر على الكعب:',
    laserTextPlaceholder: 'اكتب سميتك ولا كود (مثلا: MAROC)',
    presetColorways: 'ألوان جاهزة إحترافية:',
    explodedView: 'عرض الأجزاء تفكيكي',
    autoRotate: 'دوران تلقائي',
    resetColors: 'إعادة ضبط الألوان',
    addToCartCustom: 'أضف السبييدري المخصصة للسلة',
    downloadImage: 'تحميل صورة HD',
    closeStudio: 'إغلاق الستوديو',

    filterTitle: 'تصفية المنتجات',
    resetFilters: 'مسح الفلاتر',
    sortBy: 'ترتيب حسب:',
    sortOptions: {
      featured: 'الأكثر ملاءمة',
      priceAsc: 'الثمن: من الأرخص',
      priceDesc: 'الثمن: من الأغلى',
      rating: 'أعلى تقييم',
      newest: 'أحدث الموديلات',
    },
    brands: 'الماركات العالميّة',
    priceRange: 'نطاق السعر',
    size: 'القياس (EU)',
    onlyCustomizable: 'الموديلات المخصصة 3D فقط',
    onlySale: 'التخفيضات فقط',
    modelsFound: 'موديل متوفر:',
    noModelsFound: 'لم يتم العثور على أي موديل بهاد الفلاتر',
    noModelsSubtext: 'جرب تغير البحث ولا تمسح الفلاتر باش تشوف جميع السبييدريات.',

    bestseller: 'الأكثر مبيعاً',
    quickAdd: 'إضافة سريعة',
    added: 'تَمّت الإضافة',
    view2D: 'صورة 2D',
    orbit3D: 'رؤية 3D',

    deployTitle: 'تحميل ونشر المشروع على GitHub و Vercel',
    deploySubtitle: 'دليل كامل لتنزيل كود السورس ونشره فـ سيرفر Vercel ولا GitHub فـ دقائق',
    githubStepTitle: '1. النشر على GitHub (رفع الكود)',
    vercelStepTitle: '2. النشر الفوري على Vercel (رابط حي)',
    copyCommands: 'نسخ الأوامر',
    downloadProjectZip: 'تحميل دليل النشر و vercel.json',

    cartTitle: 'سلة التسوق',
    emptyCart: 'السلة ديالك خاوية حالياً',
    checkoutTitle: 'إتمام الطلب والإدلاء بالمعلومات',
    total: 'المجموع الكلي:',
    completePurchase: 'تأكيد وشراء الدفعة',
  },

  FR: {
    freeShipping: 'Livraison Gratuite dès 50€ 🇫🇷',
    easyReturns: 'Retours Faciles sous 30 Jours',
    guaranteedOriginal: '100% Produits Originaux Garantis',
    deployButton: 'Exporter vers Vercel/GitHub 🚀',

    searchPlaceholder: 'Rechercher chaussures, marques (Nike, Jordan...)...',
    studio3D: 'Studio 3D',
    wishlist: 'Favoris',
    cart: 'Panier',
    categories: {
      all: 'Tous',
      men: 'Hommes',
      women: 'Femmes',
      kids: 'Enfants',
      sneakers: 'Sneakers 3D',
      running: 'Running & Course',
      boots: 'Bottes & Boots',
      sale: 'Promotions %',
    },

    heroBadge: 'Modèle Phare 2026',
    heroTitle1: 'Créez Vos',
    heroTitle2: 'Apex Phantom 3D',
    heroDesc: 'Découvrez la nouvelle collection Shoes.fr 3D. Inspectez à 360°, changez les matériaux et personnalisez chaque détail en temps réel.',
    heroBullet1: 'Rendu 360° Interactif',
    heroBullet2: 'Édition Limitée Garantie',
    heroCtaStudio: 'Personnaliser dans le Studio 3D',
    heroCtaCatalog: 'Explorer le Catalogue',
    presetPalette: 'Coloris Rapides:',

    studioTitle: 'Studio de Personnalisation 3D',
    studioSubtitle: 'Sélectionnez les matériaux et couleurs pour chaque élément de votre paire',
    materialFinishLabel: 'Finition du Matériau:',
    finishes: {
      leather: 'Cuir Pleine Fleur',
      suede: 'Suede & Daim',
      patent: 'Cuir Verni Gloss',
      canvas: 'Toile Canvas Tissée',
      metallic: 'Finition Métallisée',
    },
    parts: {
      upper: 'Tige (Upper)',
      midsole: 'Semelle Intermédiaire',
      outsole: 'Semelle d\'Usure',
      swoosh: 'Logo & Swoosh',
      laces: 'Lacets',
      heel: 'Contrefort / Talon',
      tongue: 'Languette',
      inner: 'Doublure Intérieure',
    },
    customLaserText: 'Gravure Laser au Talon:',
    laserTextPlaceholder: 'Ex: PARIS2026 ou votre Nom',
    presetColorways: 'Palettes de Couleurs:',
    explodedView: 'Vue Éclatée 3D',
    autoRotate: 'Rotation Auto',
    resetColors: 'Réinitialiser',
    addToCartCustom: 'Ajouter cette Création au Panier',
    downloadImage: 'Télécharger le Rendu HD',
    closeStudio: 'Fermer le Studio',

    filterTitle: 'Filtres du Catalogue',
    resetFilters: 'Réinitialiser',
    sortBy: 'Trier par:',
    sortOptions: {
      featured: 'Plus Pertinents',
      priceAsc: 'Prix: Croissant',
      priceDesc: 'Prix: Décroissant',
      rating: 'Avis Clients',
      newest: 'Nouveautés',
    },
    brands: 'Marques Officielle',
    priceRange: 'Tranche de Prix',
    size: 'Pointure (EU)',
    onlyCustomizable: 'Uniquement Custom 3D',
    onlySale: 'Promotions Uniquement',
    modelsFound: 'Modèles Trouvés:',
    noModelsFound: 'Aucune chaussure ne correspond à ces critères',
    noModelsSubtext: 'Essayez de modifier vos filtres pour voir les modèles disponibles.',

    bestseller: 'Bestseller',
    quickAdd: 'Ajout Rapide',
    added: 'Ajouté !',
    view2D: 'Photo 2D',
    orbit3D: 'Rendu 3D',

    deployTitle: 'Télécharger et Déployer sur GitHub & Vercel',
    deploySubtitle: 'Guide pas à pas pour exporter le code source et le publier sur Vercel et GitHub en quelques clics',
    githubStepTitle: '1. Mettre sur GitHub',
    vercelStepTitle: '2. Déploiement Direct sur Vercel',
    copyCommands: 'Copier les Commandes',
    downloadProjectZip: 'Télécharger vercel.json & Guide Export',

    cartTitle: 'Mon Panier',
    emptyCart: 'Votre panier est actuellement vide',
    checkoutTitle: 'Finaliser ma Commande',
    total: 'Montant Total:',
    completePurchase: 'Valider et Payer',
  },

  EN: {
    freeShipping: 'Free Express Shipping over €50 🇬🇧',
    easyReturns: '30-Day Easy Returns Policy',
    guaranteedOriginal: '100% Authentic Guaranteed',
    deployButton: 'Export to Vercel/GitHub 🚀',

    searchPlaceholder: 'Search shoes, brands (Nike, Jordan, Salomon)...',
    studio3D: 'Studio 3D',
    wishlist: 'Wishlist',
    cart: 'Cart',
    categories: {
      all: 'All Shoes',
      men: 'Men',
      women: 'Women',
      kids: 'Kids',
      sneakers: 'Sneakers 3D',
      running: 'Performance Running',
      boots: 'Boots & Leather',
      sale: 'Special Deals %',
    },

    heroBadge: 'Featured Model 2026',
    heroTitle1: 'Design Your Custom',
    heroTitle2: 'Apex Phantom 3D',
    heroDesc: 'Explore the new flagship collection from Shoes.fr 3D. Orbit 360°, customize real-world materials and preview every panel in real time.',
    heroBullet1: 'Interactive 360° Orbit',
    heroBullet2: 'Guaranteed Authentic Limited Edition',
    heroCtaStudio: 'Customize in Studio 3D',
    heroCtaCatalog: 'Browse Catalog',
    presetPalette: 'Colorway Presets:',

    studioTitle: '3D Customizer Studio Pro',
    studioSubtitle: 'Pick genuine materials, custom finishes, and colors for every section of your shoe',
    materialFinishLabel: 'Material Finish:',
    finishes: {
      leather: 'Premium Full Leather',
      suede: 'Plush Suede',
      patent: 'High-Gloss Patent',
      canvas: 'Heavyweight Canvas',
      metallic: 'Metallic Lustre',
    },
    parts: {
      upper: 'Upper Body',
      midsole: 'Midsole Unit',
      outsole: 'Tread Outsole',
      swoosh: 'Logo & Swoosh',
      laces: 'Shoelaces & Aglets',
      heel: 'Heel Counter',
      tongue: 'Padded Tongue',
      inner: 'Inner Collar Lining',
    },
    customLaserText: 'Custom Heel Laser Engraving:',
    laserTextPlaceholder: 'E.g. APEX2026 or your Name',
    presetColorways: 'Curated Colorways:',
    explodedView: '3D Exploded View',
    autoRotate: 'Auto Rotate',
    resetColors: 'Reset Colors',
    addToCartCustom: 'Add Custom Shoe to Cart',
    downloadImage: 'Download HD Render',
    closeStudio: 'Close Studio',

    filterTitle: 'Catalog Filters',
    resetFilters: 'Reset All',
    sortBy: 'Sort By:',
    sortOptions: {
      featured: 'Most Relevant',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      rating: 'Customer Rating',
      newest: 'New Arrivals',
    },
    brands: 'Top Brands',
    priceRange: 'Price Range',
    size: 'EU Size',
    onlyCustomizable: '3D Customizable Only',
    onlySale: 'On Sale Only',
    modelsFound: 'Models Found:',
    noModelsFound: 'No shoes matched your current filter selection',
    noModelsSubtext: 'Try adjusting or clearing your filters to explore available models.',

    bestseller: 'Bestseller',
    quickAdd: 'Quick Add',
    added: 'Added',
    view2D: '2D Photo',
    orbit3D: '3D Orbit',

    deployTitle: 'Download & Deploy to GitHub & Vercel',
    deploySubtitle: 'Comprehensive setup guide to export your project source code and launch live on Vercel or GitHub',
    githubStepTitle: '1. Push Code to GitHub Repository',
    vercelStepTitle: '2. Instant One-Click Vercel Deployment',
    copyCommands: 'Copy Setup Commands',
    downloadProjectZip: 'Download vercel.json & Config',

    cartTitle: 'Shopping Cart',
    emptyCart: 'Your cart is currently empty',
    checkoutTitle: 'Checkout & Shipping Info',
    total: 'Grand Total:',
    completePurchase: 'Complete Order',
  },

  ES: {
    freeShipping: 'Envío Gratis a partir de 50€ 🇪🇸',
    easyReturns: 'Devolución Fácil 30 Días',
    guaranteedOriginal: '100% Originales Garantizados',
    deployButton: 'Exportar a Vercel/GitHub 🚀',

    searchPlaceholder: 'Buscar zapatillas, marcas (Nike, Jordan...)...',
    studio3D: 'Studio 3D',
    wishlist: 'Favoritos',
    cart: 'Carrito',
    categories: {
      all: 'Ver Todo',
      men: 'Hombre',
      women: 'Mujer',
      kids: 'Niños',
      sneakers: 'Sneakers 3D',
      running: 'Running & Deporte',
      boots: 'Botas & Botines',
      sale: 'Rebajas %',
    },

    heroBadge: 'Modelo Destacado 2026',
    heroTitle1: 'Crea Tus',
    heroTitle2: 'Apex Phantom 3D',
    heroDesc: 'Descubre la nueva colección de Shoes.fr 3D. Visualiza en 360°, personaliza materiales y colores en tiempo real con el motor gráfico 3D.',
    heroBullet1: 'Render 360° Interactivo',
    heroBullet2: 'Edición Limitada Garantizada',
    heroCtaStudio: 'Personalizar en Studio 3D',
    heroCtaCatalog: 'Ver Catálogo',
    presetPalette: 'Combinaciones Rápidas:',

    studioTitle: 'Studio de Personalización 3D',
    studioSubtitle: 'Elige materiales, acabados y colores para cada pieza de tus zapatillas',
    materialFinishLabel: 'Acabado de Material:',
    finishes: {
      leather: 'Cuero Premium',
      suede: 'Ante & Suede',
      patent: 'Charol Brillante',
      canvas: 'Lona Canvas',
      metallic: 'Metalizado Brillant',
    },
    parts: {
      upper: 'Cuerpo / Empeine',
      midsole: 'Suela Intermedia',
      outsole: 'Suela de Goma',
      swoosh: 'Logo & Swoosh',
      laces: 'Cordones',
      heel: 'Talón / Contrafuerte',
      tongue: 'Lengüeta',
      inner: 'Forro Interior',
    },
    customLaserText: 'Grabado Láser en Talón:',
    laserTextPlaceholder: 'Ej: MADRID2026 o Tu Nombre',
    presetColorways: 'Paleta de Colores:',
    explodedView: 'Vista Despiezada 3D',
    autoRotate: 'Rotación Auto',
    resetColors: 'Restablecer',
    addToCartCustom: 'Añadir esta Creación al Carrito',
    downloadImage: 'Descargar Imagen HD',
    closeStudio: 'Cerrar Studio',

    filterTitle: 'Filtros del Catálogo',
    resetFilters: 'Limpiar Filtros',
    sortBy: 'Ordenar por:',
    sortOptions: {
      featured: 'Más Relevantes',
      priceAsc: 'Precio: Menor a Mayor',
      priceDesc: 'Precio: Mayor a Menor',
      rating: 'Mejor Valorados',
      newest: 'Novedades',
    },
    brands: 'Marcas Oficiales',
    priceRange: 'Rango de Precio',
    size: 'Talla (EU)',
    onlyCustomizable: 'Solo Personalizables 3D',
    onlySale: 'Solo en Oferta',
    modelsFound: 'Modelos Encontrados:',
    noModelsFound: 'No se encontraron zapatillas con estos filtros',
    noModelsSubtext: 'Prueba a cambiar los filtros para explorar el catálogo completo.',

    bestseller: 'Bestseller',
    quickAdd: 'Añadir',
    added: 'Añadido',
    view2D: 'Foto 2D',
    orbit3D: 'Vista 3D',

    deployTitle: 'Descargar y Desplegar en GitHub & Vercel',
    deploySubtitle: 'Guía paso a paso para descargar el código fuente y publicar tu web en Vercel o GitHub en minutos',
    githubStepTitle: '1. Subir Código a GitHub',
    vercelStepTitle: '2. Despliegue Directo en Vercel',
    copyCommands: 'Copiar Comandos',
    downloadProjectZip: 'Descargar vercel.json y Guía',

    cartTitle: 'Carrito de Compras',
    emptyCart: 'Tu carrito está vacío actualmente',
    checkoutTitle: 'Finalizar Compra y Envío',
    total: 'Total a Pagar:',
    completePurchase: 'Completar Pedido',
  },

  IT: {
    freeShipping: 'Spedizione Gratuita oltre 50€ 🇮🇹',
    easyReturns: 'Reso Facile 30 Giorni',
    guaranteedOriginal: '100% Originali Garantiti',
    deployButton: 'Esporta su Vercel/GitHub 🚀',

    searchPlaceholder: 'Cerca scarpe, brand (Nike, Jordan, Salomon)...',
    studio3D: 'Studio 3D',
    wishlist: 'Preferiti',
    cart: 'Carrello',
    categories: {
      all: 'Tutti i Modelli',
      men: 'Uomo',
      women: 'Donna',
      kids: 'Bambino',
      sneakers: 'Sneakers 3D',
      running: 'Performance Running',
      boots: 'Stivali & Leather',
      sale: 'Offerte %',
    },

    heroBadge: 'Modello In Evidenza 2026',
    heroTitle1: 'Crea Le Tue',
    heroTitle2: 'Apex Phantom 3D',
    heroDesc: 'Esplora la nuova collezione iconica di Shoes.fr 3D. Ruota a 360°, personalizza ogni materiale e colore in tempo reale con il motore 3D.',
    heroBullet1: 'Render 360° Interattivo',
    heroBullet2: 'Edizione Limitata Garantita',
    heroCtaStudio: 'Personalizza in Studio 3D',
    heroCtaCatalog: 'Esplora Catalogo',
    presetPalette: 'Colorazioni Rapide:',

    studioTitle: 'Studio Custom 3D',
    studioSubtitle: 'Seleziona materiali, finiture e colori per ogni componente delle tue sneakers',
    materialFinishLabel: 'Finitura Materiale:',
    finishes: {
      leather: 'Pelle Naturale Premium',
      suede: 'Camoscio & Suede',
      patent: 'Pelle Lucida Patent',
      canvas: 'Tela Canvas Resistente',
      metallic: 'Finitura Metallizzata',
    },
    parts: {
      upper: 'Tomaia (Upper)',
      midsole: 'Intersuola Cushioning',
      outsole: 'Suola Vulcanizzata',
      swoosh: 'Logo & Swoosh',
      laces: 'Lacci e Aglets',
      heel: 'Contrafforte Tallone',
      tongue: 'Linguetta Imbottita',
      inner: 'Fodera Interna Collar',
    },
    customLaserText: 'Incisione Laser al Tallone:',
    laserTextPlaceholder: 'Es: MILANO2026 o il Tuo Nome',
    presetColorways: 'Tavolozze Predefinite:',
    explodedView: 'Vista Esplosa 3D',
    autoRotate: 'Rotazione Auto',
    resetColors: 'Ripristina',
    addToCartCustom: 'Aggiungi Creazione al Carrello',
    downloadImage: 'Scarica Render HD',
    closeStudio: 'Chiudi Studio',

    filterTitle: 'Filtri Catalogo',
    resetFilters: 'Ripristina Filtri',
    sortBy: 'Ordinamento:',
    sortOptions: {
      featured: 'Più Rilevanti',
      priceAsc: 'Prezzo: Crescente',
      priceDesc: 'Prezzo: Decrescente',
      rating: 'Valutazione Clienti',
      newest: 'Nuovi Arrivi',
    },
    brands: 'Marchi Ufficiali',
    priceRange: 'Fascia di Prezzo',
    size: 'Taglia (EU)',
    onlyCustomizable: 'Solo Custom 3D',
    onlySale: 'Solo in Sconto',
    modelsFound: 'Modelli Trovati:',
    noModelsFound: 'Nessuna scarpa trovata con questi filtri',
    noModelsSubtext: 'Prova a modificare la ricerca o a ripristinare i filtri per vedere tutti i modelli.',

    bestseller: 'Bestseller',
    quickAdd: 'Aggiungi',
    added: 'Aggiunto',
    view2D: 'Foto 2D',
    orbit3D: 'Anteprima 3D',

    deployTitle: 'Scarica e Installa su GitHub e Vercel',
    deploySubtitle: 'Guida completa per esportare il codice sorgente e pubblicarlo live su Vercel e GitHub in pochi click',
    githubStepTitle: '1. Carica il Codice su GitHub',
    vercelStepTitle: '2. Deploy Immediato su Vercel',
    copyCommands: 'Copia Comandi',
    downloadProjectZip: 'Scarica vercel.json e Guida',

    cartTitle: 'Il Tuo Carrello',
    emptyCart: 'Il carrello è attualmente vuoto',
    checkoutTitle: 'Cassa & Spedizione',
    total: 'Totale Ordine:',
    completePurchase: 'Completa Acquisto',
  },
};
