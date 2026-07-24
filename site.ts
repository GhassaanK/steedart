export const site = {
  name: "Steed Art",
  domain: "steedart.pk",
  url: "https://steedart.pk",
  email: "hello@steedart.pk",
  phone: "+92 300 0000000",
  whatsapp: "+923000000000",
  city: "Karachi",
  address: "Karachi, Pakistan",
  startingPrice: "1 lac PKR",
  socials: {
    facebook: "https://facebook.com/steedart",
    instagram: "https://instagram.com/steedart",
    whatsapp: "https://wa.me/923000000000",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof site;
