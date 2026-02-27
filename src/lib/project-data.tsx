import { Project, CompanyInfo, Testimonial, Amenity, Highlight, Facility, LocationHighlight } from '@/lib/project-interface';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'pride-walls',
    name: 'Pride Walls',
    tagline: 'Find Your Dream Home With Pridewalls',
    description: `Avantika’s Espino is a premium gated residential community offering thoughtfully designed 2 & 3 BHK apartments in Ameenpur, Hyderabad. Planned in accordance with HMDA norms, the project emphasizes superior construction quality, smart layouts, and ample natural light and ventilation. With elegant architecture and expansive open spaces, Espino delivers a refined lifestyle that balances modern living with everyday comfort.

The project is enriched with a wide range of outdoor and lifestyle amenities, including beautifully landscaped gardens, walking and jogging tracks, children’s play areas, sports courts, an amphitheatre, and an in-campus temple. Safety and convenience are integral to the design, featuring 24-hour security, intercom facility, RFID access, visitor parking, and well-ventilated cellar parking, ensuring a secure and hassle-free living environment.

A key attraction of the community is Club Vivian, a thoughtfully planned four-level clubhouse spanning approximately 39,000 sq. ft. It offers premium facilities such as a modern gym, indoor badminton court, yoga and meditation hall, terrace swimming pool, banquet and multipurpose halls, food court, guest rooms, knowledge centre, supermarket, creche, and a PHC with pharmacy—creating a complete lifestyle ecosystem within the community.

Developed by Pride Walls, Espino comprises six residential blocks (A to F) with a balanced mix of 2BHK and 3BHK homes, efficient floor plans, and excellent connectivity to schools, IT hubs, healthcare facilities, shopping, and entertainment zones. Espino stands as an ideal choice for families seeking a modern, well-connected, and community-centric lifestyle in West Hyderabad.`,
    location: 'Ameenpur, Hyderabad',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.7!3d12.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'apartments',
    status: 'completed',
    featured: false,
    coverImage: '/pride-walls-appartments.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    ],
    amenities: [
      {
        id: '1',
        name: 'Library',
        icon: 'book',
        description: 'Quiet and well-equipped reading and study space',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop'
      },
      {
        id: '2',
        name: 'Temple',
        icon: 'sparkles',
        description: 'Peaceful place for daily prayers and meditation',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop'
      },
      {
        id: '3',
        name: 'Cricket Pitch',
        icon: 'activity',
        description: 'Dedicated cricket practice and play area',
        image: 'https://images.unsplash.com/photo-1593766788306-28561086694e?w=800&h=600&fit=crop'
      },
      {
        id: '4',
        name: 'Creche',
        icon: 'baby',
        description: 'Safe and nurturing daycare facility for children',
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop'
      },
      {
        id: '5',
        name: 'Amphitheatre',
        icon: 'mic',
        description: 'Open-air amphitheatre for events and performances',
        image: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=600&fit=crop'
      },
      {
        id: '6',
        name: 'Banquet Hall',
        icon: 'users',
        description: 'Spacious banquet halls for celebrations and gatherings',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop'
      },
      {
        id: '7',
        name: 'Private Rooms',
        icon: 'door-open',
        description: 'Private rooms for meetings and small events',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
      },
      {
        id: '8',
        name: 'Gym',
        icon: 'dumbbell',
        description: 'Fully equipped fitness and workout center',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'
      },
      {
        id: '9',
        name: 'Children Play Area',
        icon: 'smile',
        description: 'Fun and safe play zone for kids',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=600&fit=crop'
      },
      {
        id: '10',
        name: 'Laundry',
        icon: 'shirt',
        description: 'Common laundry and washing facilities',
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop'
      },
      {
        id: '11',
        name: 'Swimming Pool',
        icon: 'waves',
        description: 'Well-maintained swimming pool for all age groups',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop'
      },
      {
        id: '12',
        name: 'Games Zone',
        icon: 'gamepad-2',
        description: 'Indoor games and recreational activities area',
        image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=600&fit=crop'
      },
      {
        id: '13',
        name: 'Food Court',
        icon: 'utensils',
        description: 'Multiple food options and casual dining space',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop'
      },
      {
        id: '14',
        name: 'Shuttle Court',
        icon: 'activity',
        description: 'Dedicated badminton and shuttle play court',
        image: 'https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?w=800&h=600&fit=crop'
      }
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
      image: '/pride-walls-appartments.jpg',
      description: 'A high-rise tower with efficient floor plates, podium-level amenities, and basement parking. The design maximizes views and natural light for all apartments.',
      zones: [
        { name: 'Tower A', color: '#7C2D12', description: '2 BHK apartments' },
        { name: 'Tower B', color: '#92400E', description: '3 BHK apartments' },
        { name: 'Podium Level', color: '#DC2626', description: 'Amenities and gardens' },
        { name: 'Parking Levels', color: '#6B7280', description: 'Multi-level basement parking' },
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
    slug: 'business-hub',
    name: 'Pride Walls ',
    tagline: 'Premium Commercial Spaces',
    description: `Business Hub is a state-of-the-art commercial development designed for modern enterprises. Located in the bustling Electronic City, this project offers ready-to-move office spaces, retail outlets, and co-working spaces with world-class infrastructure.

The building features high-speed elevators, ample parking, 100% power backup, and advanced fire safety systems. With excellent visibility from the main road and proximity to major tech parks, Business Hub is the ideal address for your growing business.`,
    location: 'Electronic City Phase 2',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.68!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    type: 'commercial',
    status: 'upcoming',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    ],
    amenities: [
      { id: '1', name: 'High-Speed Elevators', icon: 'arrow-up-down', description: 'High-speed passenger and service elevators', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
      { id: '2', name: 'Power Backup', icon: 'zap', description: '100% DG power backup', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' },
      { id: '3', name: 'Conference Rooms', icon: 'presentation', description: 'Fully equipped meeting rooms', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
      { id: '4', name: 'Food Court', icon: 'utensils', description: 'Multi-cuisine food court', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop' },
      { id: '5', name: 'Parking', icon: 'car', description: 'Multi-level parking for 500+ vehicles', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=600&fit=crop' },
      { id: '6', name: 'Security', icon: 'shield', description: '24/7 security with access control', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop' },
    ],
    facilities: [
      { id: '1', name: 'High-Speed Elevators', icon: 'arrow-up-down', description: 'High-speed passenger elevators' },
      { id: '2', name: 'Power Backup', icon: 'zap', description: '100% DG power backup' },
      { id: '3', name: 'Fire Safety', icon: 'flame', description: 'Advanced fire safety systems' },
      { id: '4', name: 'Central AC', icon: 'snowflake', description: 'Central air-conditioning provision' },
      { id: '5', name: 'Parking', icon: 'car', description: 'Multi-level parking' },
      { id: '6', name: 'Security', icon: 'shield', description: '24/7 security with access control' },
    ],
    highlights: [
      { id: '1', title: 'Ready to Move', description: 'Fully completed and operational', icon: 'check-circle' },
      { id: '2', title: 'High Footfall', description: 'Excellent visibility and footfall', icon: 'users' },
      { id: '3', title: 'Flexible Spaces', description: 'Customizable office and retail spaces', icon: 'layout' },
    ],
    specifications: [
      {
        id: '1',
        category: 'Building',
        items: [
          'G+10 floors',
          'Glass facade with ACP cladding',
          'Central air-conditioning provision',
          'High-speed internet connectivity',
        ],
      },
    ],
    floorPlans: [
      { id: '1', name: 'Office Space', type: 'Office', area: '500-5000 sq.ft', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
      { id: '2', name: 'Retail Unit', type: 'Retail', area: '300-2000 sq.ft', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' },
    ],
    siteLayout: {
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1200&fit=crop',
      description: 'A modern commercial complex with efficient floor plates, double-height entrance lobby, and strategically placed retail spaces for maximum visibility.',
      zones: [
        { name: 'Ground Floor', color: '#DC2626', description: 'Retail stores and food court' },
        { name: 'Floors 1-5', color: '#7C2D12', description: 'Office spaces' },
        { name: 'Floors 6-10', color: '#92400E', description: 'Premium office spaces with terrace' },
        { name: 'Parking', color: '#6B7280', description: 'Multi-level parking structure' },
      ],
    },
    locationHighlights: [
      {
        id: '1',
        category: 'IT Parks Nearby',
        icon: 'building',
        items: [
          'Infosys Campus - 5 mins',
          'Wipro Campus - 5 mins',
          'Tech Mahindra - 10 mins',
          'HP Campus - 10 mins',
        ],
      },
      {
        id: '2',
        category: 'Connectivity',
        icon: 'navigation',
        items: [
          'Nice Road - 10 mins',
          'Hosur Road - 5 mins',
          'Hyderabad City - 45 mins',
          'Airport - 60 mins',
        ],
      },
    ],
    priceRange: { min: 60, max: 1.5, currency: 'Lakhs' },
    area: { min: 500, max: 5000, unit: 'sq.ft' },
    totalUnits: 120,
    projectSize: '2 Acres',
    reraApproved: true,
    reraNumber: 'PRM/KA/RERA/1251/310/PR/200527',
    approvals: ['RERA', 'BBMP', 'All Major Banks'],
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
    phone: ['+91 91771 80333'],
    email: ['info@pridewalls.com', 'sales@pridewalls.com'],
    officeHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
    whatsapp: '+91 91771 80333',
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
