export const site = {
  name: "iDM",
  tagline: "India's Fastest ID Card Printing & B2B Printing Ecosystem",
  phone: "+91 94744 18325",
  phoneHref: "tel:+919474418325",
  email: "hello@example.com",
  address: ["iDM, Kolabari, Devidanga,", "Champasari, Siliguri,", "West Bengal 734003"],
  location: "Siliguri, West Bengal",
  mapQuery: "Kolabari, Devidanga, Champasari, Siliguri, West Bengal 734003",
  url: "https://example.com",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  headingPrefix: "India's Fastest ID Card ",
  headingAccent: "Printing And Supplier",
  subheading: "A Complete B2B Printing Ecosystem for Schools, Corporates & Vendors",
  body:
    "iDM is a technology-driven B2B printing platform that simplifies bulk printing across India. From quality-checked raw materials and smart software to high-volume ID card printing, we help you manage printing at scale—transparently and efficiently.",
  primaryCta: "Order Now",
  secondaryCta: "Explore Solutions",
  caption: "Quality Control & Fulfilment Network",
  asset: "/assets/hero-id-cards.webp",
  assetAlt: "Bulk batch of printed iDM ID cards with branded blue lanyards, packed in cartons for delivery",
};

export const trustMetrics = [
  { value: 50, suffix: "+", label: "Partners" },
  { value: 25, suffix: "+", label: "Cities" },
  { value: 99, suffix: "%", label: "On-time" },
  { value: 1, suffix: "M+", label: "Cards printed" },
];

export const trustedBy = {
  label: "Trusted by industry leaders",
  title: "Schools, corporates and print vendors across India run on iDM",
  chips: ["Schools & Colleges", "Corporates", "Event Agencies", "Print Vendors", "Universities", "Coaching Institutes"],
};

export const partnerLogos = Array.from({ length: 12 }, (_, i) => ({
  id: `partner-${String(i + 1).padStart(2, "0")}`,
  src: `/assets/logos/partner-${String(i + 1).padStart(2, "0")}.svg`,
  alt: `Partner institution ${i + 1}`,
}));

export const ecosystem = {
  label: "One Stop Solution",
  title: ["One Stop Solution for the", "Entire Printing Ecosystem"],
  sub: "Complete infrastructure covering every aspect of bulk printing operations",
  pillars: [
    {
      id: "materials",
      index: "01",
      eyebrow: "Material",
      title: "Raw Material Supply",
      body:
        "Access quality-checked printing raw materials at transparent prices, delivered directly from iDM warehouses across India. We eliminate dependency on local suppliers by offering consistent quality, predictable pricing, and reliable logistics.",
      points: [
        "Quality-checked PVC sheets & consumables",
        "Transparent, centralized pricing",
        "Multiple warehouse locations across India",
        "Fast & reliable delivery timelines",
      ],
      asset: "/assets/raw-materials.webp",
      assetAlt: "PVC and Teslin sheets, lanyard rolls, card holders, hooks and badge reels in an iDM stockroom",
      tone: "ivory",
    },
    {
      id: "software",
      index: "02",
      eyebrow: "Data",
      badge: "Core platform",
      title: "Software & Technology Platform",
      body:
        "Our in-house software and mobile tools power every stage of the printing workflow— from order intake and data validation to production tracking and dispatch. iDM technology reduces errors, saves time, and gives complete operational visibility.",
      points: [
        "Order & plant management system",
        "Mobile app for partners & vendors",
        "Real-time order tracking & status updates",
        "Automated workflows & reporting",
      ],
      asset: "/assets/software-platform.webp",
      assetAlt: "iDM order management dashboard and partner mobile app",
      tone: "charcoal",
    },
    {
      id: "fulfilment",
      index: "03",
      eyebrow: "Production · Quality · Delivery",
      title: "Finished Goods & Fulfilment",
      body:
        "Leverage iDM's nationwide production and fulfilment network to deliver high-volume printing orders with speed and consistency. Every order undergoes rigorous quality checks before being delivered to the customer.",
      points: [
        "Pan-India production partner network",
        "Standardized quality assurance process",
        "On-time delivery commitment",
        "Order-level tracking & accountability",
      ],
      asset: "/assets/printing-production.webp",
      assetAlt: "Finished iDM ID cards with QR codes and branded lanyards, packaged for delivery",
      tone: "purple",
    },
  ],
  flow: ["Material", "Data", "Production", "Quality", "Delivery"],
};

