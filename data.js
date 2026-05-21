// Ottoman seat cover — content data (Bahasa Malaysia)
// All numbers/lists placeholder until real Supabase + CMS feed available.

window.OTT = window.OTT || {};

// -------- Painpoints (Taobao-style scroll) --------
OTT.painpoints = [
  {
    id: "spill",
    num: "01",
    title: "Anak tumpah <em>susu</em>, terus rosak.",
    body: "Susu, jus, ais kopi — fabrik asal serap dalam sekejap. Bau melekat, kotor susah hilang. Setiap kali jalan-jalan dengan keluarga, you risau pasal seat.",
    quote: "“Tumpah satu kali je, dah seminggu bau.”",
    mediaTag: "PHOTO",
    mediaTone: "leather",
    mediaBrief: "Top-down shot: anak kecil tumpah botol susu atas seat fabrik. Mood lighting natural, dari atas, focus pada noda. Mood: panik tapi cinematic.",
    mediaDim: "1200×900"
  },
  {
    id: "sweat",
    num: "02",
    title: "Cuaca <em>Malaysia</em> — peluh + fabrik = noda kekal.",
    body: "Jam macet KL panas terik 35°C. Peluh + minyak kulit serap masuk fabrik. Lama-lama jadi tompok kuning, bau apek, walaupun selalu vacuum.",
    quote: "“Macam mana nak hilangkan tompok kuning ni?”",
    mediaTag: "PHOTO",
    mediaTone: "default",
    mediaBrief: "Close-up driver seat fabric: noda kuning di area bahagian belakang & paha. Bahagian seat lain ok. Lighting harsh midday — tunjuk masalah jelas.",
    mediaDim: "1200×900"
  },
  {
    id: "upholstery",
    num: "03",
    title: "Upholstery shop = <em>RM 5,000</em> + kereta hilang 3 hari.",
    body: "Bawa ke shop upholstery: kuotasi mahal, kereta kena tinggal 2-3 hari, tak boleh kerja. Hasilnya pun lock-in — kalau bosan warna, takkan tukar lagi.",
    quote: "“Quote RM 4,800. Kereta kena tinggal sampai Khamis.”",
    mediaTag: "PHOTO",
    mediaTone: "dark",
    mediaBrief: "Shop scene: kereta tanpa seat di workshop, seat dibuka berselerak, mekanik kerja. Mood: messy, lama, mahal.",
    mediaDim: "1200×800"
  },
  {
    id: "cheap",
    num: "04",
    title: "Cover murah <em>shopee</em> — slip, kembung, ugly.",
    body: "Universal cover RM89 — pakai 2 minggu dah longgar. Tak fit shape seat anda. Tepi naik, jahitan koyak, tak boleh pasang seatbelt elok.",
    quote: "“Universal kononnya — fit pun tak fit.”",
    mediaTag: "VIDEO",
    mediaTone: "default",
    mediaBrief: "Side-by-side: kiri cover universal slip & berkedut. Kanan cover Ottoman custom — fit sempurna. 6 saat looping.",
    mediaDim: "1200×900"
  },
  {
    id: "cracks",
    num: "05",
    title: "Seat asal dah <em>retak</em> & terkopek.",
    body: "Kereta lama, leather dashboard dah pecah-pecah. Tukar kat workshop mahal, tapi tak buat — kereta nampak murah, jual pun jatuh harga.",
    quote: "“Trade-in kena potong RM 3k sebab seat.”",
    mediaTag: "PHOTO",
    mediaTone: "cocoa",
    mediaBrief: "Close-up: leather seat lama retak, pecah, sponge keluar. Lighting: side light, dramatic, tunjuk texture rosak.",
    mediaDim: "1200×900"
  }
];

// -------- Solution / 5-layer system --------
OTT.layers = [
  { num: 1, title: "Easy-Clean Coating", desc: "Lapisan permukaan kalis noda — lap sekali habis." },
  { num: 2, title: "Premium Nappa Leather", desc: "Texture seperti kulit asal kereta luxury." },
  { num: 3, title: "Waterproofing Film", desc: "Air, susu, kopi — semua diatasi, tak serap." },
  { num: 4, title: "Anti-Slip Grip", desc: "Bawah cover ada grip — tak gelongsor walau drive aggresive." },
  { num: 5, title: "Impact Absorbing", desc: "Padding tebal — duduk lagi selesa dari seat asal." }
];

