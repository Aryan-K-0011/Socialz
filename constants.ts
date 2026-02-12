import { ServicePackage, Order, Customer, Subscription, Payment, Requirement } from './types';

export const SERVICES: ServicePackage[] = [
  {
    id: 's1',
    title: 'The Launchpad',
    category: 'Startup',
    price: 499,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrZS0l01T2Tw5xTjJnTOZTK2Yf6gGb5kuiWg&s',
    features: ['Profile Optimization', '12 Static Posts', 'Hashtag Strategy', 'Branding Kit'],
    description: 'The essential foundation for new businesses. We establish your digital authority from day one with a cohesive visual identity.',
    strategy: 'We focus on "Foundational Trust." For a startup, the first impression is the only impression. We calibrate your visual identity to signal competence and innovation, ensuring that when potential investors or customers land on your page, they see a market leader.',
    idealFor: ['Early-stage Tech Startups', 'Boutique Service Providers', 'New Product Launches', 'Solo Founders'],
    process: [
      { week: 'Week 1', title: 'Brand Audit', desc: 'Deconstructing your vision and establishing tone of voice.' },
      { week: 'Week 2', title: 'Asset Creation', desc: 'Designing the visual grid and writing core copy.' },
      { week: 'Week 3', title: 'The Launch', desc: 'Sequential posting to build narrative momentum.' },
      { week: 'Week 4', title: 'Optimization', desc: 'Analyzing initial engagement to refine the strategy.' }
    ],
    deliverables: [
      'Comprehensive Social Media Audit',
      'Bio & Highlight Optimization',
      '12 High-Fidelity Static Posts',
      '4 Animated Stories per Month',
      'Custom Hashtag & Keyword Strategy',
      'Basic Community Engagement (Replies)'
    ],
    premiumPerks: [
      'Dedicated Brand Strategist',
      'Competitor Analysis Report',
      'Weekly Strategy Calls',
      '24/7 Priority Support',
      'Advanced Analytics Dashboard'
    ]
  },
  {
    id: 's2',
    title: 'The Bistro',
    category: 'Cafe',
    price: 599,
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/a2/51/07/cafe-interiors.jpg?w=900&h=500&s=1',
    features: ['4 Food Reels', 'Menu Highlights', 'Daily Stories', 'Local SEO'],
    description: 'Sensory storytelling for culinary arts. We drive foot traffic through mouth-watering visuals and local community engagement.',
    strategy: 'We utilize "Sensory Translation." Since users cannot taste or smell through a screen, we use high-definition visuals and sound design (ASMR) to evoke appetite. We combine this with hyper-local geotagging strategies to convert viewers into walk-in guests.',
    idealFor: ['Specialty Coffee Shops', 'Fine Dining Restaurants', 'Artisanal Bakeries', 'Food Trucks'],
    process: [
      { week: 'Week 1', title: 'Menu Analysis', desc: 'identifying signature dishes and visual hooks.' },
      { week: 'Week 2', title: 'Production Shoot', desc: 'Capturing textures, pours, and plating.' },
      { week: 'Week 3', title: 'Content Rollout', desc: 'Publishing reels during peak hunger hours.' },
      { week: 'Week 4', title: 'Local Engagement', desc: 'Interacting with local influencers and foodies.' }
    ],
    deliverables: [
      'On-site Content Guidance',
      '4 Professionally Edited Reels (15-30s)',
      '15 High-Res Food Photography Posts',
      'Daily "Specials" Story Updates',
      'Google Maps & Local SEO Optimization',
      'Influencer Outreach Templates'
    ],
    premiumPerks: [
      'Monthly On-site Shoot (if local)',
      'Influencer Collaboration Management',
      'Event Promotion Strategy',
      'Menu Design Refresh'
    ]
  },
  {
    id: 's3',
    title: 'The Icon',
    category: 'Influencer',
    price: 799,
    image: 'https://cdn-icons-png.flaticon.com/512/1458/1458518.png',
    features: ['Trend Research', '8 Reels Editing', 'Caption Hooks', 'Media Kit'],
    description: 'Architecting your digital legacy. High-end personal branding for creators who demand an editorial aesthetic.',
    strategy: 'The focus is "Magnetic Authenticity." We balance high-production value with raw, relatable moments. By analyzing viral audio trends and optimizing hook structures, we position you not just as a participant in the culture, but as a tastemaker.',
    idealFor: ['Fashion & Beauty Creators', 'Lifestyle Vloggers', 'Public Speakers', 'Coaches'],
    process: [
      { week: 'Week 1', title: 'Aesthetic Audit', desc: 'Defining your color grade and editing style.' },
      { week: 'Week 2', title: 'Scripting & Briefs', desc: 'Delivering detailed content briefs for you to film.' },
      { week: 'Week 3', title: 'Post-Production', desc: 'Professional editing, color grading, and sound design.' },
      { week: 'Week 4', title: 'Growth Analytics', desc: 'Reviewing performance to optimize future hooks.' }
    ],
    deliverables: [
      'Viral Trend Research Report',
      '8 Short-Form Video Edits (Reels/TikTok)',
      'Aesthetic Feed Planning',
      'Caption Writing with Engagement Hooks',
      'Professional Media Kit Design',
      'Brand Deal Email Templates'
    ],
    premiumPerks: [
      'Direct Brand Pitching Service',
      'Contract Negotiation Support',
      'Cross-Platform Content Repurposing',
      'Personal Branding Website'
    ]
  },
  {
    id: 's4',
    title: 'The Gala',
    category: 'Wedding',
    price: 999,
    image: 'https://image.wedmegood.com/resized/720X/uploads/member/16636/1751700656_ELST3242.jpg',
    features: ['Live Event Coverage', 'Same-Day Edits', 'Guest Coordination', 'Digital Album'],
    description: 'Capturing eternity. Cinematic, real-time documentation of your most precious moments, delivered before the night ends.',
    strategy: 'We provide "Real-Time Cinema." While your photographer captures the posed perfection, we capture the energy, the movement, and the behind-the-scenes magic. Our goal is to have your guests reliving the night before they even wake up the next morning.',
    idealFor: ['Luxury Weddings', 'Gala Dinners', 'Corporate Retreats', 'Product Launch Parties'],
    process: [
      { week: 'Pre-Event', title: 'Coordination', desc: 'Aligning with your planner and shot list creation.' },
      { week: 'Event Day', title: 'Live Coverage', desc: 'On-site capturing of stories and reels.' },
      { week: 'Same Night', title: 'Rapid Edit', desc: 'Delivery of the highlight reel for evening posting.' },
      { week: 'Post-Event', title: 'Archival', desc: 'Organizing and delivering the full raw gallery.' }
    ],
    deliverables: [
      'Pre-Wedding "Save the Date" Content',
      'Dedicated Content Creator on Wedding Day',
      'Live Stories & Behind-the-Scenes Updates',
      'Same-Day Reel Edit (for evening post)',
      'Digital Guestbook Management',
      'Full Raw Footage Archive'
    ],
    premiumPerks: [
      'Honeymoon Content Package',
      'Physical Photo Album Design',
      'Thank You Video Production',
      'Anniversary Content Schedule'
    ]
  },
  {
    id: 's5',
    title: 'The Estate',
    category: 'Real Estate',
    price: 899,
    image: 'https://cdn.confident-group.com/wp-content/uploads/2024/12/27103036/types-of-real-estate-overview-scaled.jpg',
    features: ['Property Walkthroughs', 'Agent Branding', 'Lead Gen', 'Virtual Staging'],
    description: 'Immersive visual storytelling for luxury properties and high-performing agents. We turn listings into landmarks.',
    strategy: 'We sell the "Lifestyle," not just the listing. Through smooth gimbal walkthroughs and drone shots, we create an emotional connection with the property. We position the agent as the gatekeeper to an exclusive life.',
    idealFor: ['Luxury Real Estate Agents', 'Property Developers', 'Interior Designers', 'Airbnb Hosts'],
    process: [
      { week: 'Week 1', title: 'Listing Prep', desc: 'Staging consultation and shot list finalization.' },
      { week: 'Week 2', title: 'Production', desc: 'Filming walkthroughs and agent intros.' },
      { week: 'Week 3', title: 'Showcase', desc: 'Publishing carousel posts and reels.' },
      { week: 'Week 4', title: 'Lead Review', desc: 'Analyzing inquiries and ad performance.' }
    ],
    deliverables: [
      '2 Cinematic Property Walkthrough Reels',
      '10 High-End Listing Posts (Carousel/Static)',
      'Agent "Day in Life" Story Series',
      'Lead Generation Ad Setup',
      'Community Guide Highlights',
      'Open House Event Promotion'
    ],
    premiumPerks: [
      'Drone Videography Coordination',
      'Zillow/Redfin Profile Optimization',
      'Email Newsletter Design',
      'Podcast Production Support'
    ]
  },
  {
    id: 's6',
    title: 'The Merchant',
    category: 'E-Commerce',
    price: 1299,
    image: 'https://emerchantbroker.com/wp-content/uploads/2020/09/card-charging-by-machine-930x524.jpg',
    features: ['Product Reels', 'Shoppable Posts', 'Ad Creative', 'Retargeting'],
    description: 'Conversion-driven aesthetics. We bridge the gap between "Add to Cart" and high-fashion editorial.',
    strategy: 'Our approach is "Frictionless Desire." We use dynamic product videography to show the item in use, reducing purchase hesitation. This is paired with a robust retargeting strategy to capture abandoned carts.',
    idealFor: ['DTC Brands', 'Fashion Labels', 'Beauty Products', 'Home Goods'],
    process: [
      { week: 'Week 1', title: 'Product Audit', desc: 'Selecting hero products for the campaign.' },
      { week: 'Week 2', title: 'Studio Shoot', desc: 'Creating stop-motion and lifestyle content.' },
      { week: 'Week 3', title: 'Campaign Launch', desc: 'Going live with shoppable posts and ads.' },
      { week: 'Week 4', title: 'ROAS Analysis', desc: 'Optimizing ad spend based on sales data.' }
    ],
    deliverables: [
      '8 Product Showcase Reels',
      '15 Shoppable Feed Posts',
      'UGC (User Generated Content) Curation',
      'Meta Ad Creative Pack (3 variations)',
      'Shopify/IG Shop Integration Audit',
      'Flash Sale Story Sequences'
    ],
    premiumPerks: [
      'Influencer Seeding Campaign',
      'Email/SMS Marketing Flows',
      'Seasonal Lookbook Design',
      'Conversion Rate Optimization Audit'
    ]
  },
  {
    id: 's7',
    title: 'The Sanctuary',
    category: 'Wellness',
    price: 699,
    image: 'https://globalspaonline.com/uploads/2024/05/A-Sanctuary-of-World-Class-Wellness-Is-Here-In-Delhi-Image-1.jpg',
    features: ['Class Highlights', 'Member Spotlights', 'Wellness Tips', 'Community Building'],
    description: 'Cultivating a digital oasis. Calm, inspiring, and community-focused content for studios, spas, and wellness brands.',
    strategy: 'We build "Digital Community." Wellness is about belonging. We highlight member stories and provide educational value (tips, mindfulness) to keep your audience engaged even when they are not in the studio.',
    idealFor: ['Yoga Studios', 'Day Spas', 'Therapists', 'Gyms'],
    process: [
      { week: 'Week 1', title: 'Vibe Check', desc: 'Establishing the calming visual palette.' },
      { week: 'Week 2', title: 'Member Stories', desc: 'Filming testimonials and class snippets.' },
      { week: 'Week 3', title: 'Education', desc: 'Posting value-driven carousels and tips.' },
      { week: 'Week 4', title: 'Community Growth', desc: 'Engaging with local wellness hashtags.' }
    ],
    deliverables: [
      'Daily Mindfulness/Motivation Stories',
      '4 Class/Treatment Highlight Reels',
      '12 Educational Carousel Posts',
      'Instructor/Practitioner Spotlights',
      'Event/Workshop Promotion',
      'Client Testimonial Graphics'
    ],
    premiumPerks: [
      'Retreat Marketing Strategy',
      'Membership Launch Campaigns',
      'Podcast/Audio Meditations',
      'Partnership Outreach'
    ]
  },
  {
    id: 's8',
    title: 'The Executive',
    category: 'Corporate',
    price: 1199,
    image: 'https://digitaldefynd.com/IQ/wp-content/uploads/2023/11/ChatGPT-Image-Jun-25-2025-01_53_36-AM.png',
    features: ['LinkedIn Ghostwriting', 'Thought Leadership', 'Company Culture', 'Press Releases'],
    description: 'Positioning C-Suite leaders and corporations as industry authorities. We manage your reputation with precision.',
    strategy: 'We execute "Authority Engineering." We translate complex corporate milestones into compelling narratives that humanize the brand while establishing thought leadership on platforms like LinkedIn.',
    idealFor: ['CEOs & Founders', 'Consultancy Firms', 'B2B Tech', 'Law Firms'],
    process: [
      { week: 'Week 1', title: 'Voice Calibration', desc: 'Interviewing stakeholders to capture the voice.' },
      { week: 'Week 2', title: 'Content Drafting', desc: 'Writing articles and press updates.' },
      { week: 'Week 3', title: 'Publishing', desc: 'Coordinated cross-platform release.' },
      { week: 'Week 4', title: 'Network Expansion', desc: 'Strategic connection building.' }
    ],
    deliverables: [
      '4 Deep-Dive LinkedIn Articles',
      '8 Professional Thought Leadership Posts',
      'Company Culture/Behind-the-Scenes Reels',
      'Press Release Distribution Support',
      'Executive Profile Optimization',
      'Crisis Management Protocol'
    ],
    premiumPerks: [
      'Keynote Speechwriting',
      'Video Interview Production',
      'White Paper Design',
      'Internal Communcations Support'
    ]
  }
];