export const products = {
  label: "iDM Products",
  title: ["Unlimited Printing Options.", "One Trusted Platform."],
  sub: "From business essentials to custom marketing materials, access India's largest printing catalogue with guaranteed quality and fast turnaround.",
  items: [
    { id: "holders", name: "ID Card Holders", spec: "Rigid · Soft PVC · Badge clip", asset: "/assets/products/id-card-holders.webp", requirement: "Bulk Raw Materials" },
    { id: "sheets", name: "ID Card Sheets", spec: "PVC · Inkjet · Laser", asset: "/assets/products/id-card-sheets.webp", requirement: "Bulk Raw Materials" },
    { id: "lanyards", name: "Lanyards", spec: "Satin · Sublimation · Multi-width", asset: "/assets/products/lanyards.webp", requirement: "Custom Lanyards" },
    { id: "smart", name: "Smart Cards", spec: "Chip · Contactless", asset: "/assets/products/smart-cards.webp", requirement: "Finished ID Cards" },
    { id: "accessories", name: "ID Card Accessories", spec: "Dog · Fish · England hooks", asset: "/assets/products/id-card-accessories.webp", requirement: "Bulk Raw Materials" },
    { id: "metal", name: "Metal & Plastic", spec: "Keychains · Badges", asset: "/assets/products/metal-plastic.webp", requirement: "Finished ID Cards" },
    { id: "pvc", name: "PVC & NTR Sheets", spec: "0.76mm · A4 · A3", asset: "/assets/products/pvc-ntr-sheets.webp", requirement: "Bulk Raw Materials" },
    { id: "custom", name: "Custom Printed", spec: "Bulk · Branded", asset: "/assets/products/custom-printed.webp", requirement: "Finished ID Cards" },
    { id: "rfid", name: "RFID / NFC", spec: "125kHz · 13.56MHz", asset: "/assets/products/rfid-nfc.webp", requirement: "Finished ID Cards" },
    { id: "clips", name: "Clips & Reels", spec: "Yo-yo · Bulldog · Strap", asset: "/assets/products/clips-reels.webp", requirement: "Bulk Raw Materials" },
  ],
};

export const partnershipPaths = {
  label: "Partnership Paths",
  title: ["How Can We", "Help You?"],
  sub: "Choose the path that fits your role in the printing ecosystem and access India's most reliable infrastructure.",
  paths: [
    {
      id: "vendor",
      nav: "Vendor / Entrepreneur",
      title: "Are You a Vendor or Entrepreneur?",
      body:
        "Whether you're starting a new printing business or scaling an existing one, iDM provides the supply chain, technology, and operational support needed to grow confidently.",
      points: [
        "Nationwide backend printing & fulfilment",
        "Raw materials at factory-direct prices",
        "Software to manage orders & operations",
        "Marketing and onboarding support",
      ],
      cta: "Start Your Business",
      asset: "/assets/partner-workspace.webp",
      assetAlt: "iDM representative shaking hands with a print vendor over ID card and lanyard samples",
    },
    {
      id: "materials",
      nav: "Raw Material Supply",
      badge: "Most recommended",
      title: "Looking for Raw Material Supply?",
      body:
        "Source quality-checked printing raw materials from a centralized, transparent system. iDM eliminates dependency on unverified local suppliers with predictable pricing.",
      points: [
        "Quality-checked PVC sheets & consumables",
        "Transparent pricing, no hidden margins",
        "Multiple warehouse locations pan-India",
        "Fast dispatch and delivery assurance",
      ],
      cta: "Get Raw Materials",
      asset: "/assets/warehouse.webp",
      assetAlt: "Vendor checking bulk PVC sheets, lanyard reels and clips in an iDM warehouse",
    },
    {
      id: "production",
      nav: "Production Partner",
      badge: "#1 in North-East India",
      title: "Need a Production Partner?",
      body:
        "iDM is North-East India's #1 ID card production partner. From our Siliguri hub we print and deliver bulk orders across Assam, Sikkim, Meghalaya, Mizoram and the rest of the region, on standardized workflows with clear quality benchmarks.",
      points: [
        "Hubs in Siliguri & Guwahati",
        "Standardized production & QC processes",
        "Centralized coordination & tracking",
        "Long-term partnership opportunities",
      ],
      cta: "Partner with Us",
      asset: "/assets/production-floor.webp",
      assetAlt: "ID card printing, lamination and punching machines running a batch",
    },
  ],
};

