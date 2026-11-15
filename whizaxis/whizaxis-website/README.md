# WhizAxis Website

A ready-to-upload website for WhizAxis — *Intelligence Behind Better Business.* ERP Consulting | Business Transformation | AI & Automation. Plain HTML, CSS and JavaScript — no build step needed.

## Pages
| File | Page |
|---|---|
| index.html | Home |
| services.html | All 8 Odoo services (Consulting, Implementation, Customization, Integration, Migration, Development, Support, Training) |
| ai-solutions.html | AI & Automation |
| solutions.html | Industry solutions (Van Sales, Cash & Expense, Fire & Safety / AMC) |
| about.html | About Us |
| contact.html | Contact form + details |
| privacy.html / terms.html | Legal pages (template text) |

## Before you publish — please update
1. **Contact details** — the site now shows only `info@whizaxis.com` (top bar, footer, contact sections and contact form).
   Phone, WhatsApp button, careers email and office address were removed. Add them back only when you have real ones.
2. **Numbers on the home page** (50+ projects, 10+ industries, 40+ clients, 10+ countries) — these are sample figures. Change them to your real numbers in `index.html` (both the `data-count` value and the text).
3. **Testimonials** — the 3 review cards on the home page are placeholders. Replace with real client reviews, then delete the yellow note.
4. **Social links** — in the footer, replace `href="#"` with your LinkedIn, Facebook, Instagram, YouTube and X links.
5. **Legal pages** — have Privacy Policy and Terms reviewed before going live.
6. **Brand checks** — before investing heavily in the brand, confirm WhizAxis trademark availability in your target markets, company-name registration, and that you own the domain. A distinctive name is not automatically a legally available trademark.
7. **Measurable outcomes** — the site now promises measurable results. Once you have them, add real client results (e.g. "month-end close cut from 10 days to 3") to the stats and testimonials.

## Contact form
By default, the form opens the visitor's email app with the message filled in.
To receive messages directly (recommended):
1. Create a free form at https://formspree.io
2. Open `assets/js/main.js` and paste your form ID into `FORMSPREE_ID = ""`.
3. Change `TO_EMAIL` to your email.

## Home hero animations (assets/js/hero.js)
- **Headline:** "Complexity" scrambles once, then the last line types and rotates. Change the phrases in `index.html` → `data-words="Operational Excellence.|Connected Operations.|Smarter Decisions.|Measurable Growth."` (separate with `|`). Keep only one phrase to stop rotation.
- **Orbit graphic:** scattered tools (complexity) → one connected system (transformation) → AI moving work between CRM, Sales, MRP, Inventory, Accounting and HR (automation). The top pill highlights the matching stage. Edit the department text with `data-status` / `data-event` on each `.onode` in `index.html`.
- Animations pause when scrolled off-screen, and show a still picture for visitors who turn off motion on their device.

## App icons (assets/img/apps)
The Odoo app icons on the home page (hero circle + "Every Department, Connected") are separate files:
`sales, crm, accounting, inventory, purchase, manufacturing, hr, pos, ecommerce, projects` (.svg).
To use different icons, replace a file with one of the same name. If you use a .png, change the file name in `index.html` too.
Only use Odoo's official icons if you have the right to (check Odoo's brand / partner rules).

## Hero size
On laptops and desktops the home banner is exactly one screen tall at 100% zoom (the circle shrinks or grows with screen height).

## Hero background video
The home page hero uses a looping animated background (`assets/video/hero.mp4` + `hero.webm`, poster `assets/img/hero-poster.jpg`). To replace it, overwrite those files keeping the same names — the video plays on desktop and mobile; visitors who turn off motion in their device settings see the poster image instead.

## Brand colours
Edit the top of `assets/css/style.css` (`:root`) to change colours. Logo files are in `assets/img/`.

## How to upload
Upload the whole folder (keep the `assets` folder next to the HTML files) to any web host — cPanel, Hostinger, Netlify, Vercel or GitHub Pages. `index.html` is the home page.
