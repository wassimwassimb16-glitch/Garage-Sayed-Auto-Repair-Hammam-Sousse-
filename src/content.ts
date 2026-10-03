export interface BusinessInfo {
  name: string;
  type: string;
  address: string;
  phone: string;
  phoneRaw: string;
  whatsappLink: string;
  whatsappPriceLink: string;
  googleRating: number;
  reviewCount: number;
  googleMapsLink: string;
  googleMapsDirections: string;
  timezone: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "Hair Style By Oussama",
  type: "Men's Barber Shop",
  address: "4 Rue de l'Église, Sousse 4000, Tunisia",
  phone: "+216 20 524 024",
  phoneRaw: "+21620524024",
  whatsappLink: "https://wa.me/21620524024?text=Hello%20Oussama%2C%20I%27d%20like%20to%20book%20a%20haircut",
  whatsappPriceLink: "https://wa.me/21620524024?text=Hello%20Oussama%2C%20what%20are%20your%20prices%20for%20a%20haircut%20and%20beard%3F",
  googleRating: 4.9,
  reviewCount: 116,
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Hair+Style+By+Oussama+Sousse",
  googleMapsDirections: "https://www.google.com/maps/dir/?api=1&destination=Hair+Style+By+Oussama+Sousse+Tunisia",
  timezone: "Africa/Tunis",
  openingHours: [
    { days: "Monday", hours: "Closed" },
    { days: "Tuesday – Sunday", hours: "08:00 – 18:00" },
  ],
};

export type Lang = "en" | "fr" | "ar";

export interface ContentTranslation {
  metaTitle: string;
  nav: {
    about: string;
    services: string;
    reviews: string;
    hours: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    h1: string;
    sub: string;
    bookBtn: string;
    callBtn: string;
    ratingChip: string;
    hoursChip: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    text: string;
    fact1: string;
    fact2: string;
    fact3: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      num: string;
      title: string;
      desc: string;
    }[];
    priceNote: string;
    askPriceBtn: string;
  };
  booking: {
    title: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      desc: string;
    }[];
  };
  reviews: {
    score: string;
    stars: string;
    countText: string;
    verifiedNote: string;
    items: string[];
    readGoogleBtn: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    tag: string;
    photoPlaceholder: string;
    closeLightbox: string;
  };
  hoursLocation: {
    title: string;
    openNow: string;
    closed: string;
    closedMonday: string;
    opensTuesday: string;
    addressHeading: string;
    directionsBtn: string;
    medinaNote: string;
    scheduleHeading: string;
    days: {
      mon: string;
      tueSun: string;
      closedText: string;
    };
  };
  contact: {
    title: string;
    sub: string;
    bookBtn: string;
    callBtn: string;
  };
  footer: {
    address: string;
    hoursSummary: string;
    backToTop: string;
    rights: string;
  };
  mobileBar: {
    whatsapp: string;
    call: string;
  };
}