export const MOCK_ORDERS: Order[] = [
  { 
    id: '101', 
    customerName: 'Bean There Cafe', 
    service: 'The Bistro', 
    status: 'In Progress', 
    date: '2023-10-25', 
    amount: 599,
    timeline: [
      { title: "Brief Received", date: "Oct 24", completed: true },
      { title: "Strategy Phase", date: "Oct 25", completed: true },
      { title: "Content Production", date: "Oct 28", completed: false },
    ]
  },
  { 
    id: '102', 
    customerName: 'TechNova Startups', 
    service: 'The Launchpad', 
    status: 'Completed', 
    date: '2023-10-20', 
    amount: 499,
    timeline: [
      { title: "Brief Received", date: "Oct 20", completed: true },
      { title: "Final Delivery", date: "Nov 20", completed: true },
    ]
  },
  { 
    id: '103', 
    customerName: 'Sarah Styles', 
    service: 'The Icon', 
    status: 'Pending', 
    date: '2023-10-27', 
    amount: 799,
    timeline: [
      { title: "Order Placed", date: "Oct 27", completed: true },
    ]
  },
  { 
    id: '104', 
    customerName: 'Green Wedding', 
    service: 'The Gala', 
    status: 'In Progress', 
    date: '2023-10-26', 
    amount: 999,
    timeline: [
      { title: "Consultation", date: "Oct 26", completed: true },
      { title: "Event Planning", date: "Oct 27", completed: true },
    ] 
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Alice V.', company: 'Bean There Cafe', email: 'alice@beanthere.com', status: 'Active', joinDate: '2023-09-15' },
  { id: 'c2', name: 'Marcus T.', company: 'TechNova', email: 'marcus@technova.io', status: 'Active', joinDate: '2023-10-01' },
  { id: 'c3', name: 'Sarah J.', company: 'Personal Brand', email: 'sarah@styles.com', status: 'Inactive', joinDate: '2023-08-20' },
  { id: 'c4', name: 'Emily & Dan', company: 'Wedding', email: 'emily@gmail.com', status: 'Active', joinDate: '2023-10-25' },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: 'sub1', customerName: 'Bean There Cafe', plan: 'Premium', billingCycle: 'Monthly', nextBilling: '2023-11-25', status: 'Active', amount: 799 },
  { id: 'sub2', customerName: 'TechNova', plan: 'Standard', billingCycle: 'Monthly', nextBilling: '2023-11-20', status: 'Active', amount: 499 },
  { id: 'sub3', customerName: 'Sarah Styles', plan: 'Premium', billingCycle: 'Monthly', nextBilling: '2023-10-20', status: 'Past Due', amount: 999 },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', customerName: 'Bean There Cafe', amount: 799, date: '2023-10-25', method: 'Visa ••4242', status: 'Succeeded' },
  { id: 'pay2', customerName: 'TechNova', amount: 499, date: '2023-10-20', method: 'Mastercard ••8822', status: 'Succeeded' },
  { id: 'pay3', customerName: 'Sarah Styles', amount: 999, date: '2023-10-27', method: 'Visa ••1111', status: 'Failed' },
  { id: 'pay4', customerName: 'Green Wedding', amount: 999, date: '2023-10-26', method: 'Amex ••0005', status: 'Succeeded' },
];