export const connectFlow = {
  label: "How it connects",
  title: ["One Network.", "Everyone Wins."],
  sub: "Vendors bring demand, production partners bring capacity, and iDM supplies the materials, software and quality control that hold it all together.",
  nodes: [
    { id: "vendor", title: "Vendors & Entrepreneurs", desc: "Sell printing in their city using the iDM app and catalogue." },
    { id: "hub", title: "iDM Platform", desc: "Raw materials, order software, QC and fulfilment coordination." },
    { id: "production", title: "Production Partners", desc: "Print and pack bulk orders to standardised benchmarks." },
  ],
};

export const leadPopup = {
  eyebrow: "Welcome to iDM",
  title: "Get a bulk printing quote in 24 hours",
  body: "Tell us a little about you and our team will call back with pricing, samples and timelines for your requirement.",
  submit: "Request a Callback",
  dismiss: "Maybe later",
  success: "Thanks! Our team will reach out shortly.",
  perks: ["Factory-direct pricing", "Free sample on bulk orders", "Pan-India delivery"],
};

export const orderModal = {
  eyebrow: "Order Now",
  title: "Place a bulk order in 60 seconds",
  body: "Tell us what you need. Our team will confirm pricing, samples and dispatch date, usually within one business day.",
  requirements: ["Finished ID Cards", "Bulk Raw Materials", "Custom Lanyards"],
  quantities: ["50–500", "500–5,000", "5,000+"],
  submit: "Send Order Request",
  success: "Order request received!",
};

export const northEast = {
  label: "North-East Coverage",
  title: ["#1 Production Partner", "in North-East India"],
  sub: "From our Siliguri hub, the gateway to the North-East, iDM prints, packs and delivers bulk ID card orders to every state in the region.",
  hubs: [
    { name: "Siliguri", note: "HQ & production hub" },
    { name: "Guwahati", note: "Regional dispatch hub" },
  ],
  stats: [
    { value: "#1", label: "Production partner in the North-East" },
    { value: "2", label: "Hubs · Siliguri & Guwahati" },
    { value: "24Hrs", label: "Dispatch on ready artwork" },
  ],
};

export const story = {
  label: "Manufacturing Story",
  steps: [
    { index: "01", title: "Source", body: "Quality-checked raw materials.", asset: "/assets/story-source.webp", alt: "Hands inspecting a stack of PVC sheets" },
    { index: "02", title: "Print", body: "High-volume production.", asset: "/assets/story-print.webp", alt: "ID cards moving through a card printer" },
    { index: "03", title: "Verify", body: "Standardized quality control.", asset: "/assets/story-verify.webp", alt: "Operator checking printed cards against a QC sheet" },
    { index: "04", title: "Deliver", body: "Nationwide fulfilment.", asset: "/assets/story-deliver.webp", alt: "Packed cartons of ID cards ready for dispatch" },
  ],
};

