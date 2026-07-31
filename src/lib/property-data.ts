export type MediaCategory = "Exterior" | "Pool" | "Bedrooms" | "Bathrooms" | "Dining" | "Terrace" | "Garden" | "Views" | "Nearby";

export type MediaItem = {
  src: string;
  alt: string;
  category: MediaCategory;
};

export const mediaItems: MediaItem[] = [
  { src: "/images/property/hero-pool-villa.avif", alt: "Revan Hills villa and infinity pool in daylight", category: "Exterior" },
  { src: "/images/property/hero-aerial.png", alt: "Aerial view of Revan Hills at sunset", category: "Exterior" },
  { src: "/images/property/exterior-day.avif", alt: "White Revan Hills villa on a cloudy day", category: "Exterior" },
  { src: "/images/property/exterior-night.avif", alt: "Revan Hills courtyard and arches at night", category: "Exterior" },
  { src: "/images/property/veranda.avif", alt: "Open arched veranda at Revan Hills", category: "Exterior" },
  { src: "/images/property/pool-day.avif", alt: "Guests beside the infinity pool in daylight", category: "Pool" },
  { src: "/images/property/pool-sunset.avif", alt: "Floating breakfast in the pool at sunset", category: "Pool" },
  { src: "/images/property/pool-aerial.avif", alt: "Pool seen from the villa terrace", category: "Pool" },
  { src: "/images/property/bedroom-1.avif", alt: "Bedroom 1 with pink floral bed linen", category: "Bedrooms" },
  { src: "/images/property/bedroom-2.avif", alt: "Bedroom 2 with yellow bed linen", category: "Bedrooms" },
  { src: "/images/property/bedroom-3.avif", alt: "Bedroom 3 with king bed and sofa bed", category: "Bedrooms" },
  { src: "/images/property/bedroom-4.avif", alt: "Bedroom 4 with blue bed linen and window", category: "Bedrooms" },
  { src: "/images/property/bathroom-1.avif", alt: "Full bathroom 1", category: "Bathrooms" },
  { src: "/images/property/bathroom-2.avif", alt: "Full bathroom 2", category: "Bathrooms" },
  { src: "/images/property/bathroom-3.avif", alt: "Full bathroom 3", category: "Bathrooms" },
  { src: "/images/property/bathroom-4.avif", alt: "Full bathroom 4 with mirror and shower", category: "Bathrooms" },
  { src: "/images/property/bathroom-5.avif", alt: "Full bathroom 5", category: "Bathrooms" },
  { src: "/images/property/dining-day.avif", alt: "Outdoor dining area in daylight", category: "Dining" },
  { src: "/images/property/dining-night.avif", alt: "Outdoor dining beneath warm lights", category: "Dining" },
  { src: "/images/property/food-thali.avif", alt: "Home-style Gujarati thali served at Revan Hills", category: "Dining" },
  { src: "/images/property/terrace-sunset.avif", alt: "Terrace view at sunset", category: "Terrace" },
  { src: "/images/property/terrace-night.avif", alt: "Terrace arches lit at night", category: "Terrace" },
  { src: "/images/property/garden-path.avif", alt: "Bougainvillea along a garden path", category: "Garden" },
  { src: "/images/property/nature-tree.avif", alt: "Large tree on the Revan Hills land", category: "Garden" },
  { src: "/images/property/girnar-view.avif", alt: "Girnar Hills in the monsoon", category: "Views" },
  { src: "/images/property/girnar-ropeway.avif", alt: "View toward the Girnar ropeway", category: "Nearby" },
  { src: "/images/property/nearby-lake.avif", alt: "Bird beside a lake near the property", category: "Nearby" },
  { src: "/images/property/nearby-waterfall.avif", alt: "Rocky seasonal waterfall near Junagadh", category: "Nearby" },
];

export const roomItems = [
  { slug: "bedroom-1", name: "Bedroom 1", image: "/images/property/bedroom-1.avif", beds: "1 king bed · 1 single bed", bathroom: "Bathroom access", tone: "Pink floral room" },
  { slug: "bedroom-2", name: "Bedroom 2", image: "/images/property/bedroom-2.avif", beds: "1 king bed · 1 single bed", bathroom: "Bathroom access", tone: "Warm yellow room" },
  { slug: "bedroom-3", name: "Bedroom 3", image: "/images/property/bedroom-3.avif", beds: "1 king bed · 1 single bed", bathroom: "Bathroom access", tone: "Garden-toned room" },
  { slug: "bedroom-4", name: "Bedroom 4", image: "/images/property/bedroom-4.avif", beds: "1 king bed · 1 single bed", bathroom: "Bathroom access", tone: "Blue room" },
];

