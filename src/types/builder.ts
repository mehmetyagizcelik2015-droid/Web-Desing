export type BlockType =
  | 'header'
  | 'hero'
  | 'features'
  | 'about'
  | 'services'
  | 'pricing'
  | 'testimonials'
  | 'gallery'
  | 'cta'
  | 'faq'
  | 'contact'
  | 'footer'
  | 'custom';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  paddingY?: 'compact' | 'normal' | 'relaxed';
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  borderBottom?: boolean;
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  tag?: string;
  price?: string;
  period?: string;
  features?: string[];
  author?: string;
  role?: string;
  avatar?: string;
  linkText?: string;
  linkUrl?: string;
  highlighted?: boolean;
}

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface BlockData {
  id: string;
  type: BlockType;
  title: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  primaryBtn?: {
    text: string;
    url: string;
    variant?: 'solid' | 'outline' | 'ghost';
  };
  secondaryBtn?: {
    text: string;
    url: string;
  };
  image?: string;
  cards?: CardItem[];
  navLinks?: NavLinkItem[];
  brandName?: string;
  styles: BlockStyle;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  blocks: BlockData[];
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  primaryColor: string;
  fontFamily: string;
  language: string;
}

export interface Project {
  id: string;
  title: string;
  pages: Page[];
  activePageId: string;
  settings: SiteSettings;
  updatedAt: string;
}