// -------- Series (4 tiers) --------
OTT.series = [
  {
    id: "origin",
    name: "Origin",
    badge: "Paling Berbaloi",
    tagline: "Smart protection, simple looks.",
    body: "Pilihan masuk gerbang — protection asas, look bersih, harga kawan.",
    price: "RM 1,088",
    priceWas: null,
    thickness: "4mm",
    layers: "10x",
    warranty: "1 thn",
    tone: "default"
  },
  {
    id: "adamas",
    name: "Adamas",
    badge: "Paling Popular",
    tagline: "Leather luxury, daily essential.",
    body: "Diamond stitching, leather grade premium. Yang ramai pilih bila trade-up dari fabric asal.",
    price: "RM 1,488",
    priceWas: "RM 1,888",
    thickness: "6mm",
    layers: "14x",
    warranty: "3 thn",
    tone: "leather"
  },
  {
    id: "eleven",
    name: "Eleven",
    badge: "Limited Edition",
    tagline: "Glittering aesthetics, head-turner.",
    body: "Bintang-bintang dalam material — pantul cahaya, malam jadi galaxy. Untuk yang nak nampak beda.",
    price: "RM 1,888",
    priceWas: "RM 2,288",
    thickness: "8mm",
    layers: "20x",
    warranty: "5 thn",
    tone: "galaxy"
  },
  {
    id: "titan",
    name: "Titan",
    badge: "Paling Tahan",
    tagline: "Heavy duty, carbon edge.",
    body: "Look macam carbon fibre, padding paling tebal. Untuk yang drive hari-hari & bawa kerja berat.",
    price: "RM 1,988",
    priceWas: "RM 2,488",
    thickness: "8mm",
    layers: "20x",
    warranty: "5 thn",
    tone: "dark"
  }
];

// -------- Configurator colors --------
// 18 colors × 3 zones = thousands of combos
OTT.colors = [
  { id: "black",   hex: "#1F1F1F", name: "Onyx",     tone: "dark"    },
  { id: "cocoa",   hex: "#5C3A22", name: "Cocoa",    tone: "cocoa"   },
  { id: "maroon",  hex: "#6B1F23", name: "Maroon",   tone: "maroon"  },
  { id: "red",     hex: "#A02828", name: "Crimson",  tone: "maroon"  },
  { id: "tan",     hex: "#C68A5C", name: "Tan",      tone: "leather" },
  { id: "cream",   hex: "#E8DCC4", name: "Cream",    tone: "default" },
  { id: "white",   hex: "#F2EEE8", name: "Ivory",    tone: "default" },
  { id: "gold",    hex: "#B89456", name: "Gold",     tone: "leather" },
  { id: "blue",    hex: "#2B3A5E", name: "Galaxy",   tone: "galaxy"  },
  { id: "navy",    hex: "#0F1B33", name: "Navy",     tone: "galaxy"  },
  { id: "olive",   hex: "#5A5A30", name: "Olive",    tone: "cocoa"   },
  { id: "grey",    hex: "#4A4A4A", name: "Graphite", tone: "dark"    },
  { id: "silver",  hex: "#A8A8A8", name: "Silver",   tone: "default" },
  { id: "orange",  hex: "#F3A86D", name: "Peach",    tone: "peach"   },
  { id: "purple",  hex: "#3D2A4A", name: "Plum",     tone: "dark"    },
  { id: "forest",  hex: "#1F3A2E", name: "Forest",   tone: "cocoa"   },
  { id: "bronze",  hex: "#8B5A33", name: "Bronze",   tone: "leather" },
  { id: "blush",   hex: "#D4A28C", name: "Blush",    tone: "peach"   }
];