export const amenityGroups = [
  { title: "Bathroom", items: ["Shampoo", "Conditioner", "Body soap", "Bidet", "Hot water", "Shower gel"] },
  { title: "Bedroom & laundry", items: ["Towels, bed sheets, soap and toilet paper", "Hangers", "Bed linen", "Extra pillows and blankets", "Room-darkening blinds", "Clothes drying rack", "Mosquito net", "Clothes storage"] },
  { title: "Family & entertainment", items: ["Books and reading material", "Board games", "Plug socket covers"] },
  { title: "Comfort", items: ["Ceiling fans", "Room-darkening blinds", "Extra pillows and blankets", "Mosquito nets"] },
  { title: "Internet & work", items: ["Wi-Fi", "Dedicated workspace with whole-villa stay"] },
  { title: "Kitchen & dining", items: ["Guest kitchen", "Fridge and mini fridge", "Cooking basics", "Crockery and cutlery", "Cooker", "Blender", "Dining table", "Coffee"] },
  { title: "Outdoor", items: ["Shared patio or balcony", "Back garden", "Outdoor furniture", "Outdoor dining area", "Private entrance"] },
  { title: "Parking & facilities", items: ["Free parking on premises", "Shared outdoor infinity pool", "Pool open 8:00 am–6:00 pm", "Solar panels", "Composting for whole-villa stays"] },
  { title: "Services", items: ["Breakfast availability — confirm inclusion with the host", "Self check-in with building staff", "Building staff available for arrival", "Daily housekeeping window listed for whole-villa stays"] },
  { title: "Safety", items: ["Exterior security cameras in common outdoor areas", "First aid kit", "No cameras in bedrooms, bathrooms or private spaces"] },
];

export const unavailableAmenities = ["Air conditioning", "TV", "Washing machine", "Tumble dryer", "Heating", "Smoke alarm status not reported", "Carbon monoxide alarm status not reported"];

export const houseRules = [
  "Check-in from 10:00 am to 12:00 pm",
  "Checkout before 10:00 am",
  "No pets",
  "No smoking",
  "No alcohol, intoxicating substances or recreational drugs",
  "Keep music and noise low so guests and wildlife can enjoy the surroundings",
  "Do not feed, chase, frighten or disturb birds and animals",
  "Take plastic bags, bottles and wrappers back with you when leaving",
];

export const guideItems = [
  {
    slug: "gir-lions",
    title: "Gir lions & Sasan Gir",
    eyebrow: "The region’s signature wildlife",
    image: "/images/property/gir-asiatic-lion.jpg",
    summary: "Plan an official safari in the Gir landscape—the world’s only wild home of the Asiatic lion—and give this experience the time it deserves.",
    detail: "The Gir region is globally known for its wild Asiatic lions. Plan the Gir Jungle Trail or Devalia Safari Park only through the official permit system, check seasonal closures and carry the required photo identification. Wildlife moves freely, so no responsible host or guide can promise a sighting.",
    officialUrl: "https://girlion.gujarat.gov.in/",
  },
  {
    slug: "girnar",
    title: "Girnar hills, temples & ropeway",
    eyebrow: "Sacred mountain",
    image: "/images/property/girnar-ropeway.avif",
    summary: "Plan a ropeway visit or a longer temple climb with an early start, suitable footwear and time for the mountain rather than a rushed checklist.",
    detail: "Girnar is a major sacred landscape beside Junagadh. Routes, weather and operating conditions can change, so confirm the ropeway or walking plan on the day and keep extra time for queues and temple visits.",
    officialUrl: "https://udankhatola.com/destination/girnar-ropeway/",
  },
  {
    slug: "junagadh-heritage",
    title: "Junagadh heritage circuit",
    eyebrow: "History & architecture",
    image: "/images/property/terrace-night.avif",
    summary: "Build a half or full day around Uparkot Fort, the Ashokan inscriptions, Mahabat Maqbara and the old city.",
    detail: "Junagadh layers Buddhist, Indo-Islamic, Rajput and colonial histories. Opening hours and restoration closures may change; use the property as a calm base and verify each monument before setting out.",
    officialUrl: "https://www.gujarattourism.com/saurashtra/junagadh.html",
  },
  {
    slug: "girnar-nature-safari",
    title: "Girnar Nature Safari",
    eyebrow: "Official forest experience",
    image: "/images/property/girnar-view.avif",
    summary: "A seasonal, permit-based forest experience near Junagadh. Book only through the official Gujarat portal and never treat a wildlife sighting as guaranteed.",
    detail: "The official portal says the sanctuary normally closes from 16 June to 15 October and may also close for festivals or forest conditions. Carry original photo ID and check current permit, guide and vehicle terms before paying.",
    officialUrl: "https://girlion.gujarat.gov.in/GirnarNatureSafariBooking.aspx",
  },
  {
    slug: "lakes-and-seasonal-water",
    title: "Lakes, monsoon water & quiet drives",
    eyebrow: "Slow local days",
    image: "/images/property/nearby-lake.avif",
    summary: "Ask the hosts which lake edges, seasonal water spots and village roads are appropriate during your stay.",
    detail: "These places change dramatically with the season. Access, water levels and road conditions should be checked locally; never enter flowing water or private land without guidance.",
    officialUrl: "",
  },
  {
    slug: "somnath-extension",
    title: "Somnath coastal extension",
    eyebrow: "Separate day trip",
    image: "/images/property/pool-sunset.avif",
    summary: "Somnath can be considered as a separate onward route or day trip rather than squeezed into a Girnar morning.",
    detail: "Allow a generous travel window and confirm temple guidance, road conditions and return timing before departure. Exact distance and drive time will be published once the Revan Hills map pin is verified.",
    officialUrl: "https://www.gujarattourism.com/saurashtra/gir-somnath/somnath-temple.html",
  },
];

export const faqGroups = [
  { title: "Booking & stay options", items: [
    ["Can I book the whole villa?", "Yes. The entire-villa option covers four bedrooms, eight beds and five bathrooms for up to eight guests, subject to confirmed availability."],
    ["Can I book one room?", "Yes. Choose Private room in the booking form and select the room you prefer. Final room assignment and occupancy are confirmed by the host."],
    ["Does the website confirm my booking instantly?", "Not yet. The current form sends a detailed request. Your stay is confirmed only when the host replies with availability, price and payment terms."],
  ]},
  { title: "Rooms, food & comfort", items: [
    ["What is the bed layout?", "Each of the four tagged bedrooms is listed with one king bed and one single bed."],
    ["Is there air conditioning?", "No. The rooms have ceiling fans; air conditioning is not currently offered. Confirm seasonal comfort needs with the host before booking."],
    ["Is breakfast included?", "Breakfast availability, inclusion and meal prices should be confirmed with the host for your stay."],
    ["Can guests use the kitchen?", "Guest amenities include a kitchen, fridge, cooking basics, crockery, cooker, blender, dining table and coffee."],
  ]},
  { title: "Pool, rules & safety", items: [
    ["When is the pool open?", "The shared outdoor infinity pool is listed as open from 8:00 am to 6:00 pm. Children must be actively supervised."],
    ["Are pets, smoking or alcohol allowed?", "No pets and no smoking are allowed. The property rules also prohibit alcohol, intoxicating substances and recreational drugs."],
    ["Are there security cameras?", "Yes, exterior CCTV covers common outdoor areas for safety. No cameras are installed inside rooms, bathrooms or private guest spaces."],
    ["Are smoke and carbon monoxide alarms available?", "Their availability is not currently confirmed. Ask the host before booking if this affects your decision."],
  ]},
  { title: "Arrival & nearby plans", items: [
    ["Where is Revan Hills?", "Revan Hills is at Bawe wali dhar, Malida, near Junagadh and the Girnar landscape. The website map shows the exact property pin and links directly to Google Maps directions."],
    ["Can the hosts help plan nearby experiences?", "They can help with practical local context, but regulated forest permits must be booked on the official Gujarat portal and wildlife sightings are never guaranteed."],
  ]},
];
