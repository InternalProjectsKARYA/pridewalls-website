import { Project, CompanyInfo, Testimonial, Amenity, Highlight, Facility, LocationHighlight } from '@/lib/project-interface';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'Completed-Apartment',
    name: 'Pride Walls Espino',
    tagline: 'A gated apartment community designed for elevated family living in West Hyderabad',
    description: `Pride Walls Espino is a premium gated residential community offering thoughtfully designed 2 & 3 BHK apartments in Ameenpur, Hyderabad. Planned in accordance with HMDA norms, the project emphasizes superior construction quality, smart layouts, and ample natural light and ventilation. With elegant architecture and expansive open spaces, Espino delivers a refined lifestyle that balances modern living with everyday comfort.

The project is enriched with a wide range of outdoor and lifestyle amenities, including beautifully landscaped gardens, walking and jogging tracks, children’s play areas, sports courts, an amphitheatre, and an in-campus temple. Safety and convenience are integral to the design, featuring 24-hour security, intercom facility, RFID access, visitor parking, and well-ventilated cellar parking, ensuring a secure and hassle-free living environment.

A key attraction of the community is Club Vivian, a thoughtfully planned four-level clubhouse spanning approximately 39,000 sq. ft. It offers premium facilities such as a modern gym, indoor badminton court, yoga and meditation hall, terrace swimming pool, banquet and multipurpose halls, food court, guest rooms, knowledge centre, supermarket, creche, and a PHC with pharmacy—creating a complete lifestyle ecosystem within the community.

Developed by Pride Walls, Espino comprises six residential blocks (A to F) with a balanced mix of 2BHK and 3BHK homes, efficient floor plans, and excellent connectivity to schools, IT hubs, healthcare facilities, shopping, and entertainment zones. Espino stands as an ideal choice for families seeking a modern, well-connected, and community-centric lifestyle in West Hyderabad.`,
    location: 'Ameenpur, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.7!3d12.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'apartments',
    status: 'ongoing',
    featured: false,
    coverImage: '/pride-walls-appartments.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    ],
    amenities: [
      { id: '1', name: 'Swimming Pool', icon: 'waves', description: 'Infinity swimming pool with relaxing deck and seating', image: '/Amenities/Swimming Pool.jpg' },
      { id: '2', name: 'Children Area', icon: 'baby', description: 'Safe and vibrant play area designed for children', image: '/Amenities/Children Area.jpg' },
      { id: '3', name: 'Cricket Pitch', icon: 'activity', description: 'Dedicated cricket practice pitch for sports enthusiasts', image: '/Amenities/Cricket Pitch.jpg' },
      { id: '4', name: 'Food Court ', icon: 'utensils-crossed', description: 'Multi-cuisine food court with comfortable seating', image: '/Amenities/Food Court.jpg' },
      { id: '5', name: 'Indoor Sports', icon: 'gamepad-2', description: 'Indoor games including table tennis, carrom and more', image: '/Amenities/Indoor Sports.jpg' },
      { id: '6', name: 'Library', icon: 'book-open', description: 'Quiet reading space with curated book collection', image: '/Amenities/Library.jpg' },
      { id: '7', name: 'Temple', icon: 'landmark', description: 'Serene temple space for daily prayers and meditation', image: '/Amenities/Temple.jpg' },
      { id: '8', name: 'Shuttle Court', icon: 'circle-dot', description: 'Badminton shuttle court for recreational play', image: '/Amenities/Shuttle Court.jpg' },
    ],
    facilities: [
      { id: '1', name: 'Security & Infrastructure', icon: 'shield', description: '24/7 security with CCTV surveillance' },
      { id: '2', name: 'Power Backup', icon: 'zap', description: '100% power backup' },
      { id: '3', name: 'High-Speed Elevators', icon: 'arrow-up-down', description: 'High-speed passenger elevators' },
      { id: '4', name: 'Fire Safety', icon: 'flame', description: 'Advanced fire safety systems' },
      { id: '5', name: 'Intercom', icon: 'phone', description: 'Intercom facility for all units' },
      { id: '6', name: 'Rainwater Harvesting', icon: 'cloud-rain', description: 'Sustainable water management' },
    ],
    highlights: [
      { id: '1', title: 'Tech Park Proximity', description: 'Walking distance to major IT parks', icon: 'building-2' },
      { id: '2', title: 'Transit Ready', description: 'Metro station within 500m', icon: 'train' },
      { id: '3', title: 'Social Hub', description: 'Restaurants, malls, and entertainment nearby', icon: 'coffee' },
      { id: '4', title: 'Smart Living', icon: 'smartphone', description: 'IoT-enabled apartment management' },
    ],
    specifications: [
      {
        id: '1',
        category: 'Interiors',
        items: [
          '3BHK with study option',
          'Spacious balconies with city views',
          'Modular kitchen with premium fittings',
          'Vitrified flooring throughout',
        ],
      },
    ],
    floorPlans: [
      { id: '1', name: 'Apartment Type A', type: '2 BHK', area: '1250 sq.ft', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop' },
      { id: '2', name: 'Apartment Type B', type: '3 BHK', area: '1650 sq.ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop' },
    ],
    siteLayout: {
      image: '/master_plan.jpg',
      description: 'A high-rise tower with efficient floor plates, podium-level amenities, and basement parking. The design maximizes views and natural light for all apartments.',
      zones: [
        { id: '1', name: 'Block-A', image: '/blocks/block-a.jpg', description: 'Contains 14 unites of 2BHK each floor. Total 140 units.', blockname: 'BLOCK A – ASTER' },
        { id: '2', name: 'Block-B', image: '/blocks/block-b.jpg', description: 'Contains 11 units of 3BHK per each floor. Total 110 Units.', blockname: 'BLOCK B – BELLIS' },
        { id: '3', name: 'Block-C', image: '/blocks/block-c.jpg', description: 'Contains 20 units of 2BHK per each floor. Total 200 Units.', blockname: 'BLOCK C – COSMOS' }, 
        { id: '4', name: 'Block-D', image: '/blocks/block-d.jpg', description: 'Contains 6 units of 2BHK and 3BHK aid 3BHK per each floor. Total 90 units.', blockname: 'BLOCK D – DAHLIA' },
        { id: '5', name: 'Block-E', image: '/blocks/block-e.jpg', description: 'Contains 4 units of 2BHK and 3 Units of 3BHK per each floor. Total 70 units.', blockname: 'BLOCK E – EUSTOMA' },
        { id: '6', name: 'Block-F', image: '/blocks/block-f.jpg', description: 'Contains 11 Units of 2BHK and 7 Units of 3BHK per each floor .Total 180 Units.', blockname: ' BLOCK F – FELICIA' },
      ],
    },
    locationHighlights: [
  {
    id: '1',
    time: '5 Mins',
    items: [
      'Fusion International School',
      'Spritridge International School',
      'BHEL Circle',
      'NH-65 (Mumbai Highway)',
      'Daily essentials & local stores',
    ],
  },
  {
    id: '2',
    time: '10 Mins',
    items: [
      'Miyapur Metro Station',
      'Lingampally Railway Station (MMTS)',
      'Medicover Hospitals',
      'PRK Hospital',
      'Bollaram Industrial Area',
    ],
  },
  {
    id: '3',
    time: '15 Mins',
    items: [
      'HITEC City IT Hub',
      'BHEL Township',
      'GSM Mall & Multiplex',
      'KLM Fashion Mall',
      'The Chennai Shopping Mall',
    ],
  },
  {
    id: '4',
    time: '20 Mins',
    items: [
      'Financial District & Gachibowli',
      'Patancheru Industrial Zone',
      'American Oncology Institute',
      'Citizens Hospital',
      'Outer Ring Road (ORR)',
    ],
  },
],

    priceRange: { min: 0.95, max: 1.2, currency: 'Cr' },
    area: { min: 1084, max: 1779, unit: 'sq.ft' },
    totalUnits: 790,
    projectSize: '7 Acres',
    reraApproved: true,
    hmdaApproved: true,
    reraNumber: 'RERA/1251/310/PR/200325',
    approvals: [''],
  },
  {
    id: '2',
    slug: 'premimum-plots',
    name: 'Pride Walls Premium Plots',
    tagline: 'A plotted community planned for long-term value, approvals, and future-ready living',
    description: `Pride Walls Premium Plots is a thoughtfully planned plotted development in Rudraram, Hyderabad, created for buyers who value location, flexibility, and long-term appreciation. The layout brings together wide internal roads, essential infrastructure, landscaped avenues, and a secure entrance experience to create a community that feels investment-ready from day one.

With strong access to NH-65, ORR, education hubs, and major business districts, the project is positioned for both end users and investors seeking a strategic land purchase in a high-growth corridor. The planning prioritizes convenience, clean circulation, and infrastructure that supports future residential development.

Whether you are looking to build your dream home over time or secure land in an expanding micro-market, Pride Walls Premium Plots offers a well-connected address with the confidence of a professionally planned real-estate opportunity.`,
    location: 'Rudraram, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.68!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'plots',
    status: 'upcoming',
    featured: false,
    coverImage: '/plots.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    ],
    // amenities: [
    //   { id: '1', name: 'High-Speed Elevators', icon: 'arrow-up-down', description: 'High-speed passenger and service elevators', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
    //   { id: '2', name: 'Power Backup', icon: 'zap', description: '100% DG power backup', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' },
    //   { id: '3', name: 'Conference Rooms', icon: 'presentation', description: 'Fully equipped meeting rooms', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
    //   { id: '4', name: 'Food Court', icon: 'utensils', description: 'Multi-cuisine food court', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop' },
    //   { id: '5', name: 'Parking', icon: 'car', description: 'Multi-level parking for 500+ vehicles', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=600&fit=crop' },
    //   { id: '6', name: 'Security', icon: 'shield', description: '24/7 security with access control', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop' },
    // ],
    facilities: [
  { id: '1', name: 'Grand Entrance & Gate', icon: 'landmark', description: 'Secure and elegant community entrance' },
  { id: '2', name: 'Compound Wall', icon: 'fence', description: 'Complete boundary safety and privacy' },
  { id: '3', name: 'Underground Water Supply', icon: 'droplet', description: 'Reliable concealed water distribution' },
  { id: '4', name: 'Underground Electricity', icon: 'zap', description: 'Safe underground power infrastructure' },
  { id: '5', name: 'Internal Concrete Roads', icon: 'route', description: 'Wide and durable internal roads' },
  { id: '6', name: 'Rainwater Drainage', icon: 'cloud-rain', description: 'Efficient rainwater flow system' },
  { id: '7', name: 'Sewage & STP', icon: 'database', description: 'Modern sewage treatment facility' },
  { id: '8', name: 'Avenue Plantation', icon: 'tree-pine', description: 'Green landscaped roadside plantation' },
],
    highlights: [
      { id: '1', title: 'Approval-Ready Planning', description: 'A plotted layout designed with clear road grids, essential services, and approval-focused planning.', icon: 'file-check' },
      { id: '2', title: 'Growth Corridor Access', description: 'Strong connectivity to NH-65, ORR, education hubs, and Hyderabad’s expanding western belt.', icon: 'trending-up' },
      { id: '3', title: 'Build at Your Pace', description: 'An ideal option for buyers who want land security today with the flexibility to build later.', icon: 'layout' },
    ],
    specifications: [
      {
        id: '1',
        category: 'Layout Planning',
        items: [
          'Grand entrance arch with secured access',
          'Clearly defined plot demarcation',
          'Wide internal roads for smooth circulation',
          'Landscaped avenue plantation across the layout',
        ],
      },
      {
        id: '2',
        category: 'Infrastructure',
        items: [
          'Underground electricity and water lines',
          'Stormwater drainage and sewage planning',
          'Street lighting across internal roads',
          'Infrastructure designed for long-term residential use',
        ],
      },
    ],
    siteLayout: {
      image: '/plots-master-plan1.jpg',
      description: 'The plotted master plan is arranged for clarity and long-term liveability, with a welcoming entrance sequence, efficient internal roads, service corridors, and well-placed open areas that make future home construction easier to plan.',
      zones: [
        { name: 'Entrance Boulevard', color: '#7A2430', description: 'Arrival zone with entry experience, security, and primary access into the layout.' },
        { name: 'Residential Plot Zone A', color: '#B9985A', description: 'A well-organised set of plots connected through wide internal roads and service lines.' },
        { name: 'Residential Plot Zone B', color: '#8B6C45', description: 'Additional residential pockets planned for flexible plot selection and future home design.' },
        { name: 'Open & Utility Zone', color: '#556B5D', description: 'Landscaped pockets and infrastructure support areas that improve the overall community experience.' },
      ],
    },
    locationHighlights: [
      {
        id: '1',
        category: 'IT & Business Hubs',
        icon: 'building',
        items: [
          'Neopolis Ultra Premium SEZ - 30 mins',
          'Financial District - 35 mins',
          'HITEC City - 40 mins',
        ],
      },
      {
        id: '2',
        category: 'Healthcare & Essentials',
        icon: 'heart-pulse',
        items: [
          'Multi-specialty Hospitals - Nearby',
          'Supermarkets & Retail Hubs - Nearby',
          'Hotels & Restaurants - Nearby',
        ],
      },
      {
        id: '3',
        category: 'Commute & Highways',
        icon: 'navigation',
        items: [
          'NH-65 Mumbai Highway - 2 mins',
          'Outer Ring Road (ORR) - 5 mins',
          'Patancheru Metro Station (Upcoming) - 10 mins',
          'RGIA Airport - 40 mins',
        ],
      },
      {
        id: '4',
        category: 'Premier Education',
        icon: 'graduation-cap',
        items: [
          'Gitam University - Opposite Site',
          'IIT Kandi - On Mumbai Highway',
          'Candidus School - 10 mins',
          'Gadium International School - 15 mins',
          'MERU International School, Tellapur - 20 mins',
          'Samasthi International School - 20 mins',
          'Engineering & Medical Colleges - Nearby',
        ],
      },
      
    ],
    priceRange: { min: 38, max: 95, currency: 'Lakhs' },
    area: { min: 167, max: 400, unit: 'sq.yd' },
    totalUnits: 177,
    projectSize: '13 Acres',
    reraApproved: true,
    hmdaApproved: true,
    reraNumber: 'PRM/KA/RERA/1251/310/PR/200527',
    approvals: ['RERA', 'HMDA', 'Bank Loan Support'],
  },
  {
    id: '3',
    slug: 'premimum-villas',
    name: 'Pride Walls Premium Villas',
    tagline: 'A gated villa address that brings privacy, open space, and everyday comfort together',
    description: `Pride Walls Premium Villas is an upcoming gated villa community envisioned for families seeking more space, stronger privacy, and a refined neighbourhood setting in Rudraram, Hyderabad. The project is designed around low-density living, elegant streetscapes, and lifestyle amenities that support a calm, well-balanced daily experience.

Its location offers connectivity to established highways, education centres, and employment hubs while still preserving the quiet, residential character that villa buyers expect. From arrival experience to internal planning, the development is positioned as a premium upgrade for buyers moving from apartment living to independent homes.

For families who want a home that feels more personal, spacious, and future-focused, Pride Walls Premium Villas presents a compelling opportunity in one of Hyderabad’s expanding growth belts.`,
    location: 'Rudraram, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.68!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'villas',
    status: 'upcoming',
    featured: false,
    coverImage: '/villas.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    ],
    amenities: [
      { id: '1', name: 'Clubhouse Lounge', icon: 'home', description: 'A resident clubhouse for leisure gatherings, celebrations, and indoor recreation.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop' },
      { id: '2', name: 'Swimming Pool', icon: 'waves', description: 'A refreshing pool deck planned for family weekends and relaxed evenings.', image: 'https://images.unsplash.com/photo-1576013551627-0ae7d45f36c3?w=800&h=600&fit=crop' },
      { id: '3', name: "Children's Play Zone", icon: 'baby', description: 'A safe outdoor play area that supports active living within the community.', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop' },
      { id: '4', name: 'Landscaped Greens', icon: 'tree-pine', description: 'Open green pockets and walking areas designed to soften the villa streetscape.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop' },
    ],
    facilities: [
      { id: '1', name: 'Community Security', icon: 'shield', description: 'Controlled entry points and security planning for a more private neighbourhood.' },
      { id: '2', name: 'Internal Roads', icon: 'route', description: 'Well-planned internal roads for easy movement across villa clusters.' },
      { id: '3', name: 'Power & Utility Planning', icon: 'zap', description: 'Core utility infrastructure designed for dependable daily living.' },
      { id: '4', name: 'Water Management', icon: 'droplet', description: 'Water storage and distribution planning to support villa use comfortably.' },
      { id: '5', name: 'Street Lighting', icon: 'lightbulb', description: 'Street-light coverage that improves visibility and safety after dusk.' },
      { id: '6', name: 'Visitor Parking', icon: 'car', description: 'Provision for guest and secondary vehicle parking within the community.' },
    ],
    highlights: [
      { id: '1', title: 'Low-Density Living', description: 'A villa environment planned to feel calmer, more open, and more private than typical apartment clusters.', icon: 'users' },
      { id: '2', title: 'Family-Centred Upgrade', description: 'A strong fit for buyers looking to move into a more spacious, independent home setting.', icon: 'gem' },
      { id: '3', title: 'Western Corridor Connectivity', description: 'Access to key highways, education centres, and growth destinations without giving up residential calm.', icon: 'compass' },
    ],
    specifications: [
      {
        id: '1',
        category: 'Villa Planning',
        items: [
          'Thoughtful front setbacks and private home entries',
          'Spacious living-dining layouts for family use',
          'Multiple bedroom configurations for evolving needs',
          'Planning focused on natural light and ventilation',
        ],
      },
      {
        id: '2',
        category: 'Community Design',
        items: [
          'Landscaped internal streets and common greens',
          'Clubhouse and leisure features within the project',
          'Utility and service planning suited to villa living',
          'A gated environment designed around comfort and privacy',
        ],
      },
    ],
    floorPlans: [
      { id: '1', name: 'Villa Plan A', type: '3 BHK Villa', area: '2100 sq.ft', image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop' },
      { id: '2', name: 'Villa Plan B', type: '4 BHK Villa', area: '3200 sq.ft', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop' },
    ],
    siteLayout: {
      image: '/villas.jpg',
      description: 'The villa master plan is shaped around a welcoming entrance spine, distinct residential clusters, landscaped open spaces, and leisure pockets that help the community feel premium without becoming dense or overwhelming.',
      zones: [
        { name: 'Entrance Court', color: '#7A2430', description: 'Primary arrival zone with gateway treatment, security, and visitor movement.' },
        { name: 'Villa Cluster A', color: '#B9985A', description: 'A collection of homes arranged for privacy, easy circulation, and green edge views.' },
        { name: 'Villa Cluster B', color: '#8B6C45', description: 'A second residential pocket planned around internal roads and calmer family movement.' },
        { name: 'Clubhouse & Greens', color: '#556B5D', description: 'Shared recreation, open spaces, and community leisure facilities at the heart of the project.' },
      ],
    },
    locationHighlights: [
      {
        id: '1',
        category: 'Commute & Access',
        icon: 'navigation',
        items: [
          'NH-65 Mumbai Highway - Nearby',
          'Outer Ring Road access - Short drive',
          'Patancheru and western growth corridor access',
          'Airport connectivity through ORR',
        ],
      },
      {
        id: '2',
        category: 'Education & Everyday Life',
        icon: 'graduation-cap',
        items: [
          'Universities and international schools in the wider corridor',
          'Daily essentials and neighbourhood retail nearby',
          'Healthcare access within the western Hyderabad belt',
          'A growing social infrastructure around Rudraram',
        ],
      },
      {
        id: '3',
        category: 'Employment & Growth',
        icon: 'building',
        items: [
          'Financial District access through the western corridor',
          'Connectivity toward HITEC City and major employment hubs',
          'Strong long-term micro-market growth potential',
          'Appealing for families balancing commute and residential calm',
        ],
      },
    ],
    priceRange: { min: 1.75, max: 3.4, currency: 'Cr' },
    area: { min: 2100, max: 3600, unit: 'sq.ft' },
    totalUnits: 177,
    projectSize: '13 Acres',
    reraApproved: true,
    hmdaApproved: true,
    reraNumber: 'PRM/KA/RERA/1251/310/PR/200527',
    approvals: ['RERA', 'HMDA', 'Bank Loan Support'],
  },
];

export const companyInfo: CompanyInfo = {
  name: 'Pridewalls',
  tagline: 'Building Dreams, Creating Legacies',
  description: `We are committed to creating thoughtfully designed living spaces that blend quality construction, smart planning, and everyday comfort. Our focus is on delivering homes that offer long-term value, transparency, and peace of mind to every homeowner.
  With a strong emphasis on compliance, craftsmanship, and community living, we aim to build not just apartments—but places people are proud to call home.`,
  weare: 'To create exceptional living and working spaces that enhance the quality of life for our customers while ensuring sustainable development and environmental responsibility.',
  community: 'Our developments encourage healthy, connected living through landscaped open spaces, walking tracks, children’s play areas, and thoughtfully planned amenities.',
  design: 'Every project is planned with care—prioritizing natural light, ventilation, open spaces, and efficient layouts to enhance daily living and overall well-being.',
  values: [
    { title: 'Integrity', description: 'We conduct business with honesty, transparency, and ethical practices.', icon: 'shield-check' },
    { title: 'Quality', description: 'We never compromise on the quality of materials, construction, or service.', icon: 'award' },
    { title: 'Innovation', description: 'We embrace new technologies and design concepts to create future-ready spaces.', icon: 'lightbulb' },
    { title: 'Customer First', description: 'Creating spaces where our customers truly belong.', icon: 'heart' },
  ],
  stats: [
    { label: 'Years of Excellence', value: '8', suffix: '+' },
    { label: 'Projects Delivered', value: '45', suffix: '+' },
    { label: 'Happy Customers', value: '5000', suffix: '+' },
    { label: 'Sq.ft Developed', value: '10', suffix: 'M+' },
  ],
  contact: {
    address: 'Plot No: 19/B, 4th Floor, Progressive Towers, Jaihind Enclave, 100 Feet Road, Ayyappa Society, Madhapur, Hyderabad- 500081. ',
    phone: ['+91 70364 45500'],
    email: ['info@pridewalls.com', 'sales@pridewalls.com'],
    officeHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
    whatsapp: '+91 70364 45500',
  },
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/pridewalls', icon: 'facebook' },
    { platform: 'Instagram', url: 'https://instagram.com/pridewalls', icon: 'instagram' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/pridewalls', icon: 'linkedin' },
    { platform: 'YouTube', url: 'https://youtube.com/pridewalls', icon: 'youtube' },
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Hyderabad',
    content: 'We purchased a plot in Heritage Greens and are extremely satisfied with the quality of development. The amenities are top-notch and the location is excellent. The Pridewalls team was very professional and helpful throughout the process.',
    rating: 5,
    projectPurchased: 'Heritage Greens',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Whitefield',
    content: 'Pridewalls exceeded our expectations. From site visits to documentation, everything was handled professionally. Our villa in Serene Heights is absolutely beautiful and worth every penny.',
    rating: 5,
    projectPurchased: 'Serene Heights',
  },
  {
    id: '3',
    name: 'Arun Menon',
    location: 'Electronic City',
    content: 'Invested in a commercial space at Business Hub. The ROI has been fantastic and the property management is excellent. Highly recommend Pridewalls for both residential and commercial investments.',
    rating: 5,
    projectPurchased: 'Business Hub',
  },
];

export const defaultAmenities: Amenity[] = [
  { id: 'pool', name: 'Swimming Pool', icon: 'waves', description: 'Modern swimming pool with separate kids pool' },
  { id: 'clubhouse', name: 'Clubhouse', icon: 'home', description: 'Well-equipped clubhouse for community gatherings' },
  { id: 'gym', name: 'Fitness Center', icon: 'dumbbell', description: 'State-of-the-art gym with modern equipment' },
  { id: 'security', name: '24/7 Security', icon: 'shield', description: 'Round-the-clock security with CCTV surveillance' },
  { id: 'garden', name: 'Landscaped Gardens', icon: 'flower2', description: 'Beautifully landscaped gardens and parks' },
  { id: 'play', name: 'Children Play Area', icon: 'baby', description: 'Safe and fun play zones for children' },
  { id: 'sports', name: 'Sports Courts', icon: 'trophy', description: 'Tennis, badminton, and basketball courts' },
  { id: 'jogging', name: 'Jogging Track', icon: 'footprints', description: 'Tree-lined jogging and walking tracks' },
];

export const investmentHighlights: Highlight[] = [
  { id: '1', title: 'Strategic Locations', description: 'All projects are located in high-growth corridors with excellent connectivity', icon: 'map-pin' },
  { id: '2', title: 'Strong ROI Potential', description: 'Properties in prime locations with proven appreciation history', icon: 'trending-up' },
  { id: '3', title: 'Premium Infrastructure', description: 'World-class amenities and modern infrastructure in all projects', icon: 'building-2' },
  { id: '4', title: 'Transparent Pricing', description: 'Clear pricing with no hidden costs and complete documentation', icon: 'file-check' },
];
