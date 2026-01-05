# TSUKO DESIGN SYSTEM
> **Philosophy:** "Mutluluk Veren Nesneler" (Objects that Spark Joy)

## 1. Core Identity
Tsuko is not just an e-commerce site; it is a **digital playground**. It rejects minimalism and sterility in favor of energy, boldness, and tactile interaction. It bridges the gap between **Neo-Brutalism** and **Dopamine Decor**.

**Key Traits:**
- **Energetic & Playful:** Smiles over seriousness.
- **Tactile:** "I can touch this."
- **Premium:** Fun does not mean amateur.

---

## 2. Color System (Happy Palette)
Colors are purposeful triggers for emotion.

### 🧱 Foundations
- **Canvas (Background):** `var(--color-sand)` `#EBDAC2`
  - *Never use pure white #FFFFFF for main backgrounds.*
  - *Evokes warmth, retro vibes, and natural texture.*
- **Text & Borders (Structure):** `var(--color-charcoal)` `#2D2D2D` or `Black` `#000000`
  - *High contrast, readable, defining.*

### 🎨 Accents (Dopamine Triggers)
- **🟣 Purple (Creativity):** `var(--color-purple)`
  - *Brand signature, headers, creative highlights.*
- **🟡 Yellow (Action):** `var(--color-yellow)`
  - *CTAs, warnings, "Look here!" moments.*
- **💖 Pink (Love):** `var(--color-pink)`
  - *Favorites, likes, playful badges.*
- **🔵 Blue & 🟢 Green (Balance):** `var(--color-blue)`, `var(--color-green)`
  - *Trust, nature, stability.*

---

## 3. Form & Shape (Chunky UI)
Tsuko avoids "thin" and "delicate". Everything feels substantial.

- **Borders:** `border-2` (Small elements) to `border-4` (Cards/Modals).
  - *Always Solid Black.*
- **Radius:** `rounded-xl` to `rounded-[2.5rem]`.
  - *Friendly curves, no sharp spikes (unless intentional).*
- **Structure:** Card-based. Elements sit "on stage", separated by distinct boundaries.

---

## 4. Depth & Shadows (Tactile Feel)
No soft blurs. Shadows represent physical layering.

**The "Hard Shadow" Rule:**
- **Static:** `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- **Hover (Lift):** `shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]` + `translate(-2px, -2px)` (Visual Lift)
- **Active (Press):** `shadow-none` + `translate(4px, 4px)` (Physical Press)

---

## 5. Typography
**Headlines:**
- **Font:** Sans-serif (Syne / Inter), Heavy weights.
- **Style:** `font-black`, `uppercase`, `tracking-tighter` (Compact) or `tracking-widest` (Airy).
- **Stroke:** Optional `WebkitTextStroke` for brutalist headers.

**Body:**
- **Font:** Readable Sans.
- **Weight:** `font-medium` or `font-bold` preferred over Light.
- **Color:** Black/Charcoal. No light grays.

---

## 6. Interaction Philosophy
**"Everything is an Object."**

1.  **Lift & Press:** Buttons aren't digital rectangles; they are physical keys.
2.  **Micro-interactions:**
    - Icons rotate on hover.
    - Badges wiggle.
    - Marquees scroll.
3.  **Consistency:** An interaction learned on the Homepage must work the same on the Checkout.

---

## 7. Component Guidelines

### Buttons (The "Play" Keys)
- **Base:** Bright Color (Yellow/Pink/Green) + Black Text + 2px/4px Border.
- **Hover:** Lifts up + Shadow grows.
- **Click:** Smashes down + Shadow disappears.

### Product Cards (The "Showcase")
- **Frame:** Pop-art framing.
- **Image:** High quality, isolated or lifestyle.
- **Badges:** Rotated "Sticker" look.
- **Price:** Bold, highlighted.

### Admin Panel
- **Tone:** Professional but consistent.
- **Colors:** Uses `alabaster` and white more freely for data density, but retains the chunky borders and "Sand" backdrop for layout.

---

## 8. Do's & Don'ts
| DO ✅ | DON'T ❌ |
| :--- | :--- |
| Use `bg-[var(--color-sand)]` for pages | Use pure white `#fff` backgrounds |
| Use Hard Black Shadows | Use Blur/Drop Shadows |
| Make borders `2px` or `4px` | Make borders `1px` or thin gray |
| Make buttons feel "clickable" | Use flat, ghost buttons |
| Use "Fun" copy (Mağaza, Atölye) | Use corporate copy (Ürünler, Hakkımızda) |

---
*Maintained by: Tsuko Design Lead*
