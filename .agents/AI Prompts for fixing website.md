Yes — a good prompt matters a lot here, especially for AI coding tools. If you just say "fix the counters, the map, and the projects section," the tool will guess at implementation details and likely patch symptoms instead of causes. A prompt that gives context, points at the specific bug, and states clear acceptance criteria gets you a real fix in far fewer iterations.

Here's how I'd split it: one prompt for the two quick bug fixes (counters + map), and a second, meatier prompt for the projects/portfolio system since that's a bigger build, not just a bug fix. Paste these into Claude Code, Cursor, or similar with your project folder open.

**Prompt 1 — Fix the stat counters and the Maps embed**

```
Context: This is a Next.js real estate site (PRIDEWALLS). I need two specific 
bugs fixed. Investigate the actual code before changing anything — don't assume 
implementation details.

BUG 1 — Achievement stat counters render as "0+" / "0M+"
The homepage has an "Our Achievements" section with three animated counters 
(Years of Excellence, Happy Customers, Sq.ft Developed). On initial page load / 
before JS hydration, these show "0+" and "0M+" instead of the real numbers.
- Find the component responsible (likely a count-up/animated-number component).
- Diagnose why the true value only appears after client-side animation runs, 
  rather than being present in the initial server-rendered HTML.
- Fix it so the real number is always in the server-rendered markup (view-source 
  should show the actual value, not 0), and the count-up animation is purely a 
  progressive enhancement on top of that — never the only source of the number.
- This matters for users with JS disabled/slow connections and for search engine 
  crawlers, not just cosmetics.

BUG 2 — Google Maps embed shows the wrong business location
The Contact section embeds a Google Map iframe. The current embed URL resolves 
to a different business name ("Karyahub Solutions") at that pin, not PRIDEWALLS.
- Find the iframe/embed src in the Contact section component.
- Replace it with a correct embed for our actual office address:
  Plot No: 19/B, 4th Floor, Progressive Towers, Jaihind Enclave, 100 Feet Road, 
  Ayyappa Society, Madhapur, Hyderabad – 500081.
- Generate the new embed by searching Google Maps for that exact address (not 
  editing coordinates by guesswork), confirming the pin lands on the correct 
  building, and pulling the official embed code from there.
- After the change, the map preview and the "get directions" link must point to 
  the same, correct place.

Acceptance criteria:
- View page source (not the rendered/hydrated DOM) and confirm real numbers 
  appear in the stats section HTML.
- Click through the map embed and confirm it shows PRIDEWALLS / the correct 
  address, not another business.
- No other sections' behavior should change.
```

**Prompt 2 — Build real project listings + working filters**

```
Context: Next.js real estate site (PRIDEWALLS). The "Projects" section currently 
shows four category tiles (Open Plots, Luxury Villas, Modern Apartments, 
Commercial Spaces), each with a placeholder "1+ Properties" and an "Explore" 
link. There are no real project listings behind any of them, and the 
Ongoing/Upcoming/Completed and property-type filters all render identical 
content — they don't actually filter anything.

Goal: Replace this with a real, working projects system.

1. Data model: Create a structured data source for projects (a local JSON/TS 
   file for now, or a CMS/DB table if one exists in this repo — check first). 
   Each project needs: name, type (plot/villa/apartment/commercial), status 
   (ongoing/upcoming/completed), location, starting price, unit sizes, RERA 
   registration number, a short description, and an array of image paths.

2. Real content: Ask me for the actual project details and photos before 
   inventing any — do not fabricate names, prices, or RERA numbers.

3. Routing: Give the projects list a real, indexable route (e.g., /projects) 
   and each individual project its own route (e.g., /projects/[slug]), not just 
   a homepage anchor with query params. Filters (status, type) should update 
   the URL (e.g., /projects?status=ongoing) AND actually change which projects 
   render — verify this by checking the rendered output differs per filter 
   value, not just that the URL changes.

4. Project detail page: name, location, price range, unit sizes, RERA number, 
   photo gallery, a short enquiry form or CTA tied to that specific project.

5. Empty state: If a filter genuinely has zero projects, show a clear "No 
   projects currently in this category — check back soon or browse other types" 
   message instead of a blank/broken section.

Acceptance criteria:
- /projects?status=ongoing and /projects?status=completed return visibly 
  different project lists in the rendered HTML.
- Each project has its own working URL that loads a real detail page.
- No placeholder text ("1+ Properties", "Explore" with no destination) remains.
```