// Curated themes
OTT.themes = [
  { id: "classic",    name: "Classic",    tagline: "Cocoa · Tan · Gold",         colors: ["cocoa", "tan", "gold"] },
  { id: "midnight",   name: "Midnight",   tagline: "Onyx · Graphite · Tan",       colors: ["black", "grey", "tan"] },
  { id: "racing",     name: "Racing",     tagline: "Crimson · Onyx · Silver",     colors: ["red", "black", "silver"] },
  { id: "executive",  name: "Executive",  tagline: "Maroon · Cream · Gold",       colors: ["maroon", "cream", "gold"] },
  { id: "galaxy",     name: "Galaxy",     tagline: "Navy · Silver · Peach",       colors: ["blue", "silver", "orange"] },
  { id: "natural",    name: "Natural",    tagline: "Bronze · Cream · Cocoa",      colors: ["bronze", "cream", "cocoa"] },
  { id: "forest",     name: "Forest",     tagline: "Forest · Tan · Cream",        colors: ["forest", "tan", "cream"] },
  { id: "blush",      name: "Blush",      tagline: "Blush · Ivory · Tan",         colors: ["blush", "white", "tan"] },
  { id: "navy-tan",   name: "Sailor",     tagline: "Navy · Tan · Cream",          colors: ["navy", "tan", "cream"] },
  { id: "plum",       name: "Velvet",     tagline: "Plum · Gold · Cream",         colors: ["purple", "gold", "cream"] },
  { id: "olive",      name: "Safari",     tagline: "Olive · Tan · Bronze",        colors: ["olive", "tan", "bronze"] },
  { id: "crimson",    name: "Heritage",   tagline: "Maroon · Cocoa · Gold",       colors: ["maroon", "cocoa", "gold"] }
];