export const CONTENT: Record<Lang, ContentTranslation> = {
  en: {
    metaTitle: "Hair Style By Oussama – Barber in Sousse Medina",
    nav: {
      about: "About",
      services: "Services",
      reviews: "Reviews",
      hours: "Hours & Location",
      contact: "Contact",
      bookNow: "Book now",
    },
    hero: {
      h1: "A proper cut, in the heart of Sousse medina.",
      sub: "Precise fades, sharp shapes and a clean shave from a barber visitors from around the world keep coming back to.",
      bookBtn: "Book on WhatsApp",
      callBtn: "Call +216 20 524 024",
      ratingChip: "4.9 ★ · 116 Google reviews",
      hoursChip: "Open Tue–Sun, 8:00–18:00",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "The Craft",
      title: "Show a photo. Leave with that cut.",
      text: "Bring a reference picture and Oussama takes the time to get every detail right: the fade, the shape, the finish. Located in the old town, a few steps from the sights.",
      fact1: "4.9 / 5 on Google",
      fact2: "116 reviews",
      fact3: "Open 6 days a week",
    },
    services: {
      title: "Services",
      subtitle: "Tailored grooming with meticulous attention to detail and traditional precision.",
      items: [
        {
          num: "01",
          title: "Haircut",
          desc: "Classic or modern, cut to your head shape and your reference.",
        },
        {
          num: "02",
          title: "Fade and shape",
          desc: "Clean transitions and sharp lines, done patiently.",
        },
        {
          num: "03",
          title: "Beard and close shave",
          desc: "Precise beard shaping and a smooth finish.",
        },
        {
          num: "04",
          title: "Styling",
          desc: "Finished and styled so it looks right when you leave.",
        },
      ],
      priceNote: "Prices: ask on WhatsApp",
      askPriceBtn: "Ask for a price",
    },
    booking: {
      title: "How to book",
      subtitle: "Three simple steps to secure your chair while visiting Sousse.",
      steps: [
        {
          step: "1",
          title: "Message on WhatsApp",
          desc: "Send a message with the date and time you would like.",
        },
        {
          step: "2",
          title: "Send reference photo",
          desc: "Share a reference picture of the hairstyle or fade you want.",
        },
        {
          step: "3",
          title: "Come to 4 Rue de l'Église",
          desc: "Walk right in the heart of Sousse medina and enjoy your cut.",
        },
      ],
    },
    reviews: {
      score: "4.9",
      stars: "★★★★★",
      countText: "116 Google reviews",
      verifiedNote: "Based on Google Maps reviews.",
      items: [
        "One of the best barbers I've visited, a visitor from abroad says, with a reference photo copied to the detail.",
        "Welcoming, professional and fairly priced.",
        "A real find in the middle of the medina.",
      ],
      readGoogleBtn: "Read reviews on Google",
    },
    gallery: {
      title: "Atmosphere & Cuts",
      subtitle: "Craftsmanship in the medina",
      tag: "Medina Shop",
      photoPlaceholder: "Photo to replace",
      closeLightbox: "Close preview",
    },
    hoursLocation: {
      title: "Hours & Location",
      openNow: "Open now",
      closed: "Closed",
      closedMonday: "Closed · opens Tuesday 08:00",
      opensTuesday: "Closed · opens tomorrow 08:00",
      addressHeading: "Address in the Medina",
      directionsBtn: "Get directions",
      medinaNote: "In the old town of Sousse, easy to reach on foot.",
      scheduleHeading: "Opening Hours",
      days: {
        mon: "Monday",
        tueSun: "Tuesday to Sunday",
        closedText: "Closed",
      },
    },
    contact: {
      title: "Ready for a fresh cut?",
      sub: "Send a message with your photo and your preferred day.",
      bookBtn: "Book on WhatsApp",
      callBtn: "Call +216 20 524 024",
    },
    footer: {
      address: "4 Rue de l'Église, Sousse 4000, Tunisia",
      hoursSummary: "Tue–Sun: 08:00–18:00 · Mon: Closed",
      backToTop: "Back to top",
      rights: "Hair Style By Oussama. All rights reserved.",
    },
    mobileBar: {
      whatsapp: "WhatsApp",
      call: "Call",
    },
  },
  fr: {
    metaTitle: "Hair Style By Oussama – Barbier Médina de Sousse",
    nav: {
      about: "À propos",
      services: "Services",
      reviews: "Avis",
      hours: "Horaires & Accès",
      contact: "Contact",
      bookNow: "Réserver",
    },
    hero: {
      h1: "Une coupe impeccable au cœur de la médina de Sousse.",
      sub: "Dégradés précis, contours nets et rasage de près par un barbier recommandé par les voyageurs du monde entier.",
      bookBtn: "Réserver sur WhatsApp",
      callBtn: "Appeler le +216 20 524 024",
      ratingChip: "4.9 ★ · 116 avis Google",
      hoursChip: "Ouvert mar.–dim., 8h00–18h00",
      scroll: "Défiler",
    },
    about: {
      eyebrow: "Le Savoir-Faire",
      title: "Montrez une photo. Repartez avec cette coupe.",
      text: "Apportez une photo de référence et Oussama prend le temps d'ajuster chaque détail : dégradé, finitions et contours. Situé dans la vieille ville, à quelques pas des ruelles historiques.",
      fact1: "4.9 / 5 sur Google",
      fact2: "116 avis",
      fact3: "Ouvert 6j/7",
    },
    services: {
      title: "Services",
      subtitle: "Un travail soigné et attentif aux détails avec une maîtrise classique.",
      items: [
        {
          num: "01",
          title: "Coupe de cheveux",
          desc: "Classique ou moderne, adaptée à la morphologie et à votre modèle.",
        },
        {
          num: "02",
          title: "Dégradé & contours",
          desc: "Transitions nettes et lignes précises, travaillées avec patience.",
        },
        {
          num: "03",
          title: "Barbe & rasage de près",
          desc: "Taille de barbe millimétrée et peau douce au rasoir.",
        },
        {
          num: "04",
          title: "Coiffage & finition",
          desc: "Mise en forme soignée pour un rendu parfait dès la sortie du salon.",
        },
      ],
      priceNote: "Tarifs : demandez sur WhatsApp",
      askPriceBtn: "Demander le tarif",
    },
    booking: {
      title: "Comment réserver",
      subtitle: "Trois étapes faciles pour votre créneau lors de votre séjour à Sousse.",
      steps: [
        {
          step: "1",
          title: "Envoyez un message sur WhatsApp",
          desc: "Indiquez la date et l'heure souhaitées pour votre passage.",
        },
        {
          step: "2",
          title: "Partagez votre modèle",
          desc: "Envoyez la photo de la coupe ou du dégradé recherché.",
        },
        {
          step: "3",
          title: "Rendez-vous au 4 Rue de l'Église",
          desc: "Venez au cœur de la médina de Sousse pour votre rendez-vous.",
        },
      ],
    },
    reviews: {
      score: "4.9",
      stars: "★★★★★",
      countText: "116 avis Google",
      verifiedNote: "Basé sur les avis Google Maps.",
      items: [
        "L'un des meilleurs barbiers que j'ai visités, témoigne un voyageur étranger, reproduisant la photo de référence au millimètre près.",
        "Chaleureux, professionnel et tarifs très honnêtes.",
        "Une véritable perle en plein centre de la médina.",
      ],
      readGoogleBtn: "Lire les avis sur Google",
    },
    gallery: {
      title: "Ambiance & Réalisations",
      subtitle: "Précision artisanale en médina",
      tag: "Salon Médina",
      photoPlaceholder: "Photo à remplacer",
      closeLightbox: "Fermer l'aperçu",
    },
    hoursLocation: {
      title: "Horaires & Localisation",
      openNow: "Ouvert actuellement",
      closed: "Fermé",
      closedMonday: "Fermé · réouverture mardi 08h00",
      opensTuesday: "Fermé · réouverture demain 08h00",
      addressHeading: "Adresse dans la Médina",
      directionsBtn: "Itinéraire Google Maps",
      medinaNote: "Dans la vieille ville de Sousse, facilement accessible à pied.",
      scheduleHeading: "Horaires d'ouverture",
      days: {
        mon: "Lundi",
        tueSun: "Mardi au Dimanche",
        closedText: "Fermé",
      },
    },
    contact: {
      title: "Prêt pour une nouvelle coupe ?",
      sub: "Envoyez un message avec votre photo et le créneau désiré.",
      bookBtn: "Réserver sur WhatsApp",
      callBtn: "Appeler le +216 20 524 024",
    },
    footer: {
      address: "4 Rue de l'Église, Sousse 4000, Tunisie",
      hoursSummary: "Mar.–Dim. : 08h00–18h00 · Lun. : Fermé",
      backToTop: "Haut de page",
      rights: "Hair Style By Oussama. Tous droits réservés.",
    },
    mobileBar: {
      whatsapp: "WhatsApp",
      call: "Appeler",
    },
  },
  ar: {
    metaTitle: "صالون أسامة للحلاقة – المدينة العتيقة بسوسة",
    nav: {
      about: "عن الصالون",
      services: "الخدمات",
      reviews: "التقييمات",
      hours: "المواعيد والموقع",
      contact: "اتصل بنا",
      bookNow: "احجز الآن",
    },
    hero: {
      h1: "حلاقة متقنة في قلب مدينة سوسة العتيقة.",
      sub: "تدرج دقيق وتحديد محكم وحلاقة ناعمة يقصدها الزوار من مختلف أنحاء العالم.",
      bookBtn: "احجز عبر واتساب",
      callBtn: "اتصل 024 524 20 216+",
      ratingChip: "4.9 ★ · 116 تقييم على Google",
      hoursChip: "مفتوح الثلاثاء–الأحد، 08:00–18:00",
      scroll: "تمرير",
    },
    about: {
      eyebrow: "الحرفة والإتقان",
      title: "أرنا صورة... واخرج بالقصة ذاتها بدقة.",
      text: "أحضر صورة القصة التي تفضلها وسيأخذ أسامة وقته لتطبيق أدق التفاصيل: التدرج، التحديد واللمسة الأخيرة. يقع الصالون في المدينة العتيقة بالقرب من المعالم التاريخية.",
      fact1: "4.9 / 5 على Google",
      fact2: "116 تقييماً حقيقياً",
      fact3: "مفتوح 6 أيام أسبوعياً",
    },
    services: {
      title: "خدماتنا",
      subtitle: "عناية متكاملة للرجال بكل عناية وإتقان وصبر.",
      items: [
        {
          num: "01",
          title: "قص الشعر",
          desc: "قص كلاسيكي أو عصري متناسق مع ملامحك والصورة التي تختارها.",
        },
        {
          num: "02",
          title: "التدرج وتحديد الأطراف",
          desc: "تدرج ناعم وخطوط واضحة ومتقنة دون استعجال.",
        },
        {
          num: "03",
          title: "تهذيب اللحية وحلاقة دقيقة",
          desc: "تنسيق متقن للذقن مع نعومة ولمسة نظيفة بالموس.",
        },
        {
          num: "04",
          title: "تصفيف وتسريح الشعر",
          desc: "تصفيف بمظهر أنيق يدوم طوال اليوم.",
        },
      ],
      priceNote: "الأسعار: استفسر عبر واتساب",
      askPriceBtn: "استفسر عن الأسعار",
    },
    booking: {
      title: "طريقة الحجز",
      subtitle: "ثلاث خطوات بسيطة لحجز موعدك أثناء إقامتك في سوسة.",
      steps: [
        {
          step: "1",
          title: "راسل أسامة عبر واتساب",
          desc: "أرسل رسالة باليوم والوقت المناسب لك.",
        },
        {
          step: "2",
          title: "أرسل صورة القصة المطلوبة",
          desc: "شارك صورة لشكل القصة أو التدرج الذي ترغب به.",
        },
        {
          step: "3",
          title: "تفضل بزيارتنا في 4 نهج الكنيسة",
          desc: "خطوات يسيرة داخل المدينة العتيقة في سوسة.",
        },
      ],
    },
    reviews: {
      score: "4.9",
      stars: "★★★★★",
      countText: "116 تقييم على Google",
      verifiedNote: "وفقاً لتقييمات Google Maps المعتمدة.",
      items: [
        "من أفضل الحلاقين الذين زرتهم، كما يصف أحد الزوار الأجانب، مع تطبيق مطابق تماماً للصورة المعروضة.",
        "استقبال طيب، احترافية عالية وأسعار مناسبة جداً.",
        "اكتشاف حقيقي ورائع وسط المدينة العتيقة.",
      ],
      readGoogleBtn: "شاهد التقييمات على Google",
    },
    gallery: {
      title: "أجواء الصالون والإبداع",
      subtitle: "لمسات يدوية في قلب المدينة القديمة",
      tag: "صالون سوسة",
      photoPlaceholder: "صورة قابلة للتحديث",
      closeLightbox: "إغلاق المعاينة",
    },
    hoursLocation: {
      title: "المواعيد والموقع",
      openNow: "مفتوح الآن",
      closed: "مغلق",
      closedMonday: "مغلق · يفتح الثلاثاء 08:00",
      opensTuesday: "مغلق · يفتح غداً 08:00",
      addressHeading: "العنوان في المدينة العتيقة",
      directionsBtn: "الاتجاهات عبر الخريطة",
      medinaNote: "في قلب مدينة سوسة القديمة، يمكن الوصول إليه سيراً على الأقدام.",
      scheduleHeading: "أوقات العمل",
      days: {
        mon: "الاثنين",
        tueSun: "من الثلاثاء إلى الأحد",
        closedText: "مغلق",
      },
    },
    contact: {
      title: "جاهز لقصة جديدة ومميزة؟",
      sub: "أرسل رسالة مع صورتك واليوم المفضل لديك.",
      bookBtn: "احجز عبر واتساب",
      callBtn: "اتصل 024 524 20 216+",
    },
    footer: {
      address: "4 نهج الكنيسة، سوسة 4000، تونس",
      hoursSummary: "الثلاثاء–الأحد: 08:00–18:00 · الاثنين: مغلق",
      backToTop: "إلى الأعلى",
      rights: "صالون أسامة للحلاقة. جميع الحقوق محفوظة.",
    },
    mobileBar: {
      whatsapp: "واتساب",
      call: "اتصال",
    },
  },
};