export const MOCK_REQUIREMENTS: Requirement[] = [
  { 
    id: 'req1', 
    orderId: '103', 
    customerName: 'Sarah Styles', 
    serviceName: 'The Icon', 
    submittedDate: '2023-10-27', 
    status: 'Pending Review',
    details: {
      handles: '@sarahstyles',
      aesthetic: 'Minimalist, Beige tones, High fashion',
      objectives: 'Grow engagement by 20% and secure 2 brand deals.'
    }
  },
  { 
    id: 'req2', 
    orderId: '101', 
    customerName: 'Bean There Cafe', 
    serviceName: 'The Bistro', 
    submittedDate: '2023-10-25', 
    status: 'Reviewed',
    details: {
      handles: '@beanthere',
      aesthetic: 'Cozy, Warm, Rustic',
      objectives: 'Drive weekend foot traffic.'
    }
  }
];

export const PORTFOLIO = [
  { id: 1, title: 'Noir Coffee Co.', category: 'Branding', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop' },
  { id: 2, title: 'Aura Aesthetics', category: 'Influencer', image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, title: 'The Grand Summit', category: 'Event', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop' }
];

export const TESTIMONIALS = [
  { id: 1, text: "Socialz transformed our digital presence entirely. The aesthetic curation is simply unmatched.", author: "Elena R., Founder of L'Artisan" },
  { id: 2, text: "Professional, timely, and artistically brilliant. They understood our luxury positioning immediately.", author: "James C., CEO of Vertex" },
  { id: 3, text: "The engagement on our wedding posts was incredible. Truly cinematic storytelling.", author: "Sarah & Mike, Clients" }
];

export const FAQS = [
  { category: "Services", q: "What distinguishes the Premium Plan?", a: "The Premium Plan includes a dedicated brand strategist, priority 24/7 concierge support, and advanced quarterly analytics audits." },
  { category: "Services", q: "Can I customize the aesthetic direction?", a: "Absolutely. We begin every engagement with a deep-dive aesthetic calibration session to align with your vision." },
  { category: "Logistics", q: "What is the turnaround time for content?", a: "Our standard turnaround is 48 hours for edits. Premium members enjoy expedited 24-hour delivery for urgent requests." },
  { category: "Billing", q: "Do you offer refunds?", a: "We offer a satisfaction guarantee. If you're not happy with the initial strategy within the first 7 days, we provide a full refund." },
  { category: "Billing", q: "How does the subscription work?", a: "After the initial 1-month service, you can opt into our monthly recurring membership to maintain and grow your presence seamlessly." },
  { category: "Logistics", q: "Do I need to provide images?", a: "We recommend providing your own raw assets, but we also have access to premium stock libraries and can provide remote direction." }
];