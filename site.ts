export const site = {
  name: "Steed Art",
  domain: "steedart.pk",
  url: "https://steedart.pk",
  email: "hello@steedart.pk",
  phone: "+92 330 2595555",
  whatsapp: "+923302595555",
  city: "Karachi",
  address: "Plot No 635 & 636, Gali No 15, Sector-F, Punjab Road, Manzoor Colony, Karachi South",
  socials: {
    facebook: "https://facebook.com/steedartoriginal",
    instagram: "https://instagram.com/steed_art",
    whatsapp: "https://wa.me/923302595555",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Guides", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof site;