export const industries = {
  label: "Solutions by Industry",
  title: ["Specialized Workflows for", "Every Sector"],
  sub: "From educational campuses to high-stakes corporate events, we provide industry-specific printing ecosystems designed for India at scale.",
  tabs: [
    {
      id: "education",
      name: "Educational",
      kicker: "Schools & Coachings",
      title: "ID Card Solutions for Educational Institutions",
      body:
        "iDM specializes in bulk ID card printing for schools, colleges, universities, and coaching institutes with technology-driven production, standardized quality, and fast delivery across India.",
      stats: [
        { value: "500+", label: "Schools & Colleges" },
        { value: "1M+", label: "ID Cards Printed" },
      ],
      services: [
        { name: "Student ID Cards", desc: "PVC, smart & RFID cards with secure data handling." },
        { name: "Staff ID Cards", desc: "Employee ID cards with access control features." },
        { name: "Visitor ID Cards", desc: "Temporary visitor passes for security management." },
        { name: "Custom Lanyards", desc: "Branded lanyards with school logo and colors." },
        { name: "ID Keychains", desc: "Durable school-branded metal/acrylic keychains." },
        { name: "Bulk Sets", desc: "Complete ID sets (Card + Lanyard + Keychain)." },
      ],
      provide: ["PVC & Smart ID Cards", "Branded Lanyards", "Metal & Acrylic Keychains", "Complete Bulk Sets"],
      advantages: [
        "Automated ID card printing from student database",
        "Bulk pricing for 100 to 10,000+ ID cards",
        "Fast turnaround: 5-7 days for bulk orders",
        "Multi-campus support with centralized ordering",
      ],
      cta: "Order for Your Institution",
      asset: "/assets/school-id-cards.webp",
      assetAlt: "Bulk student ID cards with school lanyards laid out on a desk",
    },
    {
      id: "events",
      name: "Event Management",
      kicker: "Conferences & Expos",
      title: "Delegate Passes, Visitor Badges & VIP Lanyards",
      body:
        "Delegate passes, laminated visitor badges and VIP / backstage lanyards for conferences, expos and concerts, produced through the standardized iDM workflow with fast turnaround and order-level tracking.",
      stats: [
        { value: "24Hrs", label: "Dispatch" },
        { value: "25+", label: "Cities" },
      ],
      services: [
        { name: "Delegate Passes", desc: "Delegate, speaker and crew passes." },
        { name: "Laminated Visitor Badges", desc: "Durable passes for expo access." },
        { name: "VIP & Backstage Lanyards", desc: "Colour-coded access lanyards." },
        { name: "Custom Lanyards", desc: "Branded lanyards in event colours." },
        { name: "ID Card Holders", desc: "Clear and rigid holders for badges." },
        { name: "Bulk Sets", desc: "Card + lanyard + holder kits." },
      ],
      provide: ["Delegate Passes", "Branded Lanyards", "Holders & Reels", "Complete Kits"],
      advantages: [
        "24 hour dispatch on ready artwork",
        "Centralized coordination & tracking",
        "Standardized quality assurance process",
        "Pan-India delivery",
      ],
      cta: "Plan Your Event Passes",
      asset: "/assets/event-badges.webp",
      assetAlt: "Delegate passes, visitor badges and VIP lanyards at an event registration desk",
    },
    {
      id: "corporate",
      name: "Corporate Sector",
      kicker: "Enterprises & Org.",
      title: "Employee ID & Access Cards for Banking & IT",
      body:
        "Employee ID cards with access chips and magnetic stripes, executive clips and premium lanyards for banks, IT companies and offices, backed by secure data handling and multi-location ordering.",
      stats: [
        { value: "100K+", label: "Happy Customers" },
        { value: "99%", label: "On-time" },
      ],
      services: [
        { name: "Chip & Magstripe Cards", desc: "Employee cards with access chips or magnetic stripes." },
        { name: "Visitor ID Cards", desc: "Temporary visitor passes for security management." },
        { name: "Smart Cards", desc: "RFID / NFC cards for access systems." },
        { name: "Custom Lanyards", desc: "Branded lanyards with company logo." },
        { name: "Executive Clips & Reels", desc: "Metal-edge holders and badge reels." },
        { name: "Bulk Sets", desc: "Complete onboarding kits." },
      ],
      provide: ["PVC & Smart ID Cards", "RFID / NFC Cards", "Branded Lanyards", "Complete Bulk Sets"],
      advantages: [
        "Secure data handling",
        "Multi-location support with centralized ordering",
        "Order-level tracking & accountability",
        "On-time delivery commitment",
      ],
      cta: "Order for Your Organisation",
      asset: "/assets/corporate-id-cards.webp",
      assetAlt: "Corporate chip access ID cards in executive holders with badge reels and lanyards",
    },
  ],
};

export const idCardFeatures = [
  { id: "rfid", label: "RFID", title: "RFID layer", body: "125kHz / 13.56MHz antenna and chip laminated inside the card body for access control and attendance.", pos: { x: -1, y: -0.6 } },
  { id: "security", label: "Security", title: "Secure data handling", body: "Data validated in the iDM platform before print; each card tracked at order level.", pos: { x: 1, y: -0.7 } },
  { id: "design", label: "Custom Design", title: "Card artwork", body: "Choose from 250+ design templates or supply institution branding. Edge-to-edge print.", pos: { x: -1.15, y: 0.15 } },
  { id: "pvc", label: "PVC", title: "0.76mm PVC", body: "Quality-checked PVC sheets, laminated to a standard 0.76mm card thickness.", pos: { x: 1.15, y: 0.1 } },
  { id: "nfc", label: "NFC", title: "NFC option", body: "Tap-enabled smart cards for contactless identification and access.", pos: { x: -0.85, y: 0.85 } },
  { id: "lanyard", label: "Lanyard", title: "Lanyard & hook", body: "Concentric, satin, tube or border lanyards with dog, fish, England or wire hooks.", pos: { x: 0.9, y: 0.9 } },
];

