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
    description: 'Reliable and cost-effective sea shipping solutions for your global trade needs.',
    imageHint: 'cargo ship',
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast and secure air cargo services to deliver your goods anywhere in the world.',
    imageHint: 'cargo plane',
  },
  {
    icon: Briefcase,
    title: 'Customs Brokerage',
    description: 'Hassle-free customs clearance with our expert brokerage services.',
    imageHint: 'customs office',
  },
  {
    icon: Building2,
    title: 'Warehousing',
    description: 'Secure and flexible warehousing options to manage your inventory.',
    imageHint: 'warehouse interior',
  },
  {
    icon: Truck,
    title: 'Land Transport',
    description: 'Comprehensive road and rail transport solutions for domestic and cross-border delivery.',
    imageHint: 'trucks highway',
  },
  {
    icon: Package,
    title: 'Supply Chain',
    description: 'End-to-end supply chain management to optimize your logistics operations.',
    imageHint: 'logistics chart',
  },
];

export const whyChooseUs = [
  {
    icon: ThumbsUp,
    title: 'Expert Team',
    description: 'Our team of professionals has years of experience in the logistics industry.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Services',
    description: 'We are committed to providing high-quality services that meet your needs.',
  },
  {
    icon: Briefcase,
    title: 'Global Network',
    description: 'With a vast network of partners, we offer logistics solutions worldwide.',
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
