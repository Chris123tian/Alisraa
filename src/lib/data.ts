import { Ship, Plane, Briefcase, Building2, Truck, Package, Globe, Clock, Headset } from 'lucide-react';

export const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export const services = [
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'We offer a full array of ocean freight services including FCL, LCL, and customs clearance.',
    image: 'service-ocean'
  },
  {
    icon: Truck,
    title: 'Land Transport',
    description: 'Seamless and reliable land transport solutions to ensure your goods reach their destination on time.',
    image: 'service-land'
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast and efficient air freight services for your most time-sensitive and valuable shipments.',
    image: 'service-air'
  },
  {
    icon: Briefcase,
    title: 'Customs Brokerage',
    description: 'Our expert team handles all customs documentation and procedures to ensure smooth clearance.',
    image: 'service-customs'
  },
  {
    icon: Building2,
    title: 'Warehousing',
    description: 'Secure and flexible warehousing options to meet your storage and distribution needs.',
    image: 'service-warehousing'
  },
  {
    icon: Package,
    title: 'Supply Chain Solutions',
    description: 'End-to-end supply chain management to optimize your logistics and improve efficiency.',
    image: 'service-supply-chain'
  },
];

export const whyChooseUs = [
  {
    icon: Globe,
    title: 'Global Service',
    description: 'Our extensive network of partners ensures that we can provide logistics solutions worldwide.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We are committed to delivering your shipments on schedule, every time.',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you with any inquiries.',
  },
];

export const blogPosts = [];

export const footerLinks = {
  quickLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/services', label: 'Our Services' },
  ],
  services: services.map(service => ({ href: '/services', label: service.title })),
};