export const proofStats = [
  { value: "24Hrs", label: "Dispatch", kicker: "24 hour dispatch" },
  { value: "100K+", label: "Happy customers", kicker: "Across India" },
  { value: "250+", label: "Design templates", kicker: "Ready to print" },
];

export const faqs = [
  {
    q: "What makes iDM different from other printing companies?",
    a: "iDM is not a single print shop. It is a B2B ecosystem connecting quality-checked raw materials, in-house order and plant software, a pan-India production partner network and a standardized quality-control and fulfilment process—so bulk printing can be managed transparently at scale.",
  },
  {
    q: "Are there any eco-friendly printing options available?",
    a: "Yes. Ask our team about eco-friendly card and lanyard options when you submit your inquiry; we will recommend suitable materials for your order volume.",
  },
  {
    q: "Can I order samples before placing a larger order?",
    a: "Yes. Samples can be arranged before a bulk order so you can verify material, print quality and finish. Share your requirement through the contact form and our team will coordinate.",
  },
  {
    q: "What payment methods does iDM accept?",
    a: "We support standard business payment methods including bank transfer and UPI. Payment terms for partners and bulk orders are confirmed at onboarding.",
  },
  {
    q: "What if I have specific design requirements or need assistance with my order?",
    a: "Our team assists with artwork, data formatting and product selection. Describe your requirement in the inquiry form or call +91 94744 18325 and we will help you set up the order.",
  },
];

export const cta = {
  title: ["Ready to Transform", "Your Printing Business?"],
  body: "Join India's fastest-growing B2B printing network. Access high-quality raw materials, smart software tools, and a reliable fulfilment ecosystem.",
  primary: "Become a Partner",
  secondary: "Schedule a Demo",
  chips: ["Flexible onboarding", "No upfront costs", "Pan-India Support"],
};

export const contact = {
  label: "Contact Us",
  title: ["Let's Discuss", "Your Printing", "Requirements"],
  body: "Whether you're a school, a corporate office, or a printing vendor, our team is ready to help you optimize your bulk printing operations.",
  productOptions: [
    "ID Cards",
    "ID Card Holders",
    "ID Card Sheets",
    "Lanyards",
    "Smart Cards",
    "RFID / NFC Cards",
    "ID Card Accessories",
    "ID Card Machines",
    "Printing Software",
  ],
};

export const footer = {
  blurb: "India's B2B printing ecosystem — quality-checked raw materials, smart order software and a nationwide production network, headquartered in Siliguri.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
  columns: [
    {
      title: "Services",
      links: ["ID Cards", "ID Card Holders", "ID Card Accessories", "ID Card Machines", "ID Card Sheets", "Lanyards", "Smart Cards"],
    },
    {
      title: "ID-Card",
      links: [
        "Student ID Cards",
        "School ID Cards",
        "College ID Cards",
        "University ID Cards",
        "Teacher ID Cards",
        "Employee ID Cards",
        "Visitor ID Cards",
        "Event ID Cards",
        "PVC ID Cards",
        "Plastic ID Cards",
      ],
    },
    {
      title: "Accessories",
      links: ["Dog Hook", "Fish Hook", "England Hook", "Wire Hook", "Seals", "Split Ring", "Clips", "Metal Cap"],
    },
    {
      title: "Lanyard",
      links: ["Concentric Lanyard", "Multicolor Lanyard", "White Satin Roll", "Colour Satin Roll", "Tube Roll Lanyard", "Border Lanyard"],
    },
  ],
  legal: [
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: "Privacy Policy", href: "/p/privacy-policy" },
    { label: "Terms and Conditions", href: "/p/terms-of-service" },
  ],
  copyright: "© 2026 iDM - ID Card & Lanyard Printing Services. All rights reserved.",
};
