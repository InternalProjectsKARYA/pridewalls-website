import { Project, CompanyInfo, Testimonial, Amenity, Highlight, Facility, LocationHighlight } from '@/lib/project-interface';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'Completed-Apartment',
    name: 'PRIDEWALLS ESPINO',
    tagline: 'Find Your Dream Home With PRIDEWALLS',
    description: `PRIDEWALLS Espino is a premium gated residential community offering thoughtfully designed 2 & 3 BHK apartments in Ameenpur, Hyderabad. Planned in accordance with HMDA norms, the project emphasizes superior construction quality, smart layouts, and ample natural light and ventilation. With elegant architecture and expansive open spaces, Espino delivers a refined lifestyle that balances modern living with everyday comfort.

The project is enriched with a wide range of outdoor and lifestyle amenities, including beautifully landscaped gardens, walking and jogging tracks, children’s play areas, sports courts, an amphitheatre, and an in-campus temple. Safety and convenience are integral to the design, featuring 24-hour security, intercom facility, RFID access, visitor parking, and well-ventilated cellar parking, ensuring a secure and hassle-free living environment.

A key attraction of the community is Club Vivian, a thoughtfully planned four-level clubhouse spanning approximately 39,000 sq. ft. It offers premium facilities such as a modern gym, indoor badminton court, yoga and meditation hall, terrace swimming pool, banquet and multipurpose halls, food court, guest rooms, knowledge centre, supermarket, creche, and a PHC with pharmacy—creating a complete lifestyle ecosystem within the community.

Developed by PRIDEWALLS, Espino comprises six residential blocks (A to F) with a balanced mix of 2BHK and 3BHK homes, efficient floor plans, and excellent connectivity to schools, IT hubs, healthcare facilities, shopping, and entertainment zones. Espino stands as an ideal choice for families seeking a modern, well-connected, and community-centric lifestyle in West Hyderabad.`,
    location: 'Ameenpur, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1206.8958158794214!2d78.31674295666015!3d17.51407797395735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d00024530ed%3A0x265564fe9ac9ae3d!2sThe%20Espino%20C%20Block!5e1!3m2!1sen!2sin!4v1782734446585!5m2!1sen!2sin',
    type: 'apartments',
    status: 'completed',
    featured: false,
    coverImage: '/pride-walls-appartments.png',
    gallery: [
      '/clubhouse.png',
      '/blocks/block-a.jpg',
      '/Amenities/Swimming Pool.jpg',
      '/Amenities/Indoor Sports.jpg',
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
      { id: '1', name: '2 BHK', type: '2 BHK', area: '1250 sq.ft', image: '/master_plan.jpg' },
      { id: '2', name: '3 BHK', type: '3 BHK', area: '1650 sq.ft', image: '/master_plan.jpg' },
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
    slug: 'siri-eco-space',
    name: 'SIRI ECO SPACE',
    tagline: 'Premium Gated Plots in Hyderabad',
    description: `SIRI ECO SPACE is a premium open-plot development by PRIDEWALLS in Rudraram, Hyderabad. Located in the city's fast-growing western growth corridor, this HMDA-approved project offers residential plots with clear titles, wide internal roads, and excellent connectivity to major IT hubs and everyday amenities.

Designed for both end-users and investors, SIRI ECO SPACE combines strategic master planning with transparent documentation and straightforward booking. The project emphasizes sustainable development with rainwater harvesting, underground utilities, and landscaped common areas. Every plot is backed by complete legal compliance and flexible payment options, making it an ideal investment for long-term value appreciation.`,
    location: 'Rudraram, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.68!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'plots',
    status: 'upcoming',
    featured: false,
    coverImage: '/plots-hero-21x9-v2.png',
    gallery: [
      '/plots-hero-21x9-v2.png',
      '/master-plan.png',
      '/amenities-generated/plot-entrance.jpg',
      '/amenities-generated/plot-landscape.jpg',
    ],
    amenities: [
      { id: '1', name: 'Community Garden', icon: 'leaf', description: 'Landscaped gardens with recreational areas', image: '/amenities-generated/community-garden.jpg' },
      { id: '2', name: 'Walking Tracks', icon: 'footprints', description: 'Tree-lined walking and jogging paths', image: '/amenities-generated/walking-tracks.jpg' },
      { id: '3', name: 'Parks & Open Spaces', icon: 'tree-pine', description: 'Green spaces for community gathering', image: '/amenities-generated/parks-open-spaces.jpg' },
      { id: '4', name: 'Play Areas', icon: 'baby', description: 'Children play zones with safety features', image: '/Amenities/Children Area.jpg' },
      { id: '5', name: 'Community Hall', icon: 'home', description: 'Multi-purpose community gathering space', image: '/amenities-generated/community-hall.jpg' },
      { id: '6', name: 'Security Gate', icon: 'shield', description: '24/7 security with access control', image: '/amenities-generated/security-gate.jpg' },
    ],
    facilities: [
      { id: '1', name: 'Grand Entrance & Gate', icon: 'landmark', description: 'Secure and elegant community entrance' },
      { id: '2', name: 'Compound Wall', icon: 'fence', description: 'Complete boundary safety and privacy' },
      { id: '3', name: 'Underground Water Supply', icon: 'droplet', description: 'Reliable concealed water distribution' },
      { id: '4', name: 'Underground Electricity', icon: 'zap', description: 'Safe underground power infrastructure' },
      { id: '5', name: 'Internal Concrete Roads', icon: 'route', description: 'Wide and durable internal roads (40ft)' },
      { id: '6', name: 'Rainwater Harvesting', icon: 'cloud-rain', description: 'Eco-friendly water management system' },
      { id: '7', name: 'Sewage & STP', icon: 'database', description: 'Modern sewage treatment facility' },
      { id: '8', name: 'Avenue Plantation', icon: 'tree-pine', description: 'Green landscaped roadside plantation' },
    ],
    highlights: [
      { id: '1', title: 'HMDA Approved', description: 'Fully compliant with HMDA regulations', icon: 'file-check' },
      { id: '2', title: 'Clear Titles', description: 'Transparent ownership with complete documentation', icon: 'check-circle' },
      { id: '3', title: 'Strategic Location', description: 'Close to IT parks, schools, and highways', icon: 'map-pin' },
      { id: '4', title: 'Investment Ready', description: 'High growth potential with proven ROI', icon: 'trending-up' },
    ],
    specifications: [
      {
        id: '1',
        category: 'Plot Features',
        items: [
          'Individual plot sizes: 180-360 sq.yds',
          'Corner and interior plots available',
          '40 ft wide internal roads',
          'East-West facing plots',
          'Plot dimensions: 20x36, 25x36, 30x36 ft',
        ],
      },
      {
        id: '2',
        category: 'Infrastructure & Utilities',
        items: [
          'Underground water supply with individual meters',
          'Underground electricity connection ready',
          'Dedicated sewage and stormwater drains',
          'Rainwater harvesting system',
          'Street lighting throughout the layout',
        ],
      },
      {
        id: '3',
        category: 'Legal & Compliance',
        items: [
          'HMDA approved layout plan',
          'Clear property titles with encumbrance certificate',
          'Registered with Revenue Department',
          '7/12 extract ready for transfer',
          'Bank loan friendly documentation',
        ],
      },
    ],
    // floorPlans: [
    //   { id: '1', name: 'Office Space', type: 'Office', area: '500-5000 sq.ft', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
    //   { id: '2', name: 'Retail Unit', type: 'Retail', area: '300-2000 sq.ft', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' },
    // ],
    siteLayout: {
      image: '/plots-master-plan1.jpg',
      description: 'SIRI ECO SPACE Master Plan: Strategically designed layout with 169 premium plots, wide internal road network, designated open spaces, and community amenities spread across 13 acres.',
      zones: [
        { id: '1', name: 'Residential Zone A', color: '#059669', description: '45 plots (180-240 sq.yds) with open spaces' },
        { id: '2', name: 'Residential Zone B', color: '#10B981', description: '62 plots (240-300 sq.yds) with garden access' },
        { id: '3', name: 'Residential Zone C', color: '#34D399', description: '35 plots (300-360 sq.yds) premium corner plots' },
        { id: '4', name: 'Community Area', color: '#6EE7B7', description: 'Parks, playgrounds, community hall & gardens' },
        { id: '5', name: 'Road Network', color: '#7C2D12', description: 'Wide 40ft roads with street lighting' },
        { id: '6', name: 'Entrance & Security', color: '#6B7280', description: 'Gated entrance with 24/7 security' },
      ],
    },
    locationHighlights: [
      {
        id: '1',
        time: '5 Mins',
        items: [
          'Gitam University - Right beside project',
          'Rudraram Main Road',
          'Local convenience stores',
          'Street food & dining',
        ],
      },
      {
        id: '2',
        time: '10 Mins',
        items: [
          'IIT Kandi (On Mumbai Highway)',
          'Patancheru Ring Road Junction',
          'Schools & educational centers',
          'Medical clinics & pharmacies',
        ],
      },
      {
        id: '3',
        time: '15-20 Mins',
        items: [
          'Neopolis Ultra Premium SEZ',
          'Jeedimetla Industrial Area',
          'Supermarkets & shopping centers',
          'Multi-specialty hospitals',
        ],
      },
      {
        id: '4',
        time: '20-30 Mins',
        items: [
          'HITEC City IT Hub (30 mins)',
          'Financial District (35 mins)',
          'NH-65 Mumbai Highway (2 mins)',
          'Outer Ring Road (5 mins)',
        ],
      },
    ],
    priceRange: { min: 20, max: 45, currency: 'Lakhs' },
    area: { min: 180, max: 360, unit: 'sq.yds' },
    totalUnits: 169,
    projectSize: '13 Acres',
    hmdaApproved: true,
    reraNumber: 'PRM/KA/RERA/1251/310/PR/200527',
    approvals: ['RERA', 'HMDA', 'All Major Banks', 'Revenue Department'],
  },
  {
    id: '3',
    slug: 'pridewalls-villas',
    name: 'PRIDEWALLS VILLAS',
    tagline: 'Luxury Gated Villas with Premium Amenities',
    description: `PRIDEWALLS VILLAS is a premium gated villa community in Rudraram, Hyderabad, designed for families seeking space, privacy, and modern luxury. Each villa combines thoughtful architecture with superior construction quality, private gardens, and exclusive outdoor spaces.

Situated in a rapidly developing corridor with easy access to IT parks, schools, and shopping centers, PRIDEWALLS VILLAS offers the perfect balance between serene living and urban connectivity. The community features premium amenities including a clubhouse, swimming pool, landscaped gardens, and comprehensive security infrastructure.

With flexible payment plans and transparent documentation, PRIDEWALLS VILLAS is an ideal choice for homeowners and investors seeking long-term appreciation in one of Hyderabad's most sought-after locations.`,
    location: 'Rudraram, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.68!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'villas',
    status: 'upcoming',
    featured: false,
    coverImage: '/villas-hero-21x9.png',
    gallery: [
      '/villas-hero-21x9.png',
      '/pride-walls-hero.png',
      '/amenities-generated/villa-entrance.jpg',
      '/amenities-generated/villa-pool.jpg',
    ],
    amenities: [
      { id: '1', name: 'Swimming Pool', icon: 'waves', description: 'Olympic-size swimming pool with deck seating', image: '/Amenities/Swimming Pool.jpg' },
      { id: '2', name: 'Clubhouse', icon: 'home', description: 'Premium clubhouse with multipurpose halls', image: '/clubhouse.png' },
      { id: '3', name: 'Gymnasium', icon: 'dumbbell', description: 'State-of-the-art fitness center with modern equipment', image: '/amenities-generated/gymnasium.jpg' },
      { id: '4', name: 'Yoga & Meditation', icon: 'flower2', description: 'Dedicated yoga and meditation hall', image: '/amenities-generated/yoga-meditation.jpg' },
      { id: '5', name: 'Children Play Area', icon: 'baby', description: 'Safe recreational play zones for kids', image: '/Amenities/Children Area.jpg' },
      { id: '6', name: 'Landscaped Gardens', icon: 'leaf', description: 'Beautifully landscaped common gardens', image: '/amenities-generated/landscaped-gardens.jpg' },
      { id: '7', name: 'Jogging Track', icon: 'footprints', description: 'Tree-lined jogging and walking tracks', image: '/amenities-generated/jogging-track.jpg' },
      { id: '8', name: 'Security Gate', icon: 'shield', description: '24/7 gated security with CCTV surveillance', image: '/amenities-generated/security-gate.jpg' },
    ],
    facilities: [
      { id: '1', name: 'Gated Community', icon: 'shield', description: 'Secure gated community with controlled access' },
      { id: '2', name: 'Power Backup', icon: 'zap', description: '100% DG power backup for all villas' },
      { id: '3', name: 'Water Supply', icon: 'droplet', description: 'Constant water supply with underground tanks' },
      { id: '4', name: 'Wide Roads', icon: 'route', description: '36ft wide internal roads with street lighting' },
      { id: '5', name: 'Parking', icon: 'car', description: 'Individual villa parking + guest parking' },
      { id: '6', name: 'Rainwater Harvesting', icon: 'cloud-rain', description: 'Eco-friendly water management system' },
      { id: '7', name: 'Sewage Treatment', icon: 'database', description: 'Modern STPs for environmental sustainability' },
      { id: '8', name: 'Community Hall', icon: 'home', description: 'Multi-purpose community gathering space' },
    ],
    highlights: [
      { id: '1', title: 'Private Land', description: 'Individual villa plots with personal gardens', icon: 'leaf' },
      { id: '2', title: 'Luxury Living', description: 'Premium architecture and high-end finishes', icon: 'gem' },
      { id: '3', title: 'Community Amenities', description: 'World-class facilities for entire family', icon: 'users' },
      { id: '4', title: 'Investment Potential', description: 'Strong appreciation in premium location', icon: 'trending-up' },
    ],
    specifications: [
      {
        id: '1',
        category: 'Villa Configuration',
        items: [
          '3 BHK & 4 BHK premium villas',
          'Built-up area: 2200-3500 sq.ft',
          'Individual plot sizes: 4000-6000 sq.ft',
          'Double height living rooms with city views',
          'Private gardens and landscaping',
          'Attached modern kitchen with premium fittings',
        ],
      },
      {
        id: '2',
        category: 'Interiors & Features',
        items: [
          'Modular kitchens with branded appliances',
          'Premium vitrified and wooden flooring',
          'Spacious master bedroom with attached study',
          'Multiple balconies with open views',
          'Designer bathrooms with premium fixtures',
          'Central air-conditioning provision',
        ],
      },
      {
        id: '3',
        category: 'Structural & Safety',
        items: [
          'RCC framed construction with earthquake-resistant design',
          'Advanced fire safety systems with sprinklers',
          'High-speed passenger elevators in 2-story villas',
          'Dedicated car parking with charging provision',
          'Intercom facility in all units',
          'CCTV surveillance throughout community',
        ],
      },
    ],
    floorPlans: [
      { id: '1', name: '3 BHK Villa', type: '3 BHK', area: '2200 sq.ft', image: '/master_plan.jpg' },
      { id: '2', name: '4 BHK Villa', type: '4 BHK', area: '3500 sq.ft', image: '/master_plan.jpg' },
      { id: '3', name: '4 BHK Premium', type: '4 BHK +Study', area: '3800 sq.ft', image: '/master_plan.jpg' },
    ],
    siteLayout: {
      image: '/master_plan.jpg',
      description: 'PRIDEWALLS VILLAS Master Plan: Premium villa community with 150 thoughtfully designed villas, wide roads, dedicated amenity zones, lush landscaping, and secured gated access spread across 10 acres.',
      zones: [
        { id: '1', name: 'Villa Zone A', color: '#7c3aed', description: '50 premium villas with individual gardens and views' },
        { id: '2', name: 'Villa Zone B', color: '#a78bfa', description: '60 luxurious villas with enhanced privacy' },
        { id: '3', name: 'Villa Zone C', color: '#c4b5fd', description: '40 exclusive corner villas with larger plots' },
        { id: '4', name: 'Community Center', color: '#ddd6fe', description: 'Clubhouse, pool, gym, and recreational facilities' },
        { id: '5', name: 'Green Spaces', color: '#e9d5ff', description: 'Parks, jogging tracks, and landscaped gardens' },
        { id: '6', name: 'Security & Entrance', color: '#6B7280', description: 'Gated entrance with 24/7 security office' },
      ],
    },
    locationHighlights: [
      {
        id: '1',
        time: '5 Mins',
        items: [
          'Gitam University - Adjacent',
          'Local markets & convenience stores',
          'Restaurants & cafes',
          'ATMs & banking facilities',
        ],
      },
      {
        id: '2',
        time: '10 Mins',
        items: [
          'IIT Kandi on Mumbai Highway',
          'Schools (Candius, Gadium International)',
          'Medical clinics & diagnostic centers',
          'Shopping centers & supermarkets',
        ],
      },
      {
        id: '3',
        time: '15-20 Mins',
        items: [
          'Neopolis Ultra Premium SEZ',
          'Jeedimetla Industrial Area',
          'Patancheru Business District',
          'Multi-specialty hospitals',
          'Shopping malls',
        ],
      },
      {
        id: '4',
        time: '30+ Mins',
        items: [
          'HITEC City IT Hub (30 mins)',
          'Financial District (35 mins)',
          'Rajiv Gandhi International Airport (40 mins)',
          'NH-65 Mumbai Highway (2 mins)',
          'Outer Ring Road (5 mins)',
        ],
      },
    ],
    priceRange: { min: 65, max: 1.2, currency: 'Cr' },
    area: { min: 2200, max: 3800, unit: 'sq.ft' },
    totalUnits: 150,
    projectSize: '10 Acres',
    hmdaApproved: true,
    reraApproved: true,
    reraNumber: 'PRM/KA/RERA/1251/310/PR/200729',
    approvals: ['RERA', 'HMDA', 'All Major Banks', 'Revenue Department'],
  },
];

