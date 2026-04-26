# Flame & Fork — AR Food Menu

## Project Overview
A mobile-first AR food menu web app. Users browse a categorised restaurant menu, view nutrition info and spice levels per dish, then tap to see the dish as a 3D model — with a native AR "place in your room" button on iOS and Android.

Deployed as a static site on GitHub Pages, accessed via QR code at the table. No build step, no framework, no package manager.

## Tech Stack
- **Vanilla JS ES modules** — no bundler, no framework
- **Google `<model-viewer>` v4.0.0** (CDN) — 3D rendering + WebXR / Scene Viewer / Quick Look AR
- **Google Fonts** (CDN) — Inter (body) + Playfair Display (banner title)
- **Plain CSS** with CSS custom properties (design tokens)

## File Structure
```
index.html              Shell — loads CDN scripts and styles
script.js               App entry point — wires MenuPage ↔ ViewerPage
styles.css              All styling (tokens, layout, components, responsive)
pages/
  MenuPage.js           Menu screen — banner, category slider, item grid
  ViewerPage.js         Viewer screen — model-viewer, overlay, hotspots
components/
  Card.js               Banner, CategorySlider, MenuCard (+ internal helpers)
  Button.js             BackButton, ARButton
models/
  cheeseburger-v1.glb   Exists — wired to "Classic Cheeseburger"
  pizza-v1.glb          Drop here to activate "Pepperoni Pizza" AR
  sushi-v1.glb          Drop here to activate "Sushi Platter" AR
  biryani-v1.glb        Drop here to activate "Biryani Bowl" AR
```

## Design Tokens (key CSS variables)
```css
--color-brand:        #D4531A   /* terracotta — primary CTA */
--color-bg:           #FDF6EE   /* cream — page background */
--color-surface:      #FFFFFF   /* card surface */
--color-text-primary: #1A1008   /* warm black */
--font-body:          Inter, system-ui
--font-display:       Playfair Display  /* banner title only */
```

## Menu Item Data Schema
All menu data lives in `pages/MenuPage.js` in the `menuItems` object.

```js
{
  id: 'cheeseburger',          // stable slug
  name: 'Classic Cheeseburger',
  emoji: '🍔',
  description: '...',
  price: 18.90,                // number — formatted with .toFixed(2)
  hasModel: true,              // true ONLY when .glb file exists in models/
  modelFile: 'models/cheeseburger-v1.glb',  // null when hasModel: false
  category: 'Burgers',
  nutrition: { calories: 620, protein: 34, carbs: 48, fat: 28 },
  spice: 1,                    // 0–5 integer (0 = not spicy)
  allergens: ['Gluten', 'Dairy', 'Egg', 'Sesame'],
  hotspots: [                  // 3D annotation pins (empty array if none)
    { name: 'bun', position: '0.0 0.22 0.05', normal: '0 1 0', label: 'Brioche Bun', detail: 'Baked fresh daily' }
  ]
}
```

## Adding a New Menu Item
1. Add the item object to the relevant category in `menuItems` (`pages/MenuPage.js`)
2. Set `hasModel: false` and `modelFile: null` initially
3. When a `.glb` file is ready, drop it in `models/`, update `hasModel: true` and `modelFile`
4. Optionally add `hotspots` array entries with 3D position/normal coordinates

## Adding a New Category
1. Add `{ label: 'CategoryName', icon: '🍜' }` to the `CATEGORIES` array in `pages/MenuPage.js`
2. Add a matching key in the `menuItems` object

## Local Development
ES modules require a local server (not `file://`):
```bash
python -m http.server 8080
# then open http://localhost:8080
```

## AR Behaviour
- **Android (Chrome):** Scene Viewer AR
- **iOS (Safari):** Quick Look AR (USDZ fallback not yet configured)
- **Desktop:** 3D model only, no AR button shown by model-viewer

## Known Limitations / Next Steps
- Pizza, sushi and biryani `.glb` files still needed from user — once dropped in `models/` the AR buttons activate automatically (no code change needed)
- No USDZ conversion for iOS Quick Look — model-viewer's `quick-look` mode will attempt to use the `.glb` directly; for best iOS AR quality add a `.usdz` companion
- Menu data is hardcoded — phase 2 would move this to a CMS or JSON API (likely with Next.js)
- No analytics or QR tracking yet
