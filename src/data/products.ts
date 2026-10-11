export type Category =
  | "Women"
  | "Men"
  | "Outerwear"
  | "Tops"
  | "Bottoms"
  | "Shoes"
  | "Accessories";

export const CATEGORIES: Category[] = [
  "Women",
  "Men",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Shoes",
  "Accessories",
];

export interface ColorVariant {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  categories: Category[];
  colors: ColorVariant[];
  sizes: string[];
  images: string[];
  description: string;
  materials: string;
  rating: number;
  reviews: number;
  popularity: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  dateAdded: number;
}

export const img = (id: string, w = 1200): string =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const DAY = 86400000;
const BASE = Date.UTC(2026, 8, 1);

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "premium-oversized-shirt",
    name: "The Premium Oversized Shirt",
    price: 89,
    originalPrice: 119,
    categories: ["Men", "Tops"],
    colors: [
      { name: "White", hex: "#f5f4f2", image: img("photo-1594938298603-c8148c4dae35") },
      { name: "Sky Blue", hex: "#aebfd4", image: img("photo-1596755094514-f87e34085b2c") },
      { name: "Charcoal", hex: "#3a3a3c", image: img("photo-1602810318383-e386cc2a3ccf") },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      img("photo-1594938298603-c8148c4dae35"),
      img("photo-1596755094514-f87e34085b2c"),
      img("photo-1602810318383-e386cc2a3ccf"),
    ],
    description:
      "A wardrobe-defining oversized shirt cut from heavyweight organic cotton with a relaxed drape, clean collar, and single chest pocket. Finished with corozo buttons and a softly washed feel.",
    materials: "100% organic cotton — machine cold wash, line dry",
    rating: 4.9,
    reviews: 214,
    popularity: 98,
    isBestSeller: true,
    dateAdded: BASE + 2 * DAY,
  },
  {
    id: "p02",
    slug: "essential-cotton-tee",
    name: "Essential Cotton Tee",
    price: 39,
    categories: ["Men", "Tops"],
    colors: [
      { name: "White", hex: "#f5f4f2" },
      { name: "Black", hex: "#1d1d1f" },
      { name: "Sand", hex: "#d8c9ae" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [img("photo-1521572163474-6864f9cf17ab"), img("photo-1583743814966-8936f5b7be1a")],
    description:
      "The perfect everyday tee in heavyweight jersey with a structured crew neck that holds its shape wash after wash. Pre-shrunk, breathable, and cut for effortless layering.",
    materials: "95% cotton, 5% elastane — machine wash cold",
    rating: 4.7,
    reviews: 486,
    popularity: 92,
    dateAdded: BASE + 5 * DAY,
  },
  {
    id: "p03",
    slug: "camel-wool-overcoat",
    name: "Camel Wool Overcoat",
    price: 249,
    originalPrice: 299,
    categories: ["Men", "Women", "Outerwear"],
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Charcoal", hex: "#3a3a3c" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [img("photo-1591047139829-d91aecb6caea")],
    description:
      "A timeless double-breasted overcoat in pure new wool with a satin lining, horn buttons, and a sculptural silhouette. Tailored to be worn over suiting or knitwear.",
    materials: "100% virgin wool, viscose lining — dry clean",
    rating: 4.8,
    reviews: 97,
    popularity: 95,
    isBestSeller: true,
    dateAdded: BASE + 1 * DAY,
  },
  {
    id: "p04",
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    price: 289,
    categories: ["Men", "Women", "Outerwear"],
    colors: [{ name: "Black", hex: "#1d1d1f" }],
    sizes: ["S", "M", "L", "XL"],
    images: [img("photo-1551028719-00167b16eac5")],
    description:
      "Full-grain leather biker jacket with an asymmetric zip, snap lapels, and antique brass hardware. Supple, lined, and made to age beautifully.",
    materials: "Full-grain leather, polyester lining — specialist leather clean",
    rating: 4.8,
    reviews: 64,
    popularity: 71,
    isNew: true,
    dateAdded: BASE + 12 * DAY,
  },
  {
    id: "p05",
    slug: "slim-fit-denim-jeans",
    name: "Slim Fit Denim Jeans",
    price: 109,
    categories: ["Men", "Bottoms"],
    colors: [
      { name: "Indigo", hex: "#3b4a6b" },
      { name: "Washed Black", hex: "#2e2e30" },
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [img("photo-1542272604-787c3835535d"), img("photo-1541099649105-f69ad21f3246")],
    description:
      "Slim-fit denim crafted from Japanese selvedge cotton with a mid rise and a clean tapered leg. Fades beautifully with wear.",
    materials: "12oz selvedge cotton denim — machine wash inside out",
    rating: 4.6,
    reviews: 312,
    popularity: 88,
    isBestSeller: true,
    dateAdded: BASE + 4 * DAY,
  },
  {
    id: "p06",
    slug: "studio-white-sneakers",
    name: "Studio White Sneakers",
    price: 159,
    categories: ["Men", "Women", "Shoes"],
    colors: [{ name: "White", hex: "#f5f4f2" }, { name: "Bone", hex: "#e3d9c6" }],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    images: [img("photo-1549298916-b41d501d3772"), img("photo-1560343090-f0409e92791a")],
    description:
      "Minimalist leather sneakers with a cushioned insole, tonal stitching, and a vulcanised rubber sole. Designed in-house, made to be worn daily.",
    materials: "Full-grain leather, rubber sole",
    rating: 4.9,
    reviews: 521,
    popularity: 99,
    isBestSeller: true,
    dateAdded: BASE + 3 * DAY,
  },
  {
    id: "p07",
    slug: "crimson-runner-sneakers",
    name: "Crimson Runner Sneakers",
    price: 169,
    categories: ["Men", "Women", "Shoes"],
    colors: [{ name: "Crimson", hex: "#a31621" }, { name: "White", hex: "#f5f4f2" }],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    images: [img("photo-1542291026-7eec264c27ff")],
    description:
      "A bold take on the classic runner silhouette — breathable mesh with suede overlays and a responsive foam midsole. A statement that stays comfortable.",
    materials: "Mesh, suede, foam midsole",
    rating: 4.7,
    reviews: 188,
    popularity: 84,
    isNew: true,
    dateAdded: BASE + 9 * DAY,
  },
  {
    id: "p08",
    slug: "everyday-leather-sneakers",
    name: "Everyday Leather Sneakers",
    price: 149,
    categories: ["Men", "Shoes"],
    colors: [{ name: "Tan", hex: "#b08050" }, { name: "White", hex: "#f5f4f2" }],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [img("photo-1595950653106-6c9ebd614d3a")],
    description:
      "Versatile leather sneakers with a padded collar and flexible sole. The pair that works with everything from denim to tailored trousers.",
    materials: "Leather upper, cushioned insole",
    rating: 4.6,
    reviews: 143,
    popularity: 76,
    dateAdded: BASE + 7 * DAY,
  },
  {
    id: "p09",
    slug: "floral-midi-dress",
    name: "Floral Midi Dress",
    price: 139,
    categories: ["Women"],
    colors: [{ name: "Ivory", hex: "#f5f0e6" }, { name: "Sage", hex: "#b8c4a8" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1595777457583-95e059d581b8")],
    description:
      "A flowing midi dress in a soft floral print with a draped bodice, tie waist, and a gentle A-line skirt. Effortless from morning coffee to evening.",
    materials: "Viscose — machine wash gentle",
    rating: 4.8,
    reviews: 176,
    popularity: 82,
    isNew: true,
    dateAdded: BASE + 10 * DAY,
  },
  {
    id: "p10",
    slug: "evening-wrap-dress",
    name: "Evening Wrap Dress",
    price: 159,
    categories: ["Women"],
    colors: [{ name: "Black", hex: "#1d1d1f" }, { name: "Burgundy", hex: "#7a263a" }],
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1594633312681-425c7b97ccd1")],
    description:
      "A sculptural wrap dress with a V neckline, gathered waist, and a knee-length skirt in fluid crepe. Made for occasions that call for quiet confidence.",
    materials: "Crepe — dry clean",
    rating: 4.7,
    reviews: 92,
    popularity: 68,
    dateAdded: BASE + 6 * DAY,
  },
  {
    id: "p11",
    slug: "linen-summer-dress",
    name: "Linen Summer Dress",
    price: 129,
    categories: ["Women"],
    colors: [{ name: "White", hex: "#f5f4f2" }, { name: "Terracotta", hex: "#c0704a" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1572804013309-59a88b7e92f1")],
    description:
      "Pure linen sundress with smocked straps, a square neckline, and side pockets. Breezy, breathable, and made for long summer days.",
    materials: "100% linen — machine wash gentle",
    rating: 4.8,
    reviews: 204,
    popularity: 86,
    isNew: true,
    isBestSeller: true,
    dateAdded: BASE + 8 * DAY,
  },
  {
    id: "p12",
    slug: "city-slip-dress",
    name: "City Slip Dress",
    price: 119,
    categories: ["Women"],
    colors: [{ name: "Black", hex: "#1d1d1f" }],
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1515372039744-b8f02a3ae446")],
    description:
      "A bias-cut slip dress in fluid satin with delicate straps and a bias hem. Layer over a fine knit for an easy city look.",
    materials: "Satin — dry clean",
    rating: 4.5,
    reviews: 61,
    popularity: 59,
    dateAdded: BASE + 11 * DAY,
  },
  {
    id: "p13",
    slug: "leather-tote-bag",
    name: "Leather Tote Bag",
    price: 149,
    categories: ["Women", "Accessories"],
    colors: [{ name: "Cognac", hex: "#9a5a32" }, { name: "Black", hex: "#1d1d1f" }],
    sizes: ["One Size"],
    images: [img("photo-1548036328-c9fa89d128fa")],
    description:
      "A structured tote in full-grain leather with a suede lining, interior zip pocket, and magnetic closure. Fits a 13-inch laptop with room to spare.",
    materials: "Full-grain leather — wipe clean",
    rating: 4.8,
    reviews: 158,
    popularity: 80,
    isBestSeller: true,
    dateAdded: BASE + 2 * DAY,
  },
  {
    id: "p14",
    slug: "structured-handbag",
    name: "Structured Handbag",
    price: 179,
    categories: ["Women", "Accessories"],
    colors: [{ name: "Noir", hex: "#1d1d1f" }, { name: "Ivory", hex: "#f5f4f2" }],
    sizes: ["One Size"],
    images: [img("photo-1584917865442-de89df76afd3")],
    description:
      "A modern structured bag with a curved silhouette, gold-tone hardware, and a detachable strap. Carries beautifully in hand or on shoulder.",
    materials: "Grained leather — wipe clean",
    rating: 4.7,
    reviews: 84,
    popularity: 73,
    isNew: true,
    dateAdded: BASE + 13 * DAY,
  },
  {
    id: "p15",
    slug: "minimal-steel-watch",
    name: "Minimal Steel Watch",
    price: 199,
    categories: ["Men", "Women", "Accessories"],
    colors: [{ name: "Steel", hex: "#b8bcc2" }],
    sizes: ["One Size"],
    images: [img("photo-1523170335258-f5ed11844a49")],
    description:
      "A refined minimalist watch with a brushed steel case, sapphire crystal, and an Italian leather strap. Swiss movement, 50m water resistance.",
    materials: "Steel, sapphire crystal, leather strap",
    rating: 4.9,
    reviews: 117,
    popularity: 78,
    dateAdded: BASE + 5 * DAY,
  },
  {
    id: "p16",
    slug: "classic-chrono-watch",
    name: "Classic Chrono Watch",
    price: 219,
    categories: ["Men", "Accessories"],
    colors: [{ name: "Black", hex: "#1d1d1f" }, { name: "Tan", hex: "#b08050" }],
    sizes: ["One Size"],
    images: [img("photo-1524805444758-089113d48a6d")],
    description:
      "A classic chronograph with a clean dial, luminous markers, and a genuine leather strap. Understated precision for every day.",
    materials: "Steel, leather strap — avoid water contact",
    rating: 4.7,
    reviews: 76,
    popularity: 66,
    dateAdded: BASE + 3 * DAY,
  },
  {
    id: "p17",
    slug: "graphic-crew-tee",
    name: "Graphic Crew Tee",
    price: 45,
    categories: ["Men", "Tops"],
    colors: [{ name: "Multi", hex: "#8a8f7a" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [img("photo-1523381210434-271e8be1f52b")],
    description:
      "A premium graphic tee in soft washed cotton with a vintage crew neckline. Printed with water-based inks that age with the fabric.",
    materials: "100% washed cotton — machine wash cold",
    rating: 4.6,
    reviews: 233,
    popularity: 70,
    dateAdded: BASE + 6 * DAY,
  },
  {
    id: "p18",
    slug: "cashmere-knit-sweater",
    name: "Cashmere Knit Sweater",
    price: 129,
    originalPrice: 159,
    categories: ["Women", "Men", "Tops"],
    colors: [{ name: "Ivory", hex: "#f5f0e6" }, { name: "Olive", hex: "#6b6b4e" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1487222477894-8943e31ef7b2")],
    description:
      "Pure cashmere in a relaxed crewneck knit with ribbed cuffs and hem. Weightless warmth with a soft, brushed finish.",
    materials: "100% cashmere — hand wash or dry clean",
    rating: 4.8,
    reviews: 129,
    popularity: 81,
    isBestSeller: true,
    dateAdded: BASE + 1 * DAY,
  },
  {
    id: "p19",
    slug: "breton-stripe-top",
    name: "Breton Stripe Top",
    price: 69,
    categories: ["Women", "Tops"],
    colors: [{ name: "Navy", hex: "#2b3a55" }],
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1496747611176-843222e1e57c")],
    description:
      "A crisp Breton stripe top in heavyweight cotton with a boat neckline and relaxed sleeve. A perennial piece that anchors any wardrobe.",
    materials: "100% cotton — machine wash cold",
    rating: 4.6,
    reviews: 98,
    popularity: 63,
    dateAdded: BASE + 4 * DAY,
  },
  {
    id: "p20",
    slug: "tailored-wool-blazer",
    name: "Tailored Wool Blazer",
    price: 219,
    categories: ["Men", "Outerwear"],
    colors: [{ name: "Charcoal", hex: "#3a3a3c" }, { name: "Navy", hex: "#2b3a55" }],
    sizes: ["S", "M", "L", "XL"],
    images: [img("photo-1552374196-1ab2a1c593e8")],
    description:
      "A half-canvassed wool blazer with a natural shoulder, patch pockets, and a clean modern cut. Tailored to be dressed up or down.",
    materials: "Wool blend — dry clean",
    rating: 4.7,
    reviews: 87,
    popularity: 74,
    dateAdded: BASE + 7 * DAY,
  },
  {
    id: "p21",
    slug: "leather-heels",
    name: "Leather Heels",
    price: 189,
    categories: ["Women", "Shoes"],
    colors: [{ name: "Black", hex: "#1d1d1f" }, { name: "Nude", hex: "#e0c3a6" }],
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [img("photo-1543163521-1bf539c55dd2")],
    description:
      "Classic leather heels with a 65mm block heel, cushioned footbed, and a refined pointed toe. Made to be worn all evening.",
    materials: "Leather, block heel",
    rating: 4.6,
    reviews: 112,
    popularity: 69,
    dateAdded: BASE + 9 * DAY,
  },
  {
    id: "p22",
    slug: "street-essential-tee",
    name: "Street Essential Tee",
    price: 42,
    categories: ["Men", "Tops"],
    colors: [{ name: "White", hex: "#f5f4f2" }, { name: "Olive", hex: "#6b6b4e" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [img("photo-1617137968427-85924c800a22")],
    description:
      "A boxy street tee with dropped shoulders and a slightly cropped hem. Heavyweight jersey with a lived-in feel from day one.",
    materials: "240gsm cotton jersey — machine wash cold",
    rating: 4.5,
    reviews: 145,
    popularity: 67,
    isNew: true,
    dateAdded: BASE + 12 * DAY,
  },
];

export const FALLBACK_IMAGE = img("photo-1441986300917-64674bd600d8", 1200);

export const formatPrice = (n: number): string => `${n.toFixed(0)} TND`;

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const COLLECTION_TILES = [
  {
    label: "WOMEN",
    title: "Effortless Elegance",
    category: "Women" as Category,
    image: img("photo-1445205170230-053b83016050", 1600),
    tall: true,
  },
  {
    label: "MEN",
    title: "Modern Essentials",
    category: "Men" as Category,
    image: img("photo-1617137968427-85924c800a22", 1600),
    tall: false,
  },
  {
    label: "STREETWEAR",
    title: "Everyday Icons",
    category: "Tops" as Category,
    image: img("photo-1529139574466-a303027c1d8b", 1600),
    tall: false,
  },
];

export const GALLERY_IMAGES = [
  { src: img("photo-1469334031218-e382a71b716b", 800), alt: "Fashion model with sunglasses" },
  { src: img("photo-1524504388940-b1c1722653e1", 800), alt: "Editorial beauty portrait" },
  { src: img("photo-1509631179647-0177331693ae", 800), alt: "Fashion campaign in red" },
  { src: img("photo-1495385794356-15371f348c31", 800), alt: "Street style editorial" },
  { src: img("photo-1539109136881-3be0616acf4b", 800), alt: "Minimal fashion portrait" },
  { src: img("photo-1503342217505-b0a15ec3261c", 800), alt: "Yellow fashion editorial" },
];

export const JOURNAL_POSTS = [
  {
    slug: "the-autumn-edit",
    title: "The Autumn Edit",
    category: "Editorial",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    excerpt:
      "Camel, rust, and deep olive — the palette of the season, styled into looks that move from studio to street.",
    image: img("photo-1483985988355-763728e1935b", 1400),
    alt: "Woman shopping bags in autumn style",
    featured: true,
  },
  {
    slug: "quiet-luxury-loud-confidence",
    title: "Quiet Luxury, Loud Confidence",
    category: "Style Notes",
    date: "Sep 21, 2026",
    readTime: "5 min read",
    excerpt:
      "Why the most powerful outfits are rarely the loudest — and how to build a wardrobe that whispers.",
    image: img("photo-1490481651871-ab68de25d43d", 900),
    alt: "Fashion portrait with wide-brim hat",
  },
  {
    slug: "building-a-capsule-wardrobe",
    title: "Building a Capsule Wardrobe",
    category: "Guides",
    date: "Sep 14, 2026",
    readTime: "6 min read",
    excerpt:
      "Twelve pieces, thirty outfits. A practical starter formula for getting dressed without the noise.",
    image: img("photo-1441984904996-e0b6ba687e04", 900),
    alt: "Curated clothing rack with neutral garments",
  },
  {
    slug: "denim-reimagined",
    title: "Denim, Reimagined",
    category: "Deep Dive",
    date: "Sep 7, 2026",
    readTime: "4 min read",
    excerpt:
      "From selvedge looms to laser finishes — what makes a great pair of jeans, and why ours are built to fade beautifully.",
    image: img("photo-1434389677669-e08b4cac3105", 900),
    alt: "Denim garments hanging in a studio",
  },
  {
    slug: "street-style-tunisian-nights",
    title: "Street Style: Tunisian Nights",
    category: "Editorial",
    date: "Aug 30, 2026",
    readTime: "3 min read",
    excerpt:
      "A walk through the medina at golden hour, where tailoring traditions meet contemporary silhouettes.",
    image: img("photo-1515886657613-9f3515b0c78f", 900),
    alt: "Fashion model in evening streetwear",
  },
  {
    slug: "the-art-of-layering",
    title: "The Art of Layering",
    category: "Guides",
    date: "Aug 23, 2026",
    readTime: "5 min read",
    excerpt:
      "Texture, proportion, and restraint — a simple framework for layering that works from October to April.",
    image: img("photo-1485968579580-b6d095142e6e", 900),
    alt: "Neutral layered fashion editorial",
  },
];

export const LOOKBOOK = [
  {
    look: "01",
    title: "Golden Hour",
    subtitle: "AW26 · Tunis Rooftop",
    quote: "Camel and cream, cut for the last light of the day.",
    image: img("photo-1524250502761-1ac6f2e30d43", 1600),
    alt: "Fashion editorial couple at golden hour",
  },
  {
    look: "02",
    title: "Soft Structure",
    subtitle: "AW26 · Studio Light",
    quote: "Tailored lines softened by natural fabric and drape.",
    image: img("photo-1558769132-cb1aea458c5e", 1600),
    alt: "Fashion editorial in soft studio light",
  },
  {
    look: "03",
    title: "Quiet Movement",
    subtitle: "AW26 · City Walk",
    quote: "Layers that move — knit over linen over intent.",
    image: img("photo-1554412933-514a83d2f3c8", 1600),
    alt: "Street fashion editorial",
  },
  {
    look: "04",
    title: "The Overcoat",
    subtitle: "AW26 · Evening",
    quote: "One statement piece. Everything else stays quiet.",
    image: img("photo-1488161628813-04466f872be2", 1600),
    alt: "Menswear editorial in evening light",
  },
  {
    look: "05",
    title: "Medina Nights",
    subtitle: "AW26 · Golden Walls",
    quote: "Where tailoring tradition meets contemporary silhouette.",
    image: img("photo-1519085360753-af0119f7cbe7", 1600),
    alt: "Portrait editorial with warm backdrop",
  },
  {
    look: "06",
    title: "Still Life",
    subtitle: "AW26 · The Edit",
    quote: "Considered pieces, considered light.",
    image: img("photo-1534528741775-53994a69daeb", 1600),
    alt: "Beauty portrait editorial",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The quality is unreal for the price. The oversized shirt is the single most worn piece in my closet — it looks expensive and feels even better.",
    name: "Amira Benali",
    role: "Verified demo reviewer",
    avatar: img("photo-1524504388940-b1c1722653e1", 200),
  },
  {
    quote:
      "Ordered the denim and the sneakers on the same day. Both arrived beautifully packed and fit exactly as described. This is how online fashion should feel.",
    name: "Youssef Hamdi",
    role: "Verified demo reviewer",
    avatar: img("photo-1507003211169-0a1dd7228f2d", 200),
  },
  {
    quote:
      "I was looking for timeless pieces that work together, and BrodaShop nailed it. The cashmere sweater is impossibly soft. Already planning my next order.",
    name: "Claire Dubois",
    role: "Verified demo reviewer",
    avatar: img("photo-1506794778202-cad84cf45f1d", 200),
  },
];

export const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 2–4 business days within Tunisia and 5–9 days internationally. Express delivery is available at checkout. (Demo policy — subject to client approval.)",
  },
  {
    q: "What is your return policy?",
    a: "Items can be returned within 30 days in original condition for exchange or refund. Sale items and final-sale pieces are excluded. (Demo policy — subject to client approval.)",
  },
  {
    q: "How do I find my size?",
    a: "Each product page includes a size guide with measurements in centimetres. If you are between sizes, we recommend sizing up for our relaxed fits. (Demo policy — subject to client approval.)",
  },
  {
    q: "What payment methods do you accept?",
    a: "This demo accepts simulated payment. In production we plan to support major cards and local payment methods. No real payment is processed here. (Demo policy — subject to client approval.)",
  },
  {
    q: "How can I contact support?",
    a: "Use the contact details the client provides once the site goes live. For this demo, every support channel is simulated locally in your browser. (Demo policy — subject to client approval.)",
  },
];
