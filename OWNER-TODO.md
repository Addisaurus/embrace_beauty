# Embrace Beauty — Owner To-Do List

Everything marked with `[PLACEHOLDER]` or highlighted in yellow on the site needs your input before going live. This file lists every item, organized by where to make the change.

---

## 1. Business Information (ONE file to edit)

**File:** `src/_data/site.json`

Open this file and replace every `[YOUR ...]` value with your real information:

| Field | What to Put |
|-------|-------------|
| `location.street` | Your street address (e.g., "456 Main Street") |
| `location.suite` | Suite or unit number, or remove if none |
| `location.city` | Your city name |
| `location.state` | Your state abbreviation (e.g., "NH") |
| `location.zip` | Your ZIP code |
| `location.full` | Full address as you'd write it on a letter |
| `phone` | Your business phone number |
| `email` | Your business email address |
| `hours.weekday` | e.g., "9:00 AM - 7:00 PM" |
| `hours.saturday` | e.g., "10:00 AM - 6:00 PM" |
| `hours.sunday` | e.g., "Closed" or your Sunday hours |
| `social.instagram` | Full URL to your Instagram page |
| `social.facebook` | Full URL to your Facebook page |
| `formspree_id` | See "Contact Form Setup" below |
| `google_maps_embed` | See "Google Map" below |

After editing, rebuild the site with `npm run build`. Every page updates automatically.

---

## 2. Contact Form Setup (Formspree)

Your contact form needs a free backend to actually deliver messages:

1. Go to [formspree.io](https://formspree.io) and sign up (free tier = 50 submissions/month)
2. Create a new form
3. Copy the form ID (it looks like `xpzvqkdl`)
4. Paste it into `src/_data/site.json` under `formspree_id`
5. Rebuild with `npm run build`

**Test it:** Submit a test message after deploying. You should receive it in your email.

---

## 3. Google Map

1. Go to [Google Maps](https://maps.google.com) and search your business address
2. Click "Share" > "Embed a map" > Copy the embed URL
3. Paste the URL into `src/_data/site.json` under `google_maps_embed`
4. To actually embed the map, replace the map placeholder `div` in `src/contact.njk` with the `<iframe>` code Google provides

---

## 4. Photography (Critical for Conversion)

This is the single most impactful thing you can do. The site is designed to look its best with real photos.

### What You Need

**Minimum recommended: 12 photos**

| Photo | Where It's Used | Tips |
|-------|----------------|------|
| **Spa interior (wide)** | Homepage hero, Gallery | Warm lighting, clean space, inviting angle |
| **Treatment in progress** | Gallery | Client (with permission) receiving a facial, massage, or nail service |
| **Finished nail set** (2-3) | Gallery | Close-up, good lighting, clean background |
| **Massage room** | Gallery | Show the setup — table, candles, oils, ambiance |
| **Makeup result** | Gallery | Bridal or event look, well-lit |
| **Products on display** | Gallery | Your product line arranged neatly |
| **Before & after** (1-2) | Gallery | Skin treatment, makeup, or brow transformation |
| **Team group photo** | Gallery | All three of you, natural and smiling |
| **Face painting/SFX** | Gallery | Carrie Anne's festival or Spookyworld work |
| **Pedicure station** | Gallery | Your nail/pedi area |
| **Lash & brow result** | Gallery | Close-up of a lash lift or brow lamination |
| **Exterior or signage** | Gallery | Your storefront or sign |

### Photo Specifications
- **Format:** JPEG is fine. WebP is better if you can.
- **Resolution:** At least 1200px wide. For the hero image, 1920px wide is ideal.
- **Aspect ratios:** The gallery is flexible, but most items work best as squares (1:1). The wide slots are 2:1.
- **Lighting:** Natural light or warm artificial light. Avoid harsh fluorescents.
- **Naming:** Use descriptive lowercase filenames with hyphens: `spa-interior.jpg`, `nail-art-gel-set.jpg`

### Where to Place Photos
1. Put all photos in `src/images/`
2. In `src/gallery.njk`, replace each `<div class="image-placeholder">` block with an `<img>` tag
3. In `src/index.njk`, replace the hero placeholder with your best interior/treatment shot
4. Rebuild with `npm run build`

---

## 5. Open Graph Image

For social media sharing (Facebook, iMessage link previews, etc.):

1. Create a 1200x630px image — your logo on a clean background works, or a nice photo with your name overlaid
2. Save it as `src/images/og-default.jpg`
3. Rebuild

---

## 6. Testimonials

On the homepage, there are 3 testimonial placeholders highlighted in yellow.

**Where to find testimonials:**
- Your Google Business reviews
- Your Yelp reviews
- Your Facebook page reviews
- Direct messages/texts from happy clients (ask permission first)

**What to paste:** Replace each `[CLIENT TESTIMONIAL #X]` with the quote text, and each `[Client Name]` with the person's first name (or "— Sarah M." style).

**File:** `src/index.njk` — search for `placeholder-highlight` to find all three spots.

---

## 7. Homepage Welcome Text

The intro paragraph on the homepage is generic. Consider rewriting it to mention:
- Where you're located (city/neighborhood)
- What makes your spa different from others
- The atmosphere or feeling clients can expect
- Anything personal about why you started the business

**File:** `src/index.njk` — look for the `<!-- OWNER: Replace this paragraph -->` comment.

---

## 8. Favicon (Optional Upgrade)

The current favicon is an auto-generated "EB" lettermark. If you have a simplified version of your logo that works at 32x32px, you can replace `src/favicon.ico` with your own.

---

## Quick Reference: How to Build & Deploy

```bash
# Install dependencies (first time only)
npm install

# Build the site (outputs to _site/ folder)
npm run build

# Preview locally during editing
npm run dev
# Then open http://localhost:8080 in your browser

# Deploy: upload the contents of _site/ to your web host
```

---

## Checklist

- [ ] Business info filled in (`src/_data/site.json`)
- [ ] Formspree account created and form ID added
- [ ] Google Map embed added to contact page
- [ ] Hero photo added to homepage
- [ ] Gallery photos added (aim for 8-12 minimum)
- [ ] Open Graph image created (`src/images/og-default.jpg`)
- [ ] 3 testimonials added to homepage
- [ ] Homepage welcome text personalized
- [ ] Social media links verified
- [ ] Test contact form submission
- [ ] Site deployed and tested on mobile