export const companyInfo: CompanyInfo = {
  name: 'PRIDEWALLS',
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
    content: 'We purchased a plot in Heritage Greens and are extremely satisfied with the quality of development. The amenities are top-notch and the location is excellent. The PRIDEWALLS team was very professional and helpful throughout the process.',
    rating: 5,
    projectPurchased: 'Heritage Greens',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Whitefield',
    content: 'PRIDEWALLS exceeded our expectations. From site visits to documentation, everything was handled professionally. Our villa in Serene Heights is absolutely beautiful and worth every penny.',
    rating: 5,
    projectPurchased: 'Serene Heights',
  },
  {
    id: '3',
    name: 'Arun Menon',
    location: 'Electronic City',
    content: 'Invested in a commercial space at Business Hub. The ROI has been fantastic and the property management is excellent. Highly recommend PRIDEWALLS for both residential and commercial investments.',
    rating: 5,
    projectPurchased: 'Business Hub',
  },
];

export const defaultAmenities: Amenity[] = [
  { id: 'pool', name: 'Swimming Pool', icon: 'waves', description: 'Modern swimming pool with separate kids pool', image: '/Amenities/Swimming Pool.jpg' },
  { id: 'clubhouse', name: 'Clubhouse', icon: 'home', description: 'Well-equipped clubhouse for community gatherings', image: '/clubhouse.png' },
  { id: 'gym', name: 'Fitness Center', icon: 'dumbbell', description: 'State-of-the-art gym with modern equipment', image: '/amenities-generated/gymnasium.jpg' },
  { id: 'security', name: '24/7 Security', icon: 'shield', description: 'Round-the-clock security with CCTV surveillance', image: '/amenities-generated/security-gate.jpg' },
  { id: 'garden', name: 'Landscaped Gardens', icon: 'flower2', description: 'Beautifully landscaped gardens and parks', image: '/amenities-generated/landscaped-gardens.jpg' },
  { id: 'play', name: 'Children Play Area', icon: 'baby', description: 'Safe and fun play zones for children', image: '/Amenities/Children Area.jpg' },
  { id: 'sports', name: 'Sports Courts', icon: 'trophy', description: 'Tennis, badminton, and basketball courts', image: '/Amenities/Shuttle Court.jpg' },
  { id: 'jogging', name: 'Jogging Track', icon: 'footprints', description: 'Tree-lined jogging and walking tracks', image: '/amenities-generated/jogging-track.jpg' },
];

export const investmentHighlights: Highlight[] = [
  { id: '1', title: 'Strategic Locations', description: 'All projects are located in high-growth corridors with excellent connectivity', icon: 'map-pin' },
  { id: '2', title: 'Strong ROI Potential', description: 'Properties in prime locations with proven appreciation history', icon: 'trending-up' },
  { id: '3', title: 'Premium Infrastructure', description: 'World-class amenities and modern infrastructure in all projects', icon: 'building-2' },
  { id: '4', title: 'Transparent Pricing', description: 'Clear pricing with no hidden costs and complete documentation', icon: 'file-check' },
];
