import { BedDouble, CarFront, CookingPot, Leaf, MapPin, Telescope, Waves, Wifi } from "lucide-react";

export const navLinks = [
  ["The property", "/#overview"],
  ["Rooms", "/rooms"],
  ["Photos & videos", "/gallery"],
  ["Local guide", "/experiences"],
  ["Guest guide", "/faqs"],
];

export const highlights = [
  { icon: BedDouble, title: "Four restful rooms", text: "Private, spacious rooms with attached bathrooms for easy family stays." },
  { icon: Waves, title: "Poolside quiet", text: "A refreshing pool in front of the villa, framed by open farmland." },
  { icon: CookingPot, title: "Food with a story", text: "Freshly prepared homestyle meals with seasonal produce from the farm." },
  { icon: Leaf, title: "A living farm", text: "An orchard, 700 mango plants, flowers and vegetables - changing with the season." },
  { icon: Telescope, title: "Look up", text: "Clearer nights, unhurried conversations and stargazing when conditions allow." },
  { icon: Wifi, title: "Stay connected, softly", text: "Wi-Fi is available subject to local electricity and network conditions." },
];

export const experiences = [
  { title: "A slower kind of morning", eyebrow: "At the farm", text: "Tea in fresh air, a walk between fruit trees, and breakfast made at the property.", image: "/images/food.jpg" },
  { title: "Girnar, on your terms", eyebrow: "Explore", text: "A thoughtful base for sacred hills, heritage streets and guided nature experiences.", image: "/images/yoga.jpg" },
  { title: "A dip with a view", eyebrow: "Unwind", text: "Let the afternoon soften beside the pool before the farm turns gold at sunset.", image: "/images/pool.jpg" },
];

export const attractions = [
  { title: "Girnar Taleti & ropeway", detail: "Spiritual routes, temples and mountain views", icon: MapPin },
  { title: "Junagadh heritage", detail: "Uparkot, Mahabat Maqbara and historic streets", icon: MapPin },
  { title: "Official forest experiences", detail: "Permit and timing guidance from the official source", icon: CarFront },
];

export const faqGroups = [
  {
    title: "The stay",
    items: [
      ["How many rooms are there?", "Revan Hills has four guest rooms. The brochure describes each room as having an attached bathroom and capacity for up to three guests; exact layouts and tariffs will appear here once the owners publish them."],
      ["Is it a hotel?", "No. Revan Hills is a hosted farmstay: quieter, more personal and shaped around the rhythm of the farm."],
      ["Is there air conditioning?", "Please check the final room listing before booking. The current brochure describes natural ventilation and desert air coolers rather than AC."],
    ],
  },
  {
    title: "Food, pool & farm",
    items: [
      ["Are meals included?", "Meal inclusions and prices vary by booking. The booking page will always show what is included before payment."],
      ["Can we pluck mangoes?", "Only during the active harvest season and with host permission. This is a seasonal farm experience, never a year-round promise."],
      ["Can children use the pool?", "Yes, with active adult supervision. Pool hours and safety rules are shared before arrival and at the property."],
    ],
  },
  {
    title: "Getting here & booking",
    items: [
      ["Can you arrange a car or pickup?", "The hosts can publish vetted local contacts and coordinate an enquiry where possible. Individual availability and prices must be confirmed directly."],
      ["How do safari permits work?", "We will link guests only to official permit sources and explain what to prepare. Sightings and slots can never be guaranteed."],
      ["What if I need to cancel?", "The cancellation and refund policy will be shown before payment and in every booking confirmation."],
    ],
  },
];
