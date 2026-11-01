import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'mn-coat-01',
    name: 'The Sovereign Double-Breasted Cashmere Coat',
    subtitle: 'Signature tailored outercoat in 100% Inner Mongolian Grade-A cashmere',
    gender: 'women',
    category: 'outerwear',
    price: 98000,
    originalPrice: 112000,
    description: 'An architectural silhouette masterminded in our Paris atelier. Cut from dense 620gsm Scottish woven cashmere with hand-stitched horn buttons, sculpted shoulder pads, and a full Bemberg cupro lining. Designed to fall below the knee with decisive sartorial presence.',
    composition: '100% Scottish Double-Faced Cashmere; Lining: 100% Cupro',
    origin: 'Handcrafted in Paris, France',
    care: [
      'Specialist dry clean only',
      'Store on wide-shoulder cedar hanger',
      'Steam gently; never apply direct iron to cashmere fibres'
    ],
    fit: 'Tailored regular silhouette. Designed with room for layered knitwear underneath.',
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)', 'FR 42 (XL)'],
    colors: [
      { name: 'Noir Intemporel', hex: '#0B0B0C' },
      { name: 'Charcoal Ombré', hex: '#26262B' },
      { name: 'Champagne Camel', hex: '#B5946E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Runway Edition',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    sku: 'MN-W-CT-098'
  },
  {
    id: 'mn-dress-01',
    name: 'The Seta Biarritz Bias-Cut Silk Gown',
    subtitle: 'Floor-skimming gown in 30-momme heavyweight Como silk satin',
    gender: 'women',
    category: 'dresses',
    price: 48500,
    description: 'Cut on the true bias to drape like liquid mercury along the natural contours of the body. Finished with delicate hand-rolled French seams, an open architectural back, and gentle cowl neckline that catches evening illumination with subtle lustre.',
    composition: '100% Lake Como Mulberry Silk Satin (30 Momme)',
    origin: 'Crafted in Lake Como, Italy',
    care: [
      'Professional luxury dry clean only',
      'Do not wring or tumble dry',
      'Cool iron on reverse side under protective press cloth'
    ],
    fit: 'Sensual fluid drape. Fits true to size with flattering bias stretch.',
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)'],
    colors: [
      { name: 'Noir Onyx', hex: '#0B0B0C' },
      { name: 'Warm Ivory', hex: '#F4EFEA' },
      { name: 'Muted Champagne', hex: '#C8A97E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Atelier Selection',
    isBestSeller: true,
    isNewArrival: true,
    inStock: true,
    sku: 'MN-W-DR-048'
  },
  {
    id: 'mn-suit-01',
    name: 'The Vendôme Peak-Lapel Wool Tuxedo',
    subtitle: 'Super 160s Merino evening suit with grosgrain silk peak lapels',
    gender: 'men',
    category: 'tailoring',
    price: 115000,
    originalPrice: 128000,
    description: 'Constructed using full floating horsehair canvas that molds irrevocably to your physique with every wear. Features hand-pick stitched silk grosgrain lapels, working surgeon cuffs with genuine mother-of-pearl buttons, and trousers with side adjusters.',
    composition: '100% Super 160s Vitale Barberis Merino Wool; Lapels: 100% Silk Grosgrain',
    origin: 'Tailored in Biella, Italy',
    care: [
      'Specialist dry clean once per season',
      'Steam to release natural wool tension after black-tie galas',
      'Store in provided breathable canvas garment carrier'
    ],
    fit: 'Structured modern European cut. High armholes, tapered waist, flat-front trouser.',
    sizes: ['IT 46 (36R)', 'IT 48 (38R)', 'IT 50 (40R)', 'IT 52 (42R)', 'IT 54 (44R)'],
    colors: [
      { name: 'Midnight Noir', hex: '#09090C' },
      { name: 'Deep Espresso', hex: '#1C1816' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Bespoke Line',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    sku: 'MN-M-TX-115'
  },
  {
    id: 'mn-knit-01',
    name: 'The Marais Draped Cashmere Turtleneck',
    subtitle: '7-gauge seamless ribbed rollneck in pure undyed Mongolian yarn',
    gender: 'women',
    category: 'knitwear',
    price: 32000,
    description: 'Spun from virgin long-staple cashmere fibres selected for cloud-like softness and zero pilling. Features a generous double-layer collar that holds its architectural fold effortlessly, dropped shoulders, and extended ribbed cuffs.',
    composition: '100% Grade-A Pure Mongolian Cashmere (7-Gauge 4-Ply)',
    origin: 'Knitted in Hawick, Scotland',
    care: [
      'Hand wash in cold water with gentle cashmere wash',
      'Dry flat between organic cotton towels; never hang dry',
      'Comb with cedar wool comb as required'
    ],
    fit: 'Slightly relaxed cocoon cut with clean drape.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Chalk', hex: '#EFEBE4' },
      { name: 'Charcoal Mélange', hex: '#2A2A2E' },
      { name: 'Noir Ébène', hex: '#0B0B0C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Essential Luxury',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    sku: 'MN-W-KN-032'
  },
  {
    id: 'mn-leather-01',
    name: 'The Palais Sculptural Box-Calf Tote',
    subtitle: 'Full-grain French box-calf leather with brushed champagne gold hardware',
    gender: 'women',
    category: 'leather',
    price: 74000,
    description: 'An ode to mid-century Parisian architecture. Vegetable-tanned leather hand-burnished at the edges with natural beeswax. Features a suede-lined main compartment, concealed magnetic gussets, and solid brushed brass fittings plated in 18k champagne gold.',
    composition: '100% French Full-Grain Box Calfskin; Lining: Japanese Ultrasuede',
    origin: 'Artisanal atelier in Lyon, France',
    care: [
      'Condition twice annually with natural beeswax balm',
      'Avoid prolonged direct sunlight and rain exposure',
      'Store in supplied brushed velvet dust pouch'
    ],
    fit: 'Dimensions: 34cm width, 26cm height, 14cm depth. Fits a 14-inch laptop seamlessly.',
    sizes: ['One Size (Grand Atelier)'],
    colors: [
      { name: 'Noir Maroquin', hex: '#0A0A0C' },
      { name: 'Cognac Antique', hex: '#7D4F27' },
      { name: 'Sable Doré', hex: '#D2B48C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Iconic Handbag',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    sku: 'MN-U-BG-074'
  },
  {
    id: 'mn-blazer-01',
    name: 'The Montaigne Structured Double-Breasted Blazer',
    subtitle: 'Sharp-shouldered wool-gabardine blazer with sculpted cinch waist',
    gender: 'women',
    category: 'tailoring',
    price: 64000,
    description: 'Engineered with pronounced architectural shoulders and an inward hourglass taper. Cut from heavyweight 380gsm British wool gabardine with matte horn buttons, dual welt pockets, and a clean interior breast pocket.',
    composition: '100% Yorkshire Worsted Wool Gabardine; Lining: 100% Cupro Twill',
    origin: 'Crafted in Paris, France',
    care: [
      'Delicate dry clean only',
      'Press with damp cloth on wool temperature setting'
    ],
    fit: 'Structured architectural cut with defined waistline.',
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)'],
    colors: [
      { name: 'Noir Absolu', hex: '#0B0B0C' },
      { name: 'Ivoire Naturel', hex: '#F5F2EC' }
    ],
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Atelier Signature',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    sku: 'MN-W-BZ-064'
  },
  {
    id: 'mn-trench-01',
    name: 'The Tuileries Weatherproof Gabardine Trench',
    subtitle: 'Military-inspired storm trench in water-resistant compact cotton twill',
    gender: 'men',
    category: 'outerwear',
    price: 84000,
    originalPrice: 94000,
    description: 'An enduring monument to functional elegance. Woven from Egyptian long-staple cotton sealed with a fluorocarbon-free water-repellent finish. Features gun flap detailing, leather-wrapped buckle closures, throat latch, and deep storm shield.',
    composition: '100% Compact Egyptian Cotton Gabardine; Collar: 100% Suede Trim',
    origin: 'Manchester & Paris',
    care: [
      'Specialist rainwear sponge clean or gentle dry clean',
      'Re-wax leather buckles with natural conditioning cream'
    ],
    fit: 'Generous traditional fit allowing comfortable suiting underneath.',
    sizes: ['IT 46 (S)', 'IT 48 (M)', 'IT 50 (L)', 'IT 52 (XL)'],
    colors: [
      { name: 'Noir Mat', hex: '#111114' },
      { name: 'Classic Muted Khaki', hex: '#7E7567' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Heritage Archive',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    sku: 'MN-M-TR-084'
  },
  {
    id: 'mn-shirt-01',
    name: 'The Saint-Germain Egyptian Cotton Evening Shirt',
    subtitle: '200/2 two-fold cotton poplin with pleated bib and mother-of-pearl studs',
    gender: 'men',
    category: 'shirts',
    price: 24000,
    description: 'Milled from rare Giza 45 extra-long staple cotton yarn. Hand-finished with 22 stitches per inch, single-needle French side seams, removable collar stays, and convertible French cuffs accommodating bespoke cufflinks.',
    composition: '100% Giza 45 Egyptian Cotton Poplin (200/2 Yarn Count)',
    origin: 'Albini Mill, Bergamo, Italy',
    care: [
      'Wash gently at 30°C or professional hand laundering',
      'Hot iron while slightly damp for immaculate glass-like sheen'
    ],
    fit: 'Tailored slim silhouette without restrictive pulling across chest.',
    sizes: ['38 (15")', '39 (15.5")', '40 (16")', '41 (16.5")', '42 (17")'],
    colors: [
      { name: 'Blanc Pur', hex: '#FAF9F6' },
      { name: 'Noir Soirée', hex: '#09090C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Couture Evening',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    sku: 'MN-M-SH-024'
  },
  {
    id: 'mn-trousers-01',
    name: 'The Elysée Pleated Wide-Leg Trousers',
    subtitle: 'High-waisted double-pleated wool crepe with clean break hem',
    gender: 'women',
    category: 'tailoring',
    price: 36500,
    description: 'Designed to elevate everyday dressing into dramatic movement. High rise with side buckled adjusters, deep inverted front pleats, and an expansive column leg that flows effortlessly with stride.',
    composition: '100% Italian High-Twist Wool Crepe',
    origin: 'Florence, Italy',
    care: [
      'Dry clean only',
      'Press along the sharp front pleats with steam iron'
    ],
    fit: 'Dramatic high-waisted wide leg. Length tailored for 8cm heels.',
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40', 'FR 42'],
    colors: [
      { name: 'Noir Minuit', hex: '#0B0B0C' },
      { name: 'Crème Poudrée', hex: '#ECE7DE' },
      { name: 'Gris Ardoise', hex: '#37373C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Modern Classic',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    sku: 'MN-W-TR-036'
  },
  {
    id: 'mn-men-knit-01',
    name: 'The Castiglione Seamless Cashmere Crew',
    subtitle: 'Whisper-weight 12-gauge gauge knit in sustainable Scottish cashmere',
    gender: 'men',
    category: 'knitwear',
    price: 38000,
    description: 'Knitted without seams on whole-garment machinery in Hawick, eliminating friction and bulk. Designed with clean rolled cuffs, ribbed hem, and micro-cable accent running down the dorsal spine.',
    composition: '100% Grade-A Pure Scottish Spun Cashmere (12-Gauge)',
    origin: 'Hawick, Scottish Borders',
    care: [
      'Hand wash in tepid water with gentle wool shampoo',
      'Dry flat on towel away from direct heat'
    ],
    fit: 'Modern tailored fit. Flattering over an evening shirt or directly against skin.',
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)'],
    colors: [
      { name: 'Noir Profond', hex: '#0B0B0C' },
      { name: 'Anthracite', hex: '#232328' },
      { name: 'Champagne Taupe', hex: '#9E886D' }
    ],
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Atelier Knitwear',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    sku: 'MN-M-KN-038'
  },
  {
    id: 'mn-scarf-01',
    name: 'The Madeleine Hand-Rolled Silk Twill Foulard',
    subtitle: '90x90cm architectural monogram scarf in 18-momme French silk twill',
    gender: 'women',
    category: 'accessories',
    price: 18500,
    description: 'Silk screened by hand using historic artisanal frame printing. Depicts the architectural floor plans of the historic Maison Noir salon in Paris with hand-rolled, hand-stitched borders requiring 45 minutes of needlework per piece.',
    composition: '100% French Silk Twill (18 Momme)',
    origin: 'Lyon, France',
    care: [
      'Dry clean only',
      'Preserve in bespoke circular presentation box'
    ],
    fit: 'Generous 90cm x 90cm square scarf.',
    sizes: ['90cm x 90cm'],
    colors: [
      { name: 'Noir & Champagne', hex: '#141416' },
      { name: 'Ivoire & Or', hex: '#EBE6DC' }
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Limited Edition',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    sku: 'MN-U-AC-018'
  },
  {
    id: 'mn-men-trousers-01',
    name: 'The Rivoli High-Waisted Gurkha Trousers',
    subtitle: 'Super 130s flannel with integrated dual brass buckle waistband',
    gender: 'men',
    category: 'tailoring',
    price: 42000,
    description: 'A masterpiece of bespoke proportions. Fitted with an extended criss-cross Gurkha waistband that adjusts without a belt. Deep forward pleats create an elegant, authoritative drape that tapers gently to a 4.5cm cuff turn-up.',
    composition: '100% Super 130s Vitale Barberis Canonico Wool Flannel',
    origin: 'Biella & Naples, Italy',
    care: [
      'Dry clean when required',
      'Hang by cuffs to preserve the sharp crease line'
    ],
    fit: 'High-waisted tailored taper with forward pleats.',
    sizes: ['IT 46 (30W)', 'IT 48 (32W)', 'IT 50 (34W)', 'IT 52 (36W)', 'IT 54 (38W)'],
    colors: [
      { name: 'Charcoal Charcoal', hex: '#222226' },
      { name: 'Deep Midnight', hex: '#0B0B0E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85'
    ],
    tag: 'Bespoke Tailoring',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    sku: 'MN-M-TR-042'
  }
];

export const FEATURED_COLLECTIONS = [
  {
    id: 'l-automne-noir',
    title: "L'Automne Noir",
    season: 'Autumn / Winter 2026',
    description: 'An exploration of shadow, precision, and noble woolens. Structured cashmere overcoats and architectural silhouettes that command the room.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'outerwear',
    itemCount: 8
  },
  {
    id: 'sartorial-atelier',
    title: 'Sartorial Atelier',
    season: 'Permanent Bespoke Archive',
    description: 'Full-canvas evening suits, peak-lapel tuxedos, and hand-carved horn buttons crafted in heritage Italian and Parisian workshops.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'tailoring',
    itemCount: 12
  },
  {
    id: 'soie-et-cachemire',
    title: 'Silk & Cashmere',
    season: 'The Tactile Edition',
    description: 'Heavyweight 30-momme Lake Como silks married to 7-gauge Scottish cashmere wraps. Fluid sensuality balanced by quiet warmth.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    categoryTarget: 'dresses',
    itemCount: 10
  }
];

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
