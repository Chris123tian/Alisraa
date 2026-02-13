export type Language = 'en' | 'de' | 'nl';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      tracking: 'Tracking',
      about: 'About Us',
      contact: 'Contact Us',
      login: 'Login',
      signup: 'Sign Up',
      admin: 'Admin',
      dashboard: 'Dashboard',
      signOut: 'Sign Out'
    },
    hero: {
      tag: 'Global Freight Excellence',
      title: 'Reliable Logistics for a',
      titleAccent: 'Connected World.',
      subtitle: 'Al-Israa delivers precision international freight solutions. From ocean ports to your doorstep, we manage the complex so you can focus on growth.',
      trackBtn: 'Track Your Cargo',
      solutionsBtn: 'Our Solutions'
    },
    home: {
      expertise: 'Our Expertise',
      solutionsTitle: 'Global Logistics Solutions',
      exploreBtn: 'Explore All Services',
      advantage: 'The Al-Israa Advantage',
      trustTitle: 'Why Industry Leaders Trust Us.',
      trustDesc: 'With decades of experience and a global network, we provide more than just transport. we provide peace of mind through every mile of the journey.',
      globalNetwork: 'Global Network',
      globalNetworkDesc: 'Access to 150+ ports worldwide.',
      fastDelivery: 'Fast Delivery',
      fastDeliveryDesc: 'Optimized routes for quick transit.',
      secureCargo: 'Secure Cargo',
      secureCargoDesc: 'Premium insurance and handling.',
      fullCompliance: 'Full Compliance',
      fullComplianceDesc: 'Hassle-free customs brokerage.',
      quoteTitle: 'Ready to ship?',
      quoteSubtitle: 'Request a consultation today.',
      requestQuote: 'Contact Us',
      trackPackage: 'Track Package',
      missionTitle: 'Our Mission',
      missionDesc: 'To provide seamless, efficient, and transparent logistics solutions that bridge the gap between continents, empowering businesses to thrive in a global economy.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the world\'s most reliable logistics partner, recognized for our technological innovation, sustainable practices, and unwavering commitment to client success.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { q: 'How do I track my shipment?', a: 'You can use our global tracking page with your AL- tracking ID for real-time updates.' },
        { q: 'What services do you offer?', a: 'We specialize in ocean freight, air cargo, road transport, and end-to-end supply chain management.' },
        { q: 'Which regions do you cover?', a: 'We have a robust network covering Syria, Germany, Africa, the USA, and over 150 ports worldwide.' },
        { q: 'Are my goods insured?', a: 'Yes, we offer premium cargo insurance options to ensure your goods are protected throughout their journey.' }
      ],
      servicesList: [
        {
          title: 'Ocean Transportation',
          description: 'Reliable and cost-effective ocean freight services for global shipping.'
        },
        {
          title: 'Air Transportation',
          description: 'Fast and secure air freight for time-sensitive cargo deliveries worldwide.'
        },
        {
          title: 'Side Truck Transportation',
          description: 'Flexible road and rail transport for domestic and cross-border logistics.'
        }
      ]
    },
    tracking: {
      title: 'Global Tracking',
      trackJourney: 'Track Your Journey',
      enterId: 'Enter your unique tracking ID for live cargo updates.',
      placeholder: 'e.g. AL-X92B10J...',
      syncing: 'Syncing...',
      trackBtn: 'Track',
      currentStatus: 'Current Status',
      estimatedArrival: 'Estimated Arrival',
      calculating: 'Calculating...',
      origin: 'Origin',
      destination: 'Destination',
      noDetails: 'No tracking details yet. Enter a valid ID to see live logistics data.',
      regionalHubs: 'Regional Express Hubs',
      steps: {
        confirmed: 'Booking Confirmed',
        transit: 'In Transit',
        customs: 'Customs Clearance',
        delivery: 'Out for Delivery'
      }
    },
    services: {
      title: 'Our Services',
      shippingCosts: 'Transit Times',
      transparentPricing: 'Global Routes',
      pricingDesc: 'Find detailed transit information for various destinations below. We offer both ocean and air transportation to suit your timeline.',
      goodsTo: 'Routes to',
      ocean: 'Ocean Transportation',
      air: 'Air Transportation',
      duration: 'Duration',
      cost: 'Details'
    },
    about: {
      title: 'About Us',
      explained: 'Logistics Explained',
      guideTitle: 'Your Guide to Global Shipping',
      guideDesc: 'Whether you’re new to logistics or a seasoned player, we’re here to explain the answers to your logistics questions, so you can ship with confidence.',
      vesselSchedule: 'Vessel Schedule',
      supplyChain: 'Supply Chain and Logistics',
      planShipments: 'Plan your shipments with our vessel schedule.',
      learnMore: 'Learn More'
    },
    contact: {
      title: 'Contact Us',
      getInTouch: 'Get in Touch',
      contactDesc: 'We are here to help you with all your logistics needs. For immediate assistance, use the chat feature.',
      office: 'Our Office',
      emailUs: 'Email Us',
      callUs: 'Call Us',
      liveChat: 'Live Chat'
    },
    dashboard: {
      title: 'Client Dashboard',
      totalShipments: 'Total Shipments',
      inTransit: 'In Transit',
      delivered: 'Delivered',
      goal: 'Goal',
      yourShipments: 'Your Shipments',
      monitorDesc: 'Monitor your active and past shipments in real-time.',
      noShipments: 'No shipments found. Contact Al-Israa to start your first shipment.',
      trackingNum: 'Tracking #',
      route: 'Origin & Destination',
      status: 'Status',
      lastUpdate: 'Last Update',
      supportTitle: 'Direct Support Inbox',
      supportDesc: 'Secure messaging with your dedicated logistics manager.'
    },
    admin: {
      title: 'Admin Dashboard',
      console: 'Al-Israa Management Console',
      consoleDesc: 'Manage clients, generate tracking codes, and monitor live support messages.',
      shipmentTab: 'Shipment Tracking',
      supportTab: 'Live Support Messages',
      newTracking: 'Initialize New Tracking',
      assignDesc: 'Assign cargo to a registered client and generate a tracking ID.',
      selectClient: 'Select Registered Client',
      chooseClient: 'Choose a client',
      logisticsStatus: 'Logistics Status',
      origin: 'Route: Origin',
      destination: 'Route: Destination',
      vessel: 'Vessel / Transport Info',
      initiateBtn: 'Initialize Shipment & Track',
      manifest: 'Active Cargo Manifest',
      manifestDesc: 'Real-time status of all global shipments.',
      client: 'Client',
      actions: 'Actions'
    },
    footer: {
      quickLinks: 'Quick Links',
      policies: 'Policies',
      contactInfo: 'Contact Info',
      rights: 'All Rights Reserved.'
    },
    chatbot: {
      title: 'AI Assistant',
      welcome: 'Hello! How can I help you with your logistics today?',
      placeholder: 'Type your question...',
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      services: 'Dienstleistungen',
      tracking: 'Sendungsverfolgung',
      about: 'Über uns',
      contact: 'Kontakt',
      login: 'Anmelden',
      signup: 'Registrieren',
      admin: 'Administrator',
      dashboard: 'Dashboard',
      signOut: 'Abmelden'
    },
    hero: {
      tag: 'Globale Fracht-Exzellenz',
      title: 'Zuverlässige Logistik für eine',
      titleAccent: 'vernetzte Welt.',
      subtitle: 'Al-Israa liefert präzise internationale Frachtlösungen. Vom Seehafen bis vor Ihre Haustür – wir managen das Komplexe.',
      trackBtn: 'Ladung verfolgen',
      solutionsBtn: 'Unsere Lösungen'
    },
    home: {
      expertise: 'Unsere Expertise',
      solutionsTitle: 'Globale Logistiklösungen',
      exploreBtn: 'Alle Dienste erkunden',
      advantage: 'Der Al-Israa Vorteil',
      trustTitle: 'Warum Branchenführer uns vertrauen.',
      trustDesc: 'Mit jahrzehntelanger Erfahrung und einem globalen Netzwerk bieten wir mehr als nur Transport. Wir bieten Sicherheit auf jeder Meile der Reise.',
      globalNetwork: 'Globales Netzwerk',
      globalNetworkDesc: 'Zugang zu über 150 Häfen weltweit.',
      fastDelivery: 'Schnelle Lieferung',
      fastDeliveryDesc: 'Optimierte Routen für schnellen Transit.',
      secureCargo: 'Sichere Ladung',
      secureCargoDesc: 'Erstklassige Versicherung und Abwicklung.',
      fullCompliance: 'Vollständige Einhaltung',
      fullComplianceDesc: 'Reibungslose Zollabwicklung.',
      quoteTitle: 'Bereit zum Versand?',
      quoteSubtitle: 'Fordern Sie heute eine Beratung an.',
      requestQuote: 'Kontaktieren Sie uns',
      trackPackage: 'Paket verfolgen',
      missionTitle: 'Unsere Mission',
      missionDesc: 'Nahtlose, effiziente und transparente Logistiklösungen anzubieten, die die Lücke zwischen den Kontinenten schließen.',
      visionTitle: 'Unsere Vision',
      visionDesc: 'Der weltweit zuverlässigste Logistikpartner zu sein, bekannt für technologische Innovation und Nachhaltigkeit.',
      faqTitle: 'Häufig gestellte Fragen',
      faqs: [
        { q: 'Wie verfolge ich meine Sendung?', a: 'Nutzen Sie unsere Tracking-Seite mit Ihrer AL- Tracking-ID für Echtzeit-Updates.' },
        { q: 'Welche Dienstleistungen bieten Sie an?', a: 'Wir sind spezialisiert auf Seefracht, Luftfracht, Straßentransport und Supply Chain Management.' },
        { q: 'Welche Regionen decken Sie ab?', a: 'Unser Netzwerk umfasst Syrien, Deutschland, Afrika, die USA und über 150 Häfen weltweit.' },
        { q: 'Sind meine Waren versichert?', a: 'Ja, wir bieten erstklassige Transportversicherungsoptionen an.' }
      ],
      servicesList: [
        {
          title: 'Seefracht',
          description: 'Zuverlässige und kostengünstige Seefrachtdienste für den weltweiten Versand.'
        },
        {
          title: 'Luftfracht',
          description: 'Schnelle und sichere Luftfracht für zeitkritische Frachtlieferungen weltweit.'
        },
        {
          title: 'LKW-Transport',
          description: 'Flexibler Straßen- und Schienentransport für nationale und grenzüberschreitende Logistik.'
        }
      ]
    },
    tracking: {
      title: 'Globale Verfolgung',
      trackJourney: 'Verfolgen Sie Ihre Reise',
      enterId: 'Geben Sie Ihre eindeutige Tracking-ID für Live-Fracht-Updates ein.',
      placeholder: 'z.B. AL-X92B10J...',
      syncing: 'Synchronisierung...',
      trackBtn: 'Verfolgen',
      currentStatus: 'Aktueller Status',
      estimatedArrival: 'Voraussichtliche Ankunft',
      calculating: 'Berechnung...',
      origin: 'Herkunft',
      destination: 'Ziel',
      noDetails: 'Noch keine Tracking-Details. Geben Sie eine gültige ID ein, um Live-Logistikdaten zu sehen.',
      regionalHubs: 'Regionale Express-Zentren',
      steps: {
        confirmed: 'Buchung bestätigt',
        transit: 'In Transit',
        customs: 'Zollabfertigung',
        delivery: 'In Zustellung'
      }
    },
    services: {
      title: 'Unsere Dienstleistungen',
      shippingCosts: 'Transitzeiten',
      transparentPricing: 'Globale Routen',
      pricingDesc: 'Nachfolgend finden Sie detaillierte Transitinformationen für verschiedene Ziele. Wir bieten sowohl See- als auch Lufttransport an.',
      goodsTo: 'Routen nach',
      ocean: 'Seetransport',
      air: 'Lufttransport',
      duration: 'Dauer',
      cost: 'Details'
    },
    about: {
      title: 'Über uns',
      explained: 'Logistik erklärt',
      guideTitle: 'Ihr Leitfaden für den weltweiten Versand',
      guideDesc: 'Ob Sie neu in der Logistik oder ein erfahrener Akteur sind, wir sind hier, um Ihre Fragen zu beantworten.',
      vesselSchedule: 'Schiffsplan',
      supplyChain: 'Lieferkette und Logistik',
      planShipments: 'Planen Sie Ihre Sendungen mit unserem Schiffsplan.',
      learnMore: 'Mehr erfahren'
    },
    contact: {
      title: 'Kontaktieren Sie uns',
      getInTouch: 'Kontakt aufnehmen',
      contactDesc: 'Wir sind hier, um Ihnen bei all Ihren Logistikanforderungen zu helfen. Nutzen Sie den Chat für sofortige Hilfe.',
      office: 'Unser Büro',
      emailUs: 'E-Mail schreiben',
      callUs: 'Anrufen',
      liveChat: 'Live-Chat'
    },
    dashboard: {
      title: 'Kunden-Dashboard',
      totalShipments: 'Gesamte Sendungen',
      inTransit: 'Unterwegs',
      delivered: 'Geliefert',
      goal: 'Ziel',
      yourShipments: 'Ihre Sendungen',
      monitorDesc: 'Überwachen Sie Ihre aktiven und vergangenen Sendungen in Echtzeit.',
      noShipments: 'Keine Sendungen gefunden. Kontaktieren Sie Al-Israa für Ihre erste Sendung.',
      trackingNum: 'Tracking-Nr.',
      route: 'Herkunft & Ziel',
      status: 'Status',
      lastUpdate: 'Letzte Aktualisierung',
      supportTitle: 'Support-Posteingang',
      supportDesc: 'Sichere Nachrichtenübermittlung mit Ihrem Logistik-Manager.'
    },
    admin: {
      title: 'Admin-Dashboard',
      console: 'Al-Israa Verwaltungskonsole',
      consoleDesc: 'Verwalten Sie Kunden, generieren Sie Tracking-Codes und überwachen Sie Live-Support-Nachrichten.',
      shipmentTab: 'Sendungsverfolgung',
      supportTab: 'Support-Nachrichten',
      newTracking: 'Neue Verfolgung initialisieren',
      assignDesc: 'Weisen Sie einem Kunden Fracht zu und generieren Sie eine Tracking-ID.',
      selectClient: 'Kunden auswählen',
      chooseClient: 'Wählen Sie einen Kunden',
      logisticsStatus: 'Logistik-Status',
      origin: 'Herkunft',
      destination: 'Ziel',
      vessel: 'Schiff / Transport-Info',
      initiateBtn: 'Sendung initialisieren',
      manifest: 'Aktives Frachtmanifest',
      manifestDesc: 'Echtzeit-Status aller globalen Sendungen.',
      client: 'Kunde',
      actions: 'Aktionen'
    },
    footer: {
      quickLinks: 'Schnelllinks',
      policies: 'Richtlinien',
      contactInfo: 'Kontaktinformationen',
      rights: 'Alle Rechte vorbehalten.'
    },
    chatbot: {
      title: 'KI-Assistent',
      welcome: 'Hallo! Wie kann ich Ihnen heute bei Ihrer Logistik helfen?',
      placeholder: 'Geben Sie Ihre Frage ein...',
    }
  },
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      tracking: 'Tracking',
      about: 'Over ons',
      contact: 'Contact',
      login: 'Inloggen',
      signup: 'Aanmelden',
      admin: 'Beheer',
      dashboard: 'Dashboard',
      signOut: 'Uitloggen'
    },
    hero: {
      tag: 'Wereldwijde Vracht Uitmuntendheid',
      title: 'Betrouwbare logistiek voor een',
      titleAccent: 'verbonden wereld.',
      subtitle: 'Al-Israa levert nauwkeurige internationale vrachtoplossingen. Van zeehavens tot aan uw voordeur.',
      trackBtn: 'Volg uw vracht',
      solutionsBtn: 'Onze oplossingen'
    },
    home: {
      expertise: 'Onze Expertise',
      solutionsTitle: 'Wereldwijde logistieke oplossingen',
      exploreBtn: 'Bekijk alle diensten',
      advantage: 'Het Al-Israa Voordeel',
      trustTitle: 'Waarom marktleiders ons vertrouwen.',
      trustDesc: 'Met decennia aan ervaring en een wereldwijd netwerk bieden we meer dan alleen transport.',
      globalNetwork: 'Wereldwijd Netwerk',
      globalNetworkDesc: 'Toegang tot 150+ havens wereldwijd.',
      fastDelivery: 'Snelle Levering',
      fastDeliveryDesc: 'Geoptimaliseerde routes voor snelle doorvoer.',
      secureCargo: 'Veilige Lading',
      secureCargoDesc: 'Premium verzekering en afhandeling.',
      fullCompliance: 'Volledige Naleving',
      fullComplianceDesc: 'Probleemloze douanebemiddeling.',
      quoteTitle: 'Klaar om te verzenden?',
      quoteSubtitle: 'Vraag vandaag nog een adviesgesprek aan.',
      requestQuote: 'Neem contact op',
      trackPackage: 'Pakket volgen',
      missionTitle: 'Onze Missie',
      missionDesc: 'Naadloze, efficiënte en transparante logistieke oplossingen bieden die de kloof tussen continenten overbruggen.',
      visionTitle: 'Our Vision',
      visionDesc: 'S werelds meest betrouwbare logistieke partner zijn, erkend voor technologische innovatie en duurzaamheid.',
      faqTitle: 'Veelgestelde Vragen',
      faqs: [
        { q: 'Hoe volg ik mijn zending?', a: 'Gebruik onze trackingpagina met uw AL- ID voor realtime updates.' },
        { q: 'Welke diensten bieden jullie aan?', a: 'Wij zijn gespecialiseerd in zeevracht, luchtvracht, wegtransport en supply chain management.' },
        { q: 'Welke regio\'s dekken jullie?', a: 'Ons netwerk omvat Syrië, Duitsland, Afrika, de VS en meer dan 150 havens.' },
        { q: 'Zijn mijn goederen verzekerd?', a: 'Ja, wij bieden premium transportverzekeringsopties.' }
      ],
      servicesList: [
        {
          title: 'Zeetransport',
          description: 'Betrouwbare and kosteneffectieve zeevrachtdiensten voor wereldwijde verzending.'
        },
        {
          title: 'Luchttransport',
          description: 'Snelle and veilige luchtvracht voor tijdkritische leveringen wereldwijd.'
        },
        {
          title: 'Vrachtwagentransport',
          description: 'Flexibel weg- en railtransport voor binnenlandse en grensoverschrijdende logistiek.'
        }
      ]
    },
    tracking: {
      title: 'Wereldwijde Tracking',
      trackJourney: 'Volg uw Reis',
      enterId: 'Voer uw unieke tracking-ID in voor live vrachtupdates.',
      placeholder: 'bijv. AL-X92B10J...',
      syncing: 'Synchroniseren...',
      trackBtn: 'Volgen',
      currentStatus: 'Huidige Status',
      estimatedArrival: 'Verwachte Aankomst',
      calculating: 'Berekenen...',
      origin: 'Herkomst',
      destination: 'Bestemming',
      noDetails: 'Nog geen trackinggegevens. Voer een geldige ID in.',
      regionalHubs: 'Regionale Express Hubs',
      steps: {
        confirmed: 'Boeking Bevestigd',
        transit: 'Onderweg',
        customs: 'Douaneafhandeling',
        delivery: 'Onderweg voor levering'
      }
    },
    services: {
      title: 'Onze Diensten',
      shippingCosts: 'Transittijden',
      transparentPricing: 'Wereldwijde Routes',
      pricingDesc: 'Vind hieronder gedetailleerde transitinformatie voor verschillende bestemmingen.',
      goodsTo: 'Routes naar',
      ocean: 'Zeetransport',
      air: 'Luchttransport',
      duration: 'Duur',
      cost: 'Details'
    },
    about: {
      title: 'Over ons',
      explained: 'Logistiek uitgelegd',
      guideTitle: 'Uw gids voor wereldwijde verzending',
      guideDesc: 'Of u nu nieuw bent in de logistiek of een ervaren speler, wij zijn er om u te helpen.',
      vesselSchedule: 'Vaarschema',
      supplyChain: 'Supply Chain en Logistiek',
      planShipments: 'Plan uw zendingen met ons vaarschema.',
      learnMore: 'Meer informatie'
    },
    contact: {
      title: 'Neem contact op',
      getInTouch: 'Contact opnemen',
      contactDesc: 'Wij zijn er om u te helpen bij al uw logistieke behoeften.',
      office: 'Ons kantoor',
      emailUs: 'E-mail ons',
      callUs: 'Bel ons',
      liveChat: 'Live Chat'
    },
    dashboard: {
      title: 'Klantendashboard',
      totalShipments: 'Totaal Zendingen',
      inTransit: 'Onderweg',
      delivered: 'Geleverd',
      goal: 'Doel',
      yourShipments: 'Uw Zendingen',
      monitorDesc: 'Monitor uw actieve en eerdere zendingen in real-time.',
      noShipments: 'Geen zendingen gevonden. Neem contact op met Al-Israa.',
      trackingNum: 'Tracking-nr.',
      route: 'Herkomst & Bestemming',
      status: 'Status',
      lastUpdate: 'Laatste Update',
      supportTitle: 'Directe Inbox',
      supportDesc: 'Veilige berichtenuitwisseling met uw logistiek manager.'
    },
    admin: {
      title: 'Beheerdersdashboard',
      console: 'Al-Israa Beheerdersconsole',
      consoleDesc: 'Beheer klanten, genereer trackingcodes en monitor live supportberichten.',
      shipmentTab: 'Zending Tracking',
      supportTab: 'Supportberichten',
      newTracking: 'Nieuwe Tracking Initialiseren',
      assignDesc: 'Wijs vracht toe aan een geregistreerde klant.',
      selectClient: 'Selecteer Geregistreerde Klant',
      chooseClient: 'Kies een klant',
      logisticsStatus: 'Logistieke Status',
      origin: 'Herkomst',
      destination: 'Bestemming',
      vessel: 'Vaartuig / Transportinformatie',
      initiateBtn: 'Zending Initialiseren',
      manifest: 'Actieve Vrachtmanifest',
      manifestDesc: 'Real-time status van alle wereldwijde zendingen.',
      client: 'Klant',
      actions: 'Aaties'
    },
    footer: {
      quickLinks: 'Snelkoppelingen',
      policies: 'Beleid',
      contactInfo: 'Contactinformatie',
      rights: 'Alle rechten voorbehouden.'
    },
    chatbot: {
      title: 'AI-assistent',
      welcome: 'Hallo! Hoe kan ik u vandaag helpen met uw logistiek?',
      placeholder: 'Typ je vraag...',
    }
  }
};
