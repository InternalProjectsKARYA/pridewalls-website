export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  mapEmbedUrl?: string;
  
  // Classification
  type: 'plots' | 'villas' | 'apartments' | 'commercial';
  status: 'ongoing' | 'upcoming' | 'completed';
  featured: boolean;
  
  // Media
  coverImage: string;
  gallery: string[];
  logo?: string;
  
  // Details
  amenities: Amenity[];
  facilities: Facility[];
  highlights: Highlight[];
  specifications: Specification[];
  floorPlans: FloorPlan[];
  siteLayout: SiteLayout;
  locationHighlights: LocationHighlight[];
  
  // Numbers
  priceRange: { min: number; max: number; currency: string };
  area: { min: number; max: number; unit: string };
  totalUnits: number;
  projectSize: string;
  
  // Approvals
  reraApproved: boolean;
  hmdaApproved?: boolean;
  reraNumber?: string;
  approvals: string[];
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface LocationHighlight {
  id: string;
  category?: string;
  time?: string;
  icon?: string;
  items: string[];
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
  image?: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Specification {
  id: string;
  category: string;
  items: string[];
}

export interface FloorPlan {
  id: string;
  name: string;
  type: string;
  area: string;
  image: string;
}

export interface SiteLayout {
  image: string;
  description: string;
  zones: LayoutZone[];
}

export interface LayoutZone {
  name: string;
  color: string;
  description: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  weare: string;
  design: string;
  community: string;
  values: Value[];
  stats: Stat[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface ContactInfo {
  address: string;
  phone: string[];
  email: string[];
  officeHours: string;
  whatsapp?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  projectInterest?: string;
  message: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  avatar?: string;
  projectPurchased?: string;
}

export interface ProjectFilter {
  type: string;
  status: string;
  location: string;
}
