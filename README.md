# WhizAxis Website

A ready-to-upload website for WhizAxis (Odoo ERP services). Plain HTML, CSS and JavaScript — no build step needed.

## Pages
| File | Page |
|---|---|
| index.html | Home |
| services.html | All 8 Odoo services (Consulting, Implementation, Customization, Integration, Migration, Development, Support, Training) |
| ai-solutions.html | AI Solutions for Odoo |
| solutions.html | Industry solutions (Van Sales, Cash & Expense, Fire & Safety / AMC) |
| about.html | About Us |
| contact.html | Contact form + details |
| privacy.html / terms.html | Legal pages (template text) |

## Before you publish — please update
1. **Contact details** — search all `.html` files for these and replace:
   - `info@whizaxis.com`, `sales@whizaxis.com`, `careers@whizaxis.com`
   - `+92 300 0000000` and `+923000000000`
   - `923000000000` (WhatsApp button link)
   - `Your office address, City, Pakistan`
2. **Numbers on the home page** (50+ projects, 10+ industries, 40+ clients, 10+ countries) — these are sample figures. Change them to your real numbers in `index.html` (both the `data-count` value and the text).
3. **Testimonials** — the 3 review cards on the home page are placeholders. Replace with real client reviews, then delete the yellow note.
4. **Social links** — in the footer, replace `href="#"` with your LinkedIn, Facebook, Instagram, YouTube and X links.
5. **Legal pages** — have Privacy Policy and Terms reviewed before going live.

## Contact form
By default, the form opens the visitor's email app with the message filled in.
To receive messages directly (recommended):
1. Create a free form at https://formspree.io
2. Open `assets/js/main.js` and paste your form ID into `FORMSPREE_ID = ""`.
3. Change `TO_EMAIL` to your email.

## Hero background video
The home page hero uses a looping animated background (`assets/video/hero.mp4` + `hero.webm`, poster `assets/img/hero-poster.jpg`). To replace it, overwrite those files keeping the same names — on mobile and for reduced-motion users the poster image is shown automatically.

## Brand colours
Edit the top of `assets/css/style.css` (`:root`) to change colours. Logo files are in `assets/img/`.

## How to upload
Upload the whole folder (keep the `assets` folder next to the HTML files) to any web host — cPanel, Hostinger, Netlify, Vercel or GitHub Pages. `index.html` is the home page.
