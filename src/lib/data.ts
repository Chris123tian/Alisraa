import { Ship, Plane, Briefcase, Building2, Truck, Package } from 'lucide-react';

export const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/tracking', label: 'Tracking' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export const services = [
  {
    icon: Ship,
    title: 'Ocean Transportation',
    description: 'Reliable and cost-effective ocean freight services for global shipping.',
  },
  {
    icon: Plane,
    title: 'Air Transportation',
    description: 'Fast and secure air freight for time-sensitive cargo deliveries worldwide.',
  },
  {
    icon: Truck,
    title: 'Side Truck Transportation',
    description: 'Flexible road and rail transport for domestic and cross-border logistics.',
  },
  {
    icon: Package,
    title: 'Supply Chain Management',
    description: 'Optimizing your logistics from end-to-end for maximum efficiency.',
  },
  {
    icon: Briefcase,
    title: 'Customs and Compliance',
    description: 'Expert guidance through international customs and compliance procedures.',
  },
  {
    icon: Building2,
    title: 'Shipping Documentation',
    description: 'Managing all necessary shipping documents for a smooth transit process.',
  },
];


export const shippingRates = [
  {
    destination: 'United States',
    ocean: [
      { duration: '6-8 weeks', cost: '$3680' },
      { duration: '3-6 weeks', cost: '$4700' },
    ],
    air: [
      { duration: '2 weeks', cost: '$6400' },
      { duration: '1 week', cost: '$6700' },
      { duration: '2 days', cost: '$8150' },
    ],
  },
  {
    destination: 'United Kingdom',
    ocean: [
      { duration: '6-8 weeks', cost: '£3080' },
      { duration: '3-6 weeks', cost: '£4980' },
    ],
    air: [
      { duration: '2 weeks', cost: '£6073' },
      { duration: '1 week', cost: '£6108' },
      { duration: '2 days', cost: '£6650' },
    ],
  },
  {
    destination: 'Germany',
    ocean: [
      { duration: '6-8 weeks', cost: '€3480' },
      { duration: '3-6 weeks', cost: '€4400' },
    ],
    air: [
      { duration: '2 weeks', cost: '€6300' },
      { duration: '1 week', cost: '€6600' },
      { duration: '2 days', cost: '€7150' },
    ],
  },
  {
    destination: 'Africa',
    ocean: [
      { duration: '6-8 weeks', cost: '$2780' },
      { duration: '3-6 weeks', cost: '$3500' },
    ],
    air: [
      { duration: '2 weeks', cost: '$5400' },
      { duration: '1 week', cost: '$5700' },
      { duration: '2 days', cost: '$7150' },
    ],
  },
];

export const aboutContent = [
    {
        title: 'Side Truck transportation and freight',
        description: 'Everything you need to know about transporting goods via ocean, road, rail, and air.',
        learnMore: true,
    },
    {
        title: 'Supply chain management',
        description: 'Learn all about the supply chain journey and tips for optimising your logistics.',
        learnMore: true,
    },
    {
        title: 'Shipping documentation',
        description: 'Get to know the important documents you’ll come across when shipping cargo internationally.',
        learnMore: true,
    },
    {
        title: 'Customs and compliance',
        description: 'Discover the Incoterms®️ rules and learn all about navigating through customs clearance.',
        learnMore: false,
    }
]

export const vesselSchedule = ['One Month', 'Two Months', 'Three Months', 'Four Months'];


export const footerLinks = {
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/tracking', label: 'Tracking' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
};

export const policyLinks = [
    { href: '/policy/terms-and-conditions', label: 'Terms & conditions'},
    { href: '/policy/data-privacy-notification', label: 'Data Privacy Notification'},
    { href: '/policy/brand-protection', label: 'Brand protection'},
    { href: '/policy/cookie-policy', label: 'Cookie policy'},
    { href: '/policy/unsolicited-submissions-policy', label: 'Unsolicited Submissions Policy'},
]
