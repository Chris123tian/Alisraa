import { Briefcase, Ship, Plane, Building2, CheckCircle, ThumbsUp, Truck, Package } from 'lucide-react';

export const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const services = [
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Comprehensive ocean freight services for full container loads (FCL) and less-than-container loads (LCL).',
    imageHint: 'cargo ship',
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Expedited air freight for time-sensitive shipments, ensuring your cargo reaches its destination quickly and safely.',
    imageHint: 'cargo plane',
  },
  {
    icon: Briefcase,
    title: 'Customs Brokerage',
    description: 'Navigate the complexities of customs with our expert brokerage services, ensuring compliance and timely clearance.',
    imageHint: 'customs office',
  },
  {
    icon: Building2,
    title: 'Warehousing',
    description: 'Secure, flexible warehousing and distribution services to manage your inventory and streamline your supply chain.',
    imageHint: 'warehouse interior',
  },
  {
    icon: Truck,
    title: 'Land Transport',
    description: 'Reliable domestic and cross-border trucking and rail services for seamless point-to-point delivery.',
    imageHint: 'trucks highway',
  },
  {
    icon: Package,
    title: 'Supply Chain',
    description: 'End-to-end supply chain solutions, from planning and procurement to logistics and delivery.',
    imageHint: 'logistics chart',
  },
];

export const whyChooseUs = [
  {
    icon: ThumbsUp,
    title: 'Expert Team',
    description: 'Our seasoned professionals bring extensive industry knowledge to handle your most complex logistics challenges.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Services',
    description: 'We are committed to operational excellence, delivering reliable, efficient, and high-quality logistics services.',
  },
  {
    icon: Briefcase,
    title: 'Global Network',
    description: 'Leverage our extensive network of global partners to ensure seamless shipping and logistics coverage worldwide.',
  },
];

export const blogPosts = [
  {
    slug: 'the-future-of-logistics',
    title: 'The Future of Logistics: Trends to Watch',
    excerpt: 'Discover the key trends shaping the future of the logistics and supply chain industry...',
    date: '2024-07-20',
    image: '1',
    imageHint: 'futuristic logistics',
  },
  {
    slug: 'choosing-the-right-freight-forwarder',
    title: 'How to Choose the Right Freight Forwarder',
    excerpt: 'A guide to help you select a freight forwarding partner that aligns with your business needs.',
    date: '2024-07-15',
    image: '2',
    imageHint: 'business meeting',
  },
  {
    slug: 'understanding-incoterms',
    title: 'A Simple Guide to Understanding Incoterms',
    excerpt: 'Demystifying international commercial terms to facilitate smoother global trade.',
    date: '2024-07-10',
    image: '3',
    imageHint: 'shipping containers',
  },
];

export const footerLinks = {
  quickLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Our Blog' },
    { href: '/services', label: 'Our Services' },
  ],
  services: services.map(service => ({ href: '/services', label: service.title })),
};