A couple of notes before you run these:

- These assume you (or whoever's coding) has the actual repo open in the tool — the AI needs to read the real component code, not just the live site, to fix root causes rather than symptoms.
- For Prompt 2, have your real project data (names, prices, RERA numbers, photos) ready to hand over — I deliberately told the AI *not* to invent that data, since fabricated RERA numbers or pricing would be a real legal/trust problem, worse than the current empty state.
- If you want, I can also write the equivalent prompt for the other quick wins from the audit (title tag, alt text, hero image sizing) — just say the word.
---

Two isn't the full set — those covered the two most glaring bugs, but the audit surfaced quite a few more fixable items. Here's the complete list, organized the same way as the roadmap in the report (Quick Wins → High Impact → Major), so you know what order to tackle them in and which ones need your input before an AI coding tool can touch them.

Quick reality check first: some of these need *you* to supply real information (photos, team bios, RERA numbers) before any prompt will produce something honest — I've flagged those so the AI doesn't quietly invent placeholder content again.

---

## Quick Wins — remaining 4 prompts

**Prompt 3 — SEO metadata (title, OG tags, structured data)**

```
Context: Next.js real estate site (PRIDEWALLS). The homepage <title> is 
currently just "PRIDEWALLS" with no location/keyword context, and there's no 
OpenGraph, Twitter Card, or structured data (Schema.org) markup.

1. Update the title tag to something like: 
   "PRIDEWALLS | Premium Villas, Plots & Apartments in Hyderabad"
   (find wherever metadata is defined — likely a metadata export in app/layout 
   or app/page for Next.js App Router — and update it there, not by hardcoding 
   a <title> tag manually).

2. Add OpenGraph tags (og:title, og:description, og:image, og:url) and a 
   Twitter Card (summary_large_image), using a real hero image as og:image.

3. Add Schema.org structured data for a RealEstateAgent/Organization on the 
   homepage (name, address, phone, url), using JSON-LD in a <script 
   type="application/ld+json"> block.

4. If individual project pages exist (see separate projects work), add 
   Product or Residence schema per project with price, location, and 
   availability.

Acceptance criteria:
- View page source and confirm the <title>, OG tags, and JSON-LD block are 
  present in the initial HTML, not injected only client-side.
- Test the homepage URL through a social share debugger (e.g. Facebook 
  Sharing Debugger, Twitter Card Validator) to confirm the preview renders 
  correctly.
- Run the JSON-LD through Google's Rich Results Test to confirm no schema 
  errors.
```

**Prompt 4 — Alt text and accessibility pass**

```
Context: Next.js real estate site. Image alt attributes currently duplicate 
headline text fragments (e.g. a hero image's alt is "Invest In Land With" — 
a chopped headline, not a description of the image) rather than describing 
what's actually in the image. There's also no confirmed keyboard/focus-state 
coverage.

1. Find every <Image>/<img> in the codebase and audit its alt text. Replace 
   any alt text that's just reused headline/heading copy with a real 
   description of the image content (e.g. "Aerial view of landscaped villa 
   community at sunset"). Decorative images only (no informational content) 
   should have alt="".

2. Confirm every form input has a programmatically associated <label> (not 
   just visually adjacent text), and add aria-required to required fields.

3. Add a visible :focus-visible style to all interactive elements (links, 
   buttons, nav dropdown, form fields) if one isn't already present — don't 
   remove default outlines without replacing them.

4. Confirm the header's Projects dropdown is operable via keyboard alone 
   (Tab to open, Enter/Space to select, Escape to close) — many hover-only 
   dropdowns fail this.

5. Add an accessible title attribute to the Google Maps iframe (e.g. 
   title="Map showing PRIDEWALLS office location").

Acceptance criteria:
- Tab through the entire page using only the keyboard and confirm every 
  interactive element is reachable and has a visible focus indicator.
- Run axe DevTools or Lighthouse's accessibility audit and report the 
  before/after score.
```

**Prompt 5 — CTA audit and cleanup**

```
Context: Next.js real estate site. There are multiple CTAs with inconsistent 
labeling ("Explore Projects", "Book Site Visit", "Get In Touch", "GET IN 
TOUCH") and inconsistent capitalization. "Book Site Visit" appears in the hero 
and again in the mid-page CTA band, but I'm not certain it links anywhere 
specific.

1. Find every CTA button/link in the codebase and list what each one 
   currently does (scrolls to an anchor, opens a form, does nothing, etc.) — 
   report this back to me before changing behavior.

2. Standardize CTA copy casing (pick one convention — e.g. Title Case — and 
   apply it everywhere).

3. Make "Book Site Visit" a real, distinct action: either scroll to the 
   contact form with the "Interested In" field pre-selected appropriately, or 
   open a dedicated site-visit scheduling modal/section — confirm with me 
   which behavior is intended before building it.

4. Reduce CTA redundancy: each section should have one clearly primary action; 
   demote repeated secondary CTAs visually (e.g. outline/ghost style) rather 
   than repeating the same filled-button treatment everywhere.

Acceptance criteria:
- Every CTA on the page has a confirmed, working destination or action.
- CTA label casing is consistent site-wide.
```

**Prompt 6 — Image and performance optimization**

```
Context: Next.js real estate site using next/image. Hero background images 
are being requested at widths up to 3840px regardless of the actual rendered 
hero size, and several photos are fetched live from images.unsplash.com 
rather than being self-hosted/optimized. The Google Maps iframe loads 
immediately on page load.

1. Audit every next/image usage for the hero and amenity sections. Add correct 
   `sizes` attributes reflecting actual rendered dimensions at each breakpoint, 
   so mobile devices don't download desktop-sized images.

2. Set explicit width/height (or fill with a sized container) on every image 
   to prevent layout shift.

3. For any image currently pulled live from an external domain 
   (images.unsplash.com), either self-host an optimized copy or confirm 
   next.config's image domains/remotePatterns and caching are configured 
   correctly.

4. Lazy-load the Google Maps iframe (e.g. load only when scrolled into view, 
   or replace with a static map image that loads the real iframe on click) 
   instead of loading it eagerly on initial page load.

5. Run a production build and report bundle size / any obvious unused 
   JS/CSS.

Acceptance criteria:
- Run Lighthouse (mobile) before and after and report the LCP, CLS, and 
  performance score delta.
- Confirm no layout shift occurs as images load.
```

---

## High Impact — 4 prompts (2 need your content first)

**Prompt 7 — Add a real FAQ section**

```
Context: Next.js real estate site. There is currently no FAQ anywhere, which 
means every buyer objection (RERA status, loan tie-ups, documentation, 
possession timeline, booking process) currently has no answer except "call 
us."

1. Build an FAQ section/page using an accordion component (expand/collapse, 
   keyboard-accessible, only one or multiple open at a time — your choice, 
   note which).
2. Use real Q&A content — I'll provide the actual questions and answers 
   (loan process, RERA/documentation, possession timelines, booking process, 
   cancellation policy). Do not invent answers to legal/financial questions.
3. Add FAQPage schema (JSON-LD) so questions can appear as rich results in 
   search.
4. Link to it from the main nav and reference it near the contact form 
   ("Have questions? Check our FAQ first").

Acceptance criteria:
- Accordion is fully keyboard operable and screen-reader friendly (correct 
  aria-expanded state).
- FAQPage schema validates in Google's Rich Results Test.
```
*Note: send over the real Q&A before running this — especially anything about RERA, loans, or documentation, since getting that wrong is a bigger trust problem than not having an FAQ at all.*

**Prompt 8 — Testimonials / social proof section**

```
Context: Next.js real estate site. The site claims "Trusted by thousands of 
families across India" but has zero testimonials, reviews, or third-party 
validation anywhere.

1. Build a testimonials component (carousel or grid — your choice) that 
   displays customer name, photo (optional), project purchased, and quote.
2. Data should come from a structured source (JSON/CMS), not hardcoded 
   inline, so new testimonials can be added without a code change.
3. If we have a real Google Business Profile, add a live or periodically 
   synced Google review count/rating badge near the testimonials section 
   instead of a static claim.
4. Do not populate with placeholder/fake names or quotes — leave the section 
   empty or hidden until real testimonials are provided.

Acceptance criteria:
- Component renders correctly with 1 testimonial and with 10+ (test both 
  ends).
- No fabricated testimonial content ships to production.
```
*Note: this one is genuinely blocked on you gathering real customer quotes/photos (with permission) — worth starting that collection now since it's the audit's single highest-leverage trust fix.*

**Prompt 9 — "How it works" process section**

```
Context: Next.js real estate site. There's no section explaining what happens 
after a visitor submits an enquiry, which leaves first-time buyers unsure 
what to expect.

1. Add a "How It Works" section between the trust-indicators area and the 
   portfolio/projects section, using a horizontal (desktop) / vertical 
   (mobile) step layout.
2. Steps: Enquire → Site Visit → Booking → Documentation & Loan Assistance → 
   Possession (confirm/adjust this sequence with me first — it should match 
   our actual sales process).
3. Each step gets a short label, one-line description, and an icon — reuse 
   the existing icon set/component pattern already used elsewhere on the 
   site for consistency.

Acceptance criteria:
- Section is responsive and matches the existing card/section visual rhythm.
- Copy accurately reflects our real process (confirm with me before writing 
  final copy).
```

**Prompt 10 — Build a real About page with team/leadership**

```
Context: Next.js real estate site. The current "About" is a homepage anchor 
with generic mission copy and no names, faces, or verifiable history — weak 
for a company positioning itself on "legacy" and "trust."

1. Create a dedicated /about route (move beyond the anchor-only section).
2. Add a leadership/team section: name, title, short bio, photo, sourced from 
   real data I provide — do not invent names or titles.
3. Add a real company timeline/milestones section if we have verifiable dates 
   (founding, major project completions, certifications) — again, only real 
   data.
4. Keep the existing mission/values content but move it into this fuller page.
5. Update the nav "About" link to point to /about instead of just the anchor 
   (you can keep a homepage teaser section that links through).

Acceptance criteria:
- /about is a real, indexable route.
- No placeholder names, titles, or dates ship to production.
```
*Note: also blocked on you — needs real leadership names/photos and verifiable founding/milestone dates.*

---

## Major Redesign — bigger scope, handle differently

These aren't one-prompt jobs — they're either decisions I can help you make first, or hosting/content tasks rather than coding tasks:

- **Custom domain (currently `.vercel.app`):** not a coding prompt at all — it's a DNS task. Buy a domain, add it in your Vercel project's Domains settings, and update the DNS records your registrar gives you. Takes minutes, no AI tool needed.
- **Visual identity / design system (color, type):** I'd actually recommend deciding the color palette and type pairing *with me first* (or a designer) before handing it to a coding tool — an AI coding tool will happily pick colors for you, but they'll be as generic as what's there now unless a human makes that call. Want me to help you land on a direction first?
- **Blog/Insights section:** worth its own prompt once you've decided on a CMS approach (MDX files in the repo vs. a headless CMS like Sanity/Contentful) — that's a real architecture decision, not just a build instruction. Happy to write that prompt once you pick one.

---

**Suggested order:** Prompt 1 → 2 (already done) → 3, 4, 5, 6 (all pure code fixes, no content needed from you) → then start gathering real project photos/data, testimonials, and team info in parallel while those run, so Prompts 2's content, 7, 8, and 10 aren't blocked when you're ready for them.