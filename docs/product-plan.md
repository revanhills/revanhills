# Revan Hills Farmstay - Product Plan

Status: redesigned property listing deployed to the original Revan Hills Cloudflare Pages URL; secondary Git-connected preview also active.

Last updated: 2026-07-31

## GitHub repository and account relationship

- Canonical repository: [revanhills/revanhills](https://github.com/revanhills/revanhills)
- Git remote used by this local checkout: `origin = https://github.com/revanhills/revanhills.git`
- Default and release branch: `main`
- Repository owner/login: `revanhills`
- Local publishing identity: `voxxora`, added as a collaborator with Write access on 2026-07-31.

`voxxora` is not a second repository and does not own this website. It appears only because Git needs an authenticated GitHub user when this computer runs `git push`. The website remains connected to and published from `revanhills/revanhills`; `voxxora` is simply the authorized collaborator account currently used by the local GitHub CLI to send commits to that repository. If the `revanhills` owner account is authenticated directly on this computer later, it can perform the same publishing role and the `voxxora` collaborator is no longer technically necessary.

## Cloudflare Pages projects and production relationship

### Original public site

- Production project: `revanhills`
- Public URL: [revanhills.pages.dev](https://revanhills.pages.dev)
- Cloudflare account: `neofyne@gmail.com` (`09d3d8459abf2ec57175e74082aaa903`)
- Deployment type: direct Wrangler upload; Cloudflare reports `Git Provider: No`
- Build command: `npm run build`
- Static output directory: `out`
- Redesigned listing deployed successfully on 2026-08-01 from Git commit `504116a`

This is the original Revan Hills Pages address and the production URL people may already know. A GitHub push alone does **not** update this project. Until its delivery workflow is deliberately migrated, publish it by building the current `main` checkout and deploying `out` to the `revanhills` Pages project while authenticated to the Neofyne Cloudflare account.

### Secondary Git-connected project

- Project: `revanhills-official`
- URL: [revanhills-official.pages.dev](https://revanhills-official.pages.dev)
- Cloudflare account: `Revanhillsofficial@gmail.com` (`27408494436c2288988271fb52947cca`)
- Connected GitHub account/repository: `revanhills` / `revanhills/revanhills`
- Production branch: `main`
- Build command and output: `npm run build` → `out`

This secondary project automatically deploys pushes to GitHub `main`, but it does not replace or update `revanhills.pages.dev`. Keep both projects intact until the owners choose the final Cloudflare account and domain migration path. Do not claim that a GitHub push updated the original URL without separately verifying the `revanhills` project deployment.

## 0. Current redesign execution plan (2026-07-31)

### Brand lockups — 2026-08-01

- Active header wording: `REVAN HILLS` on the first line and `ECOSTAY` on the second.
- Mountain/farm concept (active): `public/brand/revan-hills-ecostay-mountain.svg`.
- Abstract Asiatic lion concept (alternate, not active): `public/brand/revan-hills-ecostay-lion.svg`.
- Keep both source SVGs editable and do not replace the active mark with the lion concept until the owner chooses it.

### Outcome

Replace the current editorial brochure-like homepage with a complete, mobile-first direct property listing for Revan Hills. It will use familiar travel-booking interaction patterns without copying Airbnb branding or proprietary visual styling. Visitors should be able to understand the complete property, browse the real tagged media by category, compare whole-villa and room-by-room stays, choose dates and guests, and send a detailed booking request.

### Information architecture

1. **Property listing (`/`)** - compact brand header, listing title and facts, two-image hero mosaic, scroll-triggered section navigation, overview, sleeping arrangements, room cards, amenities preview with a full modal, host story, rules/safety/accessibility summaries with detail modals, location teaser, nearby highlights, and sticky booking card.
2. **Photo and video tour (`/gallery`)** - category filters for All, Exterior, Pool, Bedrooms, Bathrooms, Dining, Terrace, Garden, Views and Nearby; remove known duplicates/collages/screenshots; include a Photos/Videos mode and honest video placeholders until source clips arrive.
3. **Rooms (`/rooms`)** - four room cards with their tagged photographs, king + single bed layout, amenities, occupancy status to verify, and a per-room booking entry point. Whole-villa booking remains equally prominent.
4. **Booking (`/book`)** - interactive whole-villa/private-room selector, check-in/out date fields, guests/rooms controls, meal preference, contact details, an availability/enquiry summary, and WhatsApp handoff. Unknown tariffs remain explicitly “on request”; the UI must never invent prices or claim a confirmed reservation.
5. **Local guide (`/experiences`) and journey (`/journey`)** - distinct attraction cards and detail pages for Girnar, Junagadh heritage, and responsible nature/forest planning. Distances and drive times stay marked for verification until an exact property map pin is supplied.
6. **Guest guide (`/faqs`)** - searchable, grouped accordions for booking, rooms, food, pool, access, rules and safety.

### Content and media rules

- Use `62-pool-villa-day-wide-04.avif` as the dominant hero image and `villa-aerial view.png` as the second hero image.
- Copy selected real media into `public/images/property/` with stable descriptive filenames; never load production UI directly from `Doc/` paths.
- Use the tagged 78-image set as the source of truth. Exclude `55-dining-food-thali-duplicate-01`, `61-additional-photo-collage`, `77-misc-phone-screenshot-remove-if-not-needed`, and visually redundant near-duplicates from the public tour.
- Room mapping: Bedroom 1 pink floral, Bedroom 2 yellow, Bedroom 3 pink sofa-bed, Bedroom 4 blue bed. Use the five tagged bathroom images for the bathroom group.
- Video areas use clearly labelled placeholders, support portrait-first cards, and do not imply that footage exists yet.
- Typography uses the Arial family throughout; display headings and strong labels use Arial Black where available with Arial Bold fallbacks.

### Interaction model

- Desktop hero uses a two-panel mosaic with an overlaid `Show all photos` action; mobile uses a swipeable two-card strip.
- The section bar appears only after the hero/listing summary has scrolled past and links to Photos, Overview, Rooms, Amenities, Rules, Location and Guide.
- Long content is progressively disclosed: amenities open in a modal; rules, safety and cancellation use expandable/modal detail views; FAQs use accordions; booking controls remain direct and visible.
- Desktop booking summary is sticky beside listing content. Mobile uses a non-obscuring sticky bottom bar with `Check dates` and `WhatsApp`.
- All dialogs must have an accessible title, close button, Escape handling, focus-safe controls and scrollable mobile layout.

### Truth and launch safeguards

- Preserve confirmed Airbnb-source facts: 4 bedrooms, 8 beds, 5 bathrooms, whole-villa maximum 8 guests, king + single bed per room, pool hours 8:00 am–6:00 pm, check-in 10:00 am–12:00 pm, checkout before 10:00 am, exterior-only CCTV, no pets and no smoking.
- Treat private-room occupancy, all tariffs/taxes, exact map pin, meal inclusions, cancellation schedule, alarms, event policy and final room availability as owner-confirmation items.
- A submitted form creates an enquiry/WhatsApp draft, not a confirmed booking or live inventory hold.
- No fabricated reviews, star ratings, prices, travel times, availability, videos or attraction photography.
- Treat `revanhills.pages.dev` as the original public site and verify it after each authorized release; retain the separate Git-connected project until an owner-approved migration decision is made.

### Build order and verification

1. [x] Inventory content and media; write this plan.
2. [x] Create a typed property content model and curated media catalogue.
3. [x] Build reusable client interactions: sticky section navigation, media viewer, modal/accordion content, booking mode/date/guest controls.
4. [x] Redesign the property listing and global responsive typography/layout.
5. [x] Build gallery, rooms, booking, local-guide and FAQ routes.
6. [x] Run ESLint, production build and `git diff --check`.
7. [x] Visually verify desktop and mobile listing, gallery modal/category filters, scroll-triggered navigation, room selection and date validation in the local browser. The final WhatsApp send was intentionally not triggered during QA because it opens an external message handoff.

### Verification record — 2026-07-31

- `npm run lint`: passed with no warnings or errors after excluding generated `.next` and `out` artifacts from ESLint.
- `npm run build`: passed; 20 static pages generated, including the listing, gallery, rooms, booking, FAQs and six attraction detail pages.
- `git diff --check`: passed.
- Local browser: confirmed requested hero image order (`hero-pool-villa.avif`, then `hero-aerial.png`), responsive mobile hero strip and fixed booking bar, desktop two-image mosaic and sticky booking card, scroll-triggered section navigation, 28-photo modal, complete amenities modal, private-room query handoff to Bedroom 4, date selection showing a two-night stay, and video-placeholder mode.
- Deployment: the Git-connected secondary project passed at `https://revanhills-official.pages.dev/`, then the same redesigned build was uploaded to the original `https://revanhills.pages.dev/` project under the Neofyne Cloudflare account. The original URL returned HTTP 200, its deployed HTML hash matched the local `out/index.html`, and a cache-busted browser load visibly confirmed the property listing, requested hero media, rooms, booking controls, guide links, amenities and rules.

### Booking-flow correction — 2026-08-01

- The homepage booking card now carries stay type, preferred room, check-in, checkout and guest count into `/book` instead of discarding the selected values.
- The booking page validates future dates, keeps the chosen room/date/guest summary visible, supports changing every selection, and sends the completed enquiry through a same-tab WhatsApp handoff to avoid popup blocking.
- Guests can also use a visible `Message host` link without completing the full availability form, or call the host directly.
- Browser verification passed for Private room → Bedroom 4 → 10–12 August 2026 → 3 guests, including the populated booking summary and both host-contact paths. The final WhatsApp send was not triggered during QA because it would open an external conversation.

### Deferred owner inputs (visible in the UI where relevant)

- Exact room-by-room names and occupancy; whether the private listing is one selectable room or a shared multi-room offer.
- Approved weekday/weekend tariffs, extra-guest rules, taxes, deposits, cancellation/refund policy and payment gateway.
- Exact Google Maps pin, verified attraction distances/drive times and arrival instructions.
- Breakfast/meal inclusion and prices; current alarm status; event/day-use/commercial-shoot policy.
- Actual vertical and horizontal videos, poster frames and captions.

## 1. Product in one sentence

Revan Hills Farmstay is a warm, mobile-first direct-booking website for a four-room organic farmstay in Malida, near Junagadh and the Girnar landscape: guests should be able to understand the stay, see real proof, plan the journey, check live availability, and confidently book; Devang and Renu Vaidya should be able to run it themselves without technical help.

## 2. Positioning

This should not feel like a generic hotel catalogue or an over-polished wildlife resort. The promise is a hosted, family-like farmstay: quiet open land, Girnar views, a pool, home-cooked farm food, an orchard in season, and a useful base for the Girnar/Junagadh/Gir region.

The site should make the following ideas tangible rather than merely claim them:

- Four spacious rooms, each with an attached bathroom; the brochure states up to three guests per room.
- A pool in front of the villa and wide, uncrowded farm surroundings.
- Food prepared at the property, including seasonal vegetables from the farm.
- An orchard with roughly 700 mango plants; mango-plucking/fruit stories are a seasonal experience and should never be promised outside the actual harvest window.
- Slow experiences: sunrise/sunset, greenery, yoga/meditation, birding, and telescope-led stargazing when available.
- A practical location for Girnar, Junagadh heritage, and correctly booked forest experiences.

The visual character: sun-warmed white villa, orchard greens, earthy brown, water blue, and small saffron highlights. Photography and short ambient clips must lead. Copy should be calm, specific, and plain-spoken - never make unverified wildlife, organic-certification, or view claims.

## 3. Success measures

1. A visitor on a phone can reach a trustworthy booking decision in under five minutes.
2. Every booking leaves the owners with a clear status: enquiry, payment-pending, confirmed, cancelled, or checked out.
3. Devang/Renu can change prices, close dates, publish photos, update a room or FAQ, and respond to a booking without editing code.
4. The property owns its guest data and direct-booking relationship, rather than depending entirely on Instagram/WhatsApp.
5. Information likely to change (tariff, safari slots, transfers, harvest, seasonal food, road conditions) has an owner and review date.

## 4. Primary guests and their needs

| Guest | What convinces them | What they need before booking |
| --- | --- | --- |
| Family or small group from Gujarat | Space, safety, pool, food, value | Room capacity, total price, meal options, directions, child/pool policy |
| Couple/weekend traveller | Beauty, calm, privacy, easy booking | Real video, room/pool photos, availability, exact location, WhatsApp fallback |
| Girnar/Junagadh explorer | A reliable base and practical logistics | Attraction map, drive times, safari/ropeway guidance, early-breakfast/transfer answers |
| Nature-minded guest | Farm and low-noise experience | Orchard season, food provenance, responsible-wildlife guidance, what is and is not guaranteed |
| Out-of-town planner | Confidence from afar | Airport/station routes, verified cab options, booking/payments/cancellation, reviews |

## 5. Guest journey

```text
Instagram / Google / shared link
  -> evocative home page
  -> choose dates + guests
  -> see available rooms, total price, inclusions, policies
  -> book and pay securely (or request booking if owner approval is required)
  -> instant confirmation + WhatsApp/email itinerary
  -> pre-arrival directions, transfer and local guide
  -> stay
  -> review request and optional photo/story permission
```

The mobile site keeps a persistent bottom action bar: `Check availability` and `WhatsApp us`. It must never hide important content or controls.

## 6. Public site map

### Core conversion pages

1. **Home** - full-bleed real video/photo, date-and-guest search, quick proof points, rooms, food, orchard, pool, local experiences, real reviews, map preview, and a direct booking call to action.
2. **Stay at Revan Hills** - the host story, villa, farm, pool, shared spaces, what a day feels like, and a candid “good to know” section.
3. **Rooms and tariffs** - one card/page per room type with actual capacity, bed layout, bathroom, views, photo gallery, accessibility notes, current nightly tariff, inclusions/exclusions, and availability calendar. Do not publish a tariff until it is approved.
4. **Food from the farm** - meal styles, dietary-request process, seasonal produce, dining setting, sample menus only when tagged as examples, advance-order rules, and food pricing/inclusions.
5. **Farm, orchard and seasonal experiences** - mango season status, fruit/plucking availability, flowers/plantation walks, responsible visitor behaviour, and enquiry-only experiences where capacity varies.
6. **Experiences nearby** - curated cards for Girnar, Junagadh heritage, forest experiences, temples, nature, and longer extensions. Each includes practical time required, best season, distance/drive time, external official booking link where relevant, and a source/review date.
7. **Plan your journey** - exact map pin, shareable map link, road directions, parking, railway/airport routes, coach/bus guidance, vetted transfer contacts, self-drive/rental guidance, travel safety, and arrival instructions.
8. **Book your stay** - date search, room selection, guest details, add-ons, price breakdown, policy acknowledgement, payment, confirmation.
9. **Gallery** - fast, curated photo and vertical-video groups: rooms, pool, food, farm/orchard, sunrise/sunset, and real guest moments. No auto-playing audio.
10. **Reviews** - verified-stay reviews first, rating summary, photo reviews where consented, and a visible link to the external Google/Instagram presence if used.
11. **FAQs, Do's & Don'ts, and policies** - a complete, searchable accordion guide for arrivals, electricity/Wi-Fi, cooling, meals, children, pool, sound/parties, pets, medical support, cancellation/refund, responsible-wildlife conduct, privacy, and terms. It should answer both pre-booking questions and on-property questions without making a guest call the hosts for every detail.
12. **Contact** - calling, WhatsApp, Instagram, contact form, directions and hosts. Every channel should have stated response hours.

### Supporting, high-value pages

- **Mango harvest updates** - an editable seasonal landing page for mango availability, box sales/enquiries, and orchard stories. It can be unpublished outside season.
- **Local guide articles** - examples: “Weekend at Revan Hills”, “Girnar for first-time visitors”, “How to book a safari safely”. These bring Google traffic and should cite official sources for regulated activities.
- **Offer/seasonal pages** - only when there is a genuine, dated offer with clear eligibility and expiry.

## 7. Booking and availability model

### Recommended launch model: direct request-to-book with digital payment

The property is new to online operations, so launch with availability that is real-time but owner-confirmed:

1. Guest searches dates and sees rooms that are not blocked.
2. Guest chooses room(s), guests, meal/add-on requests, and sees an honest price breakdown.
3. The system places a short-lived pending hold only after the guest submits details.
4. Owner receives a simple approve/decline screen and WhatsApp/email alert.
5. Once approved, the guest pays a configured deposit or full amount through a reputable Indian payment gateway.
6. Payment success confirms the booking, blocks inventory, sends confirmation, and creates an owner checklist.

This avoids accidental overbooking while the owners learn the workflow. Instant booking can be enabled later, room by room/date range, after the calendar and payment routine are proven.

### Rules the system must support

- Four individual room inventories, not merely “four rooms available”.
- A date grid to block an entire property, one room, or selected rooms; recorded reason optional.
- Seasonal/weekday/weekend/festival tariffs; extra guest and child rules; taxes/fees shown separately.
- Minimum stay, closed-to-arrival, booking lead time, maximum occupancy, blackout dates, and manual overrides.
- Deposits/full payment, payment deadline, cancellation/refund schedule, no-show policy, and manual offline payment record.
- Add-ons: meal plan, transfer request, early check-in/late checkout only after owner approval, and seasonal farm experience.
- Calendar export/sync later with Airbnb/Booking.com iCal if those channels are adopted; one clear source of truth prevents double bookings.

### Booking communication

Guests receive an email and WhatsApp-friendly confirmation page with: booking ID, dates, room, guest count, amount paid/balance, check-in/out, exact map pin, host contact, cancellation terms, and any selected add-ons. Owners receive the same information in a concise operational format.

## 8. CMS and owner operations

### Design principle

The owner area should be a short set of familiar tasks, not a general-purpose admin panel: **Today**, **Bookings**, **Calendar**, **Rooms & prices**, **Photos & videos**, **Food & experiences**, **Local guide**, **Blog**, and **Reviews**. It is a core product requirement, not an optional future add-on: Devang and Renu must be able to do routine public-page updates themselves from a phone.

### Roles

| Role | Can do |
| --- | --- |
| Owner (Devang/Renu) | all property content, calendar, tariffs, bookings, media, review moderation, transfer contacts |
| Staff | view/respond to assigned bookings, mark housekeeping/check-in/check-out; no pricing/payout changes |
| Site administrator | configuration, design/system changes, payment setup, backups, support |

### Owner-friendly safeguards

- Guided forms with examples, photo upload from phone, crop preview, alt-text prompt, and draft/publish buttons.
- A simple `Add new` button for a nearby attraction, rental/transfer contact, gallery item, farm update, or blog post; every form should save as a draft first and show exactly where it will appear on the website.
- An equally simple `Add question` action in the FAQ area: owners enter the guest question and answer, choose a category and optional related page, reorder it, preview the collapsed/expanded card, then publish. They can later edit, unpublish, or archive it without affecting the rest of the FAQ.
- Photo/video upload directly from a phone, automatic size optimisation, selectable cover image, caption, and category. Video posts must have a poster image and a text summary so the public site remains fast on weak mobile networks.
- Small page-detail edits (phone number, tariff note, meal description, FAQ answer, contact-person name) should use labelled fields rather than a fragile free-form page editor.
- Simple language, no developer terminology, large touch targets, Gujarati/Hindi labels or help text if owners prefer.
- “Preview before publish”, scheduled publish/unpublish for seasonal content, and one-click restore of recent versions.
- Confirmation before changing tariffs or blocking dates; activity history showing who changed what.
- Daily availability digest and a manual “call/WhatsApp guest” button from every booking.
- No credentials in shared WhatsApp chats; separate named accounts and password recovery.

### Content collections

| Collection | Owner-maintained fields |
| --- | --- |
| Property | name, address, exact map pin, contacts, check-in/out, shared amenities, house rules |
| Rooms | name, capacity, bed layout, amenities, accessibility notes, photos/video, published status |
| Rate plans | date range, nightly price, inclusions, minimum stay, deposit rule, terms |
| Availability | room/date, open/blocked/held/booked, reason, linked booking |
| Booking | guest contact, dates, room, status, payment, requests, notes, message log |
| Media | file, category, caption, alt text, consent/usage rights, featured flag |
| Food & add-ons | offer, price, availability, dietary notes, lead time |
| Experiences/attractions | description, map pin, distance, source URL, last verified date, publish status |
| Transfer partners | contact person, number, route/vehicle, indicative rate, availability, last verified date |
| Reviews | guest/stay verification, rating, text, media consent, moderation status, owner response |
| FAQ/policies | question, answer, category, optional related page, display order, last reviewed date, draft/published/archived status |
| Blog/farm updates | title, short summary, body, cover image/video, publish date, category, author, related room/experience, draft/published status |

## 9. Trust, safety and review policy

- Public reviews should be moderated and tied to a completed stay or clearly labelled as an external review. Do **not** launch an anonymous public comment system: it attracts spam and gives the owners a moderation job.
- Display both praise and thoughtful owner responses; do not fabricate ratings, guest photos, wildlife sightings, awards, or availability.
- Use real property photos as the booking truth. AI-enhanced brochure art is useful for mood, but should not be used as proof of rooms, views, food, pool, or wildlife.
- Clearly state pool supervision/safety rules, children policy, emergency contacts, and any electricity/Wi-Fi limitations.
- Forest/safari pages must link to the official Gujarat Forest permit site, state that permits/slots/rules can change, and avoid promising lion sightings. Official permit booking is online and operators must not imply unofficial priority access.
- Collect only information needed for a booking; provide privacy, cancellation, refund, terms, and cookie notices before taking payment.

## 9a. FAQ and guest-guide experience

The Q&A is a central trust-building page, not a small footer link. On mobile it uses large, one-question-at-a-time collapse/expand cards (accordion), with a search field and category filters. Only the selected answer opens, so the page remains easy to scan; every answer supports short text, links, image callouts, and an optional `Ask us on WhatsApp` fallback. Important answers also appear contextually: pool rules on the pool page, cancellation rules during checkout, and directions in the booking confirmation.

### Suggested FAQ categories and launch questions

| Category | Questions the site should answer |
| --- | --- |
| Before booking | What makes Revan Hills different? Is it a hotel or hosted farmstay? Can I book the whole property? Is there a minimum stay? What is included in the tariff? What extra charges/taxes apply? |
| Rooms | How many rooms are there? How many guests fit in each room? What are the bed layouts? Do all rooms have attached bathrooms? Is there AC, cooling, hot water, TV, Wi-Fi, power backup, wardrobes, towels, toiletries, or room service? |
| Check-in and access | What are check-in/check-out times? Can I arrive late? What do I do if I am lost? Is parking available? Is the final road suitable for a sedan? Can someone meet us or arrange a pickup? |
| Food | Which meals are available? Is food included? Is it vegetarian? Can dietary needs be accommodated? What advance notice is needed? Can guests use the kitchen or bring outside food? Is alcohol allowed? |
| Pool and shared spaces | Are pool hours/restrictions? Is it supervised? What are child-safety rules? What should guests bring? Are pool towels/changing facilities provided? Is music/party activity permitted? |
| Families, groups and accessibility | Are children welcome? Are extra beds available? Are pets allowed? Are celebrations/day visits allowed? Is the villa suitable for seniors or guests with limited mobility? |
| Farm and seasonal experiences | Can we pluck mangoes? When is the mango season? Can we buy mangoes/produce? Are orchard walks, yoga, stargazing, birding, or farm activities guaranteed or weather/season dependent? |
| Connectivity and comfort | How reliable are Wi-Fi/mobile networks? What happens in a power cut? Is there mobile signal? What clothes should we bring by season? Are mosquitoes/insects part of the rural setting? |
| Safety and emergencies | Where is the nearest hospital/pharmacy? Whom do we call in an emergency? What wildlife should we expect around the property? What should a guest do if they see an animal? |
| Travel and local experiences | How do I get there from Junagadh, railway stations, airports, or nearby cities? Can you arrange a cab? Which rental contacts do you recommend? How do official safari permits work? Which attractions need advance booking? |
| Booking and payment | Which payment methods are accepted? Is a deposit required? When is the balance due? How do I amend dates, cancel, get a refund, or receive an invoice? |
| House rules and respectful travel | Can I smoke? Can I play loud music? Can I bring pets? Can I feed/pick plants or approach wildlife? What are the quiet hours? What should I do with waste? |

### Do's & Don'ts page

Use friendly, positive cards with clear icons and expandable explanations - never a scolding wall of rules. The opening summary should be visible without opening a card; detailed rationale is expandable.

**Do:** respect quiet hours; supervise children near the pool; carry suitable walking footwear, sun protection and a torch; conserve water/electricity; ask before entering farm areas or taking photographs of people; follow host directions and official forest guidance; keep the property and surrounding land clean; report hazards promptly.

**Don't:** play loud music or hold unapproved parties; leave children unattended near water; litter, feed, chase, or approach wildlife; remove fruit, flowers, plants, seeds, or farm produce without permission; light fires, use fireworks, or smoke in prohibited areas; bring unapproved pets; rely on unofficial safari agents or disturb the forest environment.

All rules must be confirmed by the hosts before launch, especially alcohol, pets, outside food, pool access, music, smoking, guest visitors, and farm-entry rules. The owner CMS lets them add/reorder/archive a Q&A or rule, set a category and review date, and preview its collapsed and expanded mobile appearance. New guest questions can be saved privately as a draft and published once the owners agree on the answer.

## 10. Journey and local-guide content standard

The page should lead with the property’s exact Google Maps pin and a copy/share button. It must not use approximate route copy as a substitute for an actual pin.

For each arrival point or attraction, store both **distance** and **typical drive time**, plus `last verified`. Distances should be calculated from the real property pin, not copied from a brochure. Transfer/rental cards need: operator name, contact person, phone/WhatsApp, vehicle type, indicative fare/quote process, operating hours, and verification date. List partners as independent local suggestions unless a formal commercial agreement exists.

Owners can add or edit an attraction, rental contact, or route at any time, but a new item should begin as a draft. The edit screen will prompt for the essentials (title, map link, description, contact/source, and verification date) and show a preview; publishing should require all essential fields. This keeps the guide useful without allowing incomplete or stale recommendations to go live by accident.

Initial attractions to research and verify before launch:

- Girnar Taleti, ropeway and temple routes; give difficulty/time/safety guidance instead of casual promises.
- Junagadh heritage: Mahabat Maqbara, Uparkot Fort and Ashokan inscriptions, each with current opening/closure status.
- Girnar Nature Safari and any appropriate Gir/Devalia experience, linked only to the official Forest Department booking source.
- Sarkhadiya Hanuman Temple only after validating its location, access conditions and seasonal path details.
- Longer optional extensions such as Somnath or Sasan Gir, presented honestly as separate day-trip/overnight planning choices.

## 11. Technical direction and free-first cost policy (decision to confirm before build)

The recommended launch stack is **GitHub + Cloudflare Pages/Workers + Supabase**, with an Indian payment gateway added only when live booking payments are switched on.

| Service | What it does | Launch cost approach |
| --- | --- | --- |
| GitHub | Private source-code history, safe changes, and automated deployment trigger | Free private repository. It is for the site maintainers, not the owner CMS. |
| Cloudflare Pages | Fast, secure public website hosting, SSL, caching, preview deployments | Free plan is sufficient for the initial site. |
| Cloudflare Workers | Small protected server actions such as form/booking helpers | Free tier initially; keep requests and work lightweight. |
| Supabase | Owner logins, content CMS, bookings, availability, FAQs, contacts, and audit data | Free plan initially. It is the operational heart of the owner-managed site. |
| Supabase Storage | Public website images, compressed short videos, and media thumbnails | Strict no-card launch option: keep all optimised media safely below the free 1 GB allowance. |
| Cloudflare R2 | Optional future media library | R2 has a 10 GB free usage allowance but requires an R2 billing subscription/payment method; do not enable it for the no-card launch. |
| Razorpay or equivalent | Secure payment collection after an owner approves a booking | No monthly platform commitment is required, but payment processing fees apply per successful paid booking. |

This is deliberately not a WordPress installation: it avoids plugin maintenance and makes the owner experience purpose-built and simple.

### What “free” can realistically mean

The site, deployment workflow, CMS, login, calendar, FAQs, contact updates, and an image/video gallery can begin at **₹0/month with no card on file** using Cloudflare Pages/Workers Free plus Supabase. A custom domain is not free (it is normally a small annual registration cost), and payment gateways charge transaction fees even with no monthly fee. Supabase's free tier has limited database/file storage and pauses inactive projects, so it is suitable only while the owners keep the compressed public media library below 1 GB and access the project regularly. Cloudflare R2 includes 10 GB/month of standard storage, 1 million write-type operations, 10 million read-type operations, and no egress charge, but it requires enabling an R2 billing subscription/payment method. It is explicitly deferred.

### Zero-cost media rules for launch

- Store web-optimised photographs and short, compressed vertical clips in Supabase Storage; retain original photos/videos in the owners' Google Drive/phone backup, not the website store.
- No autoplaying long videos and no 4K uploads. Every video needs a still cover image and a short text caption.
- Add a visible storage meter in the owner CMS and warn well before the 1 GB free allowance is near its limit.
- When the free media limit is reached, owners can replace/archive older clips or use an external social post link; the site must not silently create a paid storage bill. Cloudflare R2 can be considered only after the owners explicitly approve adding a payment method.

The preferred no-card implementation direction is **Next.js + Supabase + Cloudflare Pages/Workers Free**, with direct uploads optimised for the 1 GB Supabase allowance and Razorpay added only for actual payments. Owner authentication uses email/password with optional OTP. Cloudflare R2 is a later opt-in media-storage upgrade. This combination supports the required calendar, roles, media, bookings, audit history, and owner-friendly custom admin without asking the hosts to manage servers.

Key non-negotiables:

- Responsive images, short compressed videos, lazy loading, low-bandwidth fallback, and an accessible text-first booking path.
- Search-engine-ready public pages, structured lodging/FAQ/review data only where truthful, clean location metadata, sitemap, and measurable enquiry/booking events.
- Daily database backup/export plan, payment webhook verification, least-privilege access, rate limits/captcha for public forms, and monitoring for failed payments/booking messages.
- A staging environment for content training before anything is public.

## 12. Delivery phases

### Phase 0 - content and operations foundation (before design/build)

Confirm name/brand ownership; exact map pin; room-by-room truth sheet; tariff and cancellation policy; meal/add-on details; host response hours; payment recipient and tax/invoice position; pool/children/pet/party rules; social handles; and the shortlist of transfer partners. Sort all media into usable, needs-editing, and do-not-use folders with consent status.

### Phase 1 - compelling information and enquiry launch

Build the public story: Home, Stay, Rooms, Food, Farm, Gallery, Journey, Local Guide, FAQ/policies, Contact, and a WhatsApp-assisted enquiry form. Include basic owner CMS for content, media and enquiry replies. This makes the property credible quickly while tariff and operations are still being settled.

### Phase 2 - managed direct bookings

Add owner login, room inventory, calendar blocking, price rules, request-to-book flow, payment/deposit, confirmations, booking dashboard, and guest review requests. Train both owners using their own phones and run test bookings before accepting live payments.

### Phase 3 - growth and automation

Enable selected instant booking, iCal channel sync, seasonal mango campaign, review collection, local-guide SEO articles, abandoned-enquiry follow-up, availability promotions, and operational reporting. Add multilingual public content only after the English source is stable; Gujarati/Hindi can be useful for owners and domestic guests.

## 13. Acceptance criteria before public launch

- Every public claim has an owner/source and review date; every room image matches the actual room.
- A guest can complete a test booking on a small phone, receives confirmation, and the correct room/date becomes unavailable.
- Owners can independently block a date, change a tariff, replace a photo, answer an enquiry, and find a booking.
- Owners can independently publish an image/video update, write a blog/farm update, edit a rental number, and add a nearby attraction from a phone; draft, preview, publish, and restore are tested during training.
- Owners can add a new FAQ question and answer from a phone, place it in the right category, preview it as an accordion item, publish it, and later edit/archive it; this is included in owner training and launch testing.
- A low-connectivity visitor can read key details and use call/WhatsApp/map links without needing video.
- Booking, payment, refund/cancellation, privacy, review moderation, and failure handling are tested end to end.
- Directions, nearby-place times, external booking links, phone numbers, and transfer contacts are validated from the property pin within the final week before launch.

## 14. Information still required from Devang and Renu

1. Exact Google Maps place link/pin and the official property name spelling (the brochure uses both Revan Hills and Revan Hills Farmstay).
2. Each room’s name, bed configuration, maximum adults/children, actual amenities, and whether all four rooms are currently guest-ready.
3. Current tariffs by room/day, tax treatment, deposit/full-payment choice, refund/cancellation rules, check-in/out, and maximum group/property booking policy.
4. What food is included, available by request, vegetarian/non-vegetarian policy, meal prices, dietary capability, and kitchen/self-service policy.
5. Confirmed amenities and constraints: pool hours/depth/supervision, Wi-Fi reliability, cooling type, power backup, hot water, parking, accessibility, pets, alcohol, music/party rules, smoking, medical/emergency contacts.
6. Booking/WhatsApp phone, email, Instagram/Facebook/Google Business links, desired response hours, and payment account/GST/invoice details.
7. Transfer and rental contacts they personally trust, plus which routes they are willing to coordinate.
8. Months when mangoes, plucking, flowers, vegetables, stargazing, and other experiences are genuinely available.
9. Permission and provenance for every photo/video, especially guest or child images; upload the original media files rather than screenshots where possible.
10. Any existing guest feedback, testimonials, repeat guests, awards/certificates, local registrations, and insurance/safety documentation.

## 15. Immediate next step

Do not begin interface or application development yet. First complete the Phase 0 truth sheet with the owners and turn the available raw photos/videos into a labelled content library. Once the items in Section 14 are answered, freeze the launch scope and create a screen-by-screen content/design brief from this plan.
