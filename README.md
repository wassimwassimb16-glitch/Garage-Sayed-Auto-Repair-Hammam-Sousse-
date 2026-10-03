# Hair Style By Oussama – Website & 3D Experience

Production-quality, bilingual (English default, French, and Arabic RTL) cinematic single-page website for **Hair Style By Oussama**, a premier men's barber shop located in the historic medina of Sousse, Tunisia (4 Rue de l'Église).

Designed for international tourists and locals alike with instant WhatsApp & phone booking, real-time shop open/closed status in Tunisia time, and a real-time procedural 3D barber pole and scissors that respond smoothly to scroll.

---

## 1. Business Information
- **Name:** Hair Style By Oussama
- **Type:** Men's barber / hair salon
- **Location:** 4 Rue de l'Église, Sousse 4000, Tunisia (Medina)
- **Phone:** +216 20 524 024 (`tel:+21620524024`)
- **WhatsApp:** Direct booking pre-filled message (`https://wa.me/21620524024?text=...`)
- **Google Rating:** 4.9 / 5 from 116 reviews
- **Hours:** Tuesday to Sunday 08:00 – 18:00 (Africa/Tunis time). Closed Monday.

---

## 2. Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 with custom tokens (`--ink`, `--charcoal`, `--bone`, `--medina`, `--terracotta`, `--brass`, `--mist`)
- **3D Engine:** Three.js via `@react-three/fiber` and `@react-three/drei`
- **Smooth Scroll:** Lenis
- **Fonts:** Fraunces (variable serif), Inter (body), Cairo (Arabic RTL)

---

## 3. How to Customize

### Replacing Photos
1. Place high-resolution photos in `public/images/`:
   - `shop-1.jpg` (featured arch image)
   - `shop-2.jpg` to `shop-6.jpg` (interior, fades, beard trim, tools, medina street)
   - `hero-poster.jpg` (fallback poster for low-end devices or while 3D loads)
   - `og.jpg` (1200x630 social share card)
2. *Note:* Never hotlink Google Maps images directly. Always use photos provided by the owner or royalty-free media.

### Editing Content & Translations
All copy and business information lives in a single, organized file: `src/content.ts`.
- Edit `BUSINESS_INFO` to update phone numbers, links, or address.
- Edit `CONTENT.en`, `CONTENT.fr`, and `CONTENT.ar` to adjust phrasing in any language.

### Swapping the 3D Model
The app includes a procedural 3D barber pole and scissors built from Three.js primitives and canvas textures. If you have a custom 3D model:
1. Export a `.glb` model optimized with Draco or Meshopt.
2. Save it to `public/models/hero.glb`.
3. `HeroModel.tsx` will automatically detect and load it.

---

## 4. Development & Deployment

### Run locally
```bash
npm install
npm run dev
```

### Build for production
```bash
npm run build
```

### Deploy to Vercel / Cloud Run
The repository includes `vercel.json` with SPA routing rules configured. In Vercel, simply connect the GitHub repo and deploy using default Vite settings (`dist` output folder).