// -------- Car list (placeholder until Supabase) --------
OTT.cars = {
  Perodua: ["Myvi 2024", "Myvi 2023", "Myvi 2018-2022", "Axia 2023", "Axia 2017-2022", "Bezza", "Aruz", "Alza 2023", "Alza 2014-2022", "Ativa", "Kancil"],
  Proton:  ["Saga 2022", "Saga 2016-2021", "Persona 2022", "Persona 2016-2021", "X50", "X70", "X90", "Iriz", "Exora", "Preve", "Inspira"],
  Toyota:  ["Vios 2023", "Vios 2019-2022", "Yaris", "Corolla Altis", "Camry", "Hilux", "Innova", "Veloz", "Avanza", "Fortuner", "Alphard", "Vellfire", "Estima"],
  Honda:   ["City 2024", "City 2020-2023", "Civic 2022", "Civic 2016-2021", "Accord", "HR-V 2022", "HR-V 2015-2021", "CR-V", "BR-V", "Jazz", "WR-V", "Odyssey"],
  Mazda:   ["Mazda 2", "Mazda 3", "Mazda 6", "CX-3", "CX-5", "CX-8", "CX-30"],
  Nissan:  ["Almera 2022", "Almera 2012-2021", "Serena", "Navara", "X-Trail", "Sylphy", "Latio"],
  Mitsubishi: ["Triton", "Xpander", "ASX", "Outlander", "Pajero Sport"],
  BMW:     ["3 Series", "5 Series", "X1", "X3", "X5", "1 Series"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLA", "GLC"],
  "Volkswagen": ["Polo", "Vento", "Tiguan", "Passat"],
  Hyundai: ["Elantra", "Tucson", "Santa Fe", "Starex", "Ioniq 5"],
  Kia:     ["Picanto", "Cerato", "Sportage", "Sorento", "Carnival"],
  Ford:    ["Ranger", "Everest", "Focus"],
  Isuzu:   ["D-Max", "MU-X"],
  GWM:     ["Ora 03", "Tank 300"],
  BYD:     ["Atto 3", "Seal", "Dolphin"],
  "Chery": ["Omoda 5", "Tiggo 8 Pro"]
};

// -------- Testimonials (10) --------
OTT.testimonials = [
  { name: "Aiman R.", car: "Honda City 2023, Selangor", quote: "Pasang dalam 2 jam, sampai-sampai terus install. Macam baru beli kereta semula.", rating: 5, mediaTone: "leather" },
  { name: "Siti N.",  car: "Perodua Myvi 2024, KL",     quote: "Anak tumpah ice-cream — lap sekali siap. Worth every ringgit.", rating: 5, mediaTone: "default" },
  { name: "Faizal H.",car: "Toyota Vios 2022, JB",      quote: "Quote kedai upholstery RM4.8k. Ottoman half harga, kerja lagi cantik.", rating: 5, mediaTone: "cocoa" },
  { name: "Rachel L.",car: "Honda HR-V 2022, Penang",   quote: "Stitch & color combo unik — selalu kawan tanya kat mana buat.", rating: 5, mediaTone: "maroon" },
  { name: "Hafiz S.", car: "Proton X50, Klang",         quote: "Free up-to-door — sampai rumah terus pasang. Tak payah cuti.", rating: 5, mediaTone: "default" },
  { name: "Wei Ming K.", car: "Mazda CX-5, Subang",     quote: "Galaxy series memang glitter — malam time drive macam dalam space.", rating: 5, mediaTone: "galaxy" },
  { name: "Kavitha P.", car: "Perodua Bezza, Ipoh",     quote: "Saya guna grab — protect seat hari-hari dari penumpang. Worth.", rating: 5, mediaTone: "default" },
  { name: "Daniel T.", car: "Toyota Hilux, Shah Alam",   quote: "Drive site kerja, balik kotor. Lap je, clean balik. Heavy duty memang.", rating: 5, mediaTone: "dark" },
  { name: "Norhayati A.", car: "Honda CR-V, KL",        quote: "Suami terkejut bila tengok. Kereta nampak macam baru bulan ni.", rating: 5, mediaTone: "leather" },
  { name: "Aizat M.", car: "Nissan Almera 2022, Putrajaya", quote: "Pakai 1 tahun — masih nampak baru. Vacuum bersih, tak luntur.", rating: 5, mediaTone: "default" }
];

// -------- Branches --------
OTT.branches = [
  { region: "Northern",  city: "Penang",   addr: "Bayan Lepas Free Industrial Zone, 11900 Bayan Lepas, Pulau Pinang.", dealers: "12+", install: "Mon–Sun" },
  { region: "Central",   city: "Selangor", addr: "Flagship — Bandar Botanik, 41200 Klang, Selangor.", dealers: "40+", install: "Mon–Sun" },
  { region: "Southern",  city: "Johor",    addr: "Taman Universiti, 81300 Skudai, Johor Bahru.", dealers: "15+", install: "Mon–Sun" }
];

// -------- FAQ --------
OTT.faqs = [
  {
    q: "Berapa lama untuk pasang?",
    a: "Dalam 60–90 minit untuk kereta standard 5-seater. Booking up-to-door kami sampai ke rumah/office anda, pasang on-site. Tak perlu tinggal kereta."
  },
  {
    q: "Panas ke duduk?",
    a: "Tidak. Lapisan ke-3 (waterproofing film) breathable, dan padding ke-5 spread heat dengan baik. Customer kami test parking outdoor jam 2 petang — masih selesa berbanding leather original."
  },
  {
    q: "Senang koyak ke?",
    a: "Material Nappa leather grade premium tahan calar haiwan peliharaan & seatbelt friction. Warranty kami sampai 5 tahun (Titan & Eleven series) — kalau ada defect manufacturing, kami ganti."
  },
  {
    q: "Boleh wash ke?",
    a: "Ya. Sebab waterproof, anda boleh sapu dengan kain basah + sabun lembut. Untuk noda berat, gunakan leather conditioner (free dalam bundle order minggu ini)."
  },
  {
    q: "Kalau model kereta saya tak ada dalam list?",
    a: "WhatsApp tim kami — kami support 1,200+ model. Walaupun model tak common (e.g. Hyundai Starex 2014, Estima 2008), kami ada pattern atau buat custom."
  },
  {
    q: "Boleh bayar ansuran ke?",
    a: "Boleh. Bundle minggu ini ada 0% instalment 6 bulan via Atome. Deposit RM50 hari ini, baki dibayar bulanan tanpa interest."
  },
  {
    q: "Up-to-door service untuk semua kawasan?",
    a: "Kawasan Lembah Klang sahaja (Selangor, KL, Putrajaya) yang free up-to-door. Luar kawasan: appoint dealer terdekat — ada 100+ dealer Malaysia."
  },
  {
    q: "Kalau saya tak puas hati?",
    a: "Anda ada 7 hari trial period selepas install. Tak puas hati, kami ganti / refund deposit (terma & syarat apply). Ottoman dah serve 27,000+ pemilik kereta sejak 2016."
  }
];

// -------- Bundle perks --------
OTT.perks = [
  { ic: "🚚", title: "Free Up-to-Door Service", desc: "Klang Valley sahaja. Kami sampai ke rumah / office anda, pasang on-site.", value: "Worth RM150", feature: true },
  { ic: "🔧", title: "Free Priority Installation", desc: "Skip queue. Jadual pasang dalam 5 hari kerja, bukan 14 hari macam standard.", value: "Worth RM200" },
  { ic: "🧴", title: "Free Leather Conditioner", desc: "Botol penjagaan kulit official, sampai untuk 2 tahun guna.", value: "Worth RM89" },
  { ic: "💳", title: "0% Instalment 6 Bulan", desc: "Via Atome — deposit RM50 je hari ini, baki bayar bulanan tanpa interest.", value: "0% interest" },
  { ic: "🎁", title: "15% Discount", desc: "Hanya untuk order dalam tempoh promosi 48 jam. Harga akan kembali normal selepas itu.", value: "Save up to RM 450" },
  { ic: "🛡️", title: "Extended Warranty +1 Year", desc: "Tambah 1 tahun warranty atas terma original — cover wear & tear sambil pakai harian.", value: "Worth RM250" }
];

// -------- Funnel steps --------
OTT.funnelSteps = [
  { num: 1, title: "Deposit RM 50 sahaja", desc: "Reserve slot anda. Refundable kalau pakai tak jadi.", meta: "Hari ini" },
  { num: 2, title: "Designer reach out", desc: "Tim kami WhatsApp anda dalam 24 jam. Pilih warna, stitching, threading.", meta: "1–2 hari", feature: true },
  { num: 3, title: "Confirm & bayar baki", desc: "Tengok mock-up & confirm. Baki dibayar — production start.", meta: "Hari 3" },
  { num: 4, title: "Install di rumah anda", desc: "Free up-to-door (Klang Valley). Dipasang on-site dalam 90 minit.", meta: "Hari 7–10" }
];


// -------- Image manifest (maps slot to FAL AI generated or uploaded images) --------
// When images are generated via FAL AI, add them to generated-images/ and
// update the paths here. Leave a slot as null to keep placeholder mode.
OTT.images = {
  heroSplit:   "generated-images/hero-split.jpg",
  heroFull:    "generated-images/hero-full.jpg",
  heroGallery: {
    main:       "generated-images/hero-gallery-main.jpg",
    macro:      "generated-images/hero-gallery-macro.jpg",
    solo:       "generated-images/hero-gallery-solo.jpg",
    wide:       "generated-images/hero-gallery-wide.jpg",
    glitter:    "generated-images/hero-gallery-glitter.jpg",
  },
  painpoints: {
    spill:      "generated-images/painpoint-spill.jpg",
    sweat:      "generated-images/painpoint-sweat.jpg",
    upholstery: "generated-images/painpoint-upholstery.jpg",
    cheap:      "generated-images/painpoint-cheap.jpg",
    cracks:     "generated-images/painpoint-cracks.jpg",
  },
  solution:    "generated-images/solution-layers.jpg",
  wow: {
    beforeAfter:  "generated-images/wow-before-after.jpg",
    interior:     "generated-images/wow-interior.jpg",
    galaxy:       "generated-images/wow-galaxy.jpg",
    macroStitch:  "generated-images/wow-macro-stitch.jpg",
    installTL:    "generated-images/wow-installtl.jpg",
    showroom:     "generated-images/wow-showroom.jpg",
  },
  series: {
    origin: "uploads/1.Origin.jpeg",
    adamas: "uploads/1.Adamas.jpeg",
    eleven: "uploads/1.Eleven.jpeg",
    titan:  "uploads/1.Titan.jpeg",
  },
  testimonial: "generated-images/testimonial-generic.jpg",
  branches: {
    penang:   "uploads/branch-penang.png",
    selangor: "uploads/branch-selangor.jpeg",
    johor:    "uploads/branch-johor.jpeg",
  }
};

Object.freeze(OTT);
