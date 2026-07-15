# Reusable UI Components Spec (Elite Design)

This specification defines the exact design behavior, micro-interactions, and visual architecture for the core reusable UI components. All components must adhere to the **Elite UX & Performance Patterns** (`08-ui-wireframes-and-blocks.md` §3), guaranteeing 60fps fluency, instant prefetching, and absolute fluid responsiveness.

---

## 1. Interactive Primitives

### 1.1 Button (`PrimaryCTA`, `SecondaryCTA`, `GhostCTA`)
The primary action trigger across the application.
- **Design:** Fully rounded (`rounded-full`) or subtly rounded (`rounded-lg`) dictated by global theme tokens. Strict minimum touch area: 44x44px.
- **Micro-Interactions (150ms `ease-out`):**
  - *Hover:* Applies a slight brightness filter (`brightness-110`) or background opacity change. Cursor must immediately change to `pointer`.
  - *Active (Click):* Scales down slightly (`transform scale-95`) to provide immediate physical feedback.
  - *Loading:* Text fades out (`opacity-0`) and a `Spinner` component fades in at the exact center. The button width must **not** change during this transition to prevent layout shifts.
- **Variants (managed by `cva`):**
  - `primary`: Solid background, high contrast text.
  - `secondary`: Transparent background, solid border matching primary color.
  - `ghost`: Transparent background, no border. Hover applies a light grey/colored background fill.
  - `danger`: Red background for destructive actions (Delete, Cancel).

### 1.2 TextInput & Textarea
Standard data entry fields.
- **Design:** Standard height (48px for mobile accessibility). 
- **Micro-Interactions (150ms `ease-out`):**
  - *Hover:* Border darkens slightly.
  - *Focus:* A thick, semi-transparent focus ring appears (`ring-2 ring-primary/50`). The transition must smoothly animate the ring expanding outward.
- **States:**
  - *Error:* Border turns red. A shaking animation (`animate-shake` at 300ms) plays once when the error state is triggered.

### 1.3 Badge / Status Pill
Data visualization for statuses and attributes.
- **Design:** Compact, high border radius (`rounded-full`), small bold typography (`text-xs font-bold`).
- **Variants:**
  - `success`: Green background, dark green text.
  - `warning`: Yellow background, dark yellow text.
  - `error`: Red background, dark red text (e.g., "Out of Stock").
  - `info`: Blue background, dark blue text.

---

## 2. Commerce Molecules

### 2.1 ProductCardBlock
The core building block of all product grids and lists.
- **Layout:** Vertical stack. Aspect-square image on top, text details below.
- **Micro-Interactions (Elite Pattern):**
  - *Hover (Card):* The entire card translates up slightly (`-translate-y-1`) with a soft drop shadow (`shadow-lg`). Transition: 200ms `ease-out`.
  - *Hover (Image):* If a secondary image is available, crossfade the primary image to the secondary image on hover.
  - *Prefetching (CRITICAL):* Attaching `onMouseEnter` to the card must immediately trigger a React Query `prefetchQuery` for the PDP data and Next.js `<Link prefetch>`.
- **States:**
  - *Out of Stock:* Image goes greyscale (`grayscale`). An "Out of Stock" `Badge` appears over the image. The CTA button is disabled.

### 2.2 CartItemBlock
The row element representing a product in the slide-out cart.
- **Layout:** Horizontal flex. Thumbnail left, details center, price and quantity stepper right.
- **Micro-Interactions:**
  - *Quantity Update:* Modifying the quantity stepper triggers an **Optimistic UI** update. The subtotal recalculates instantly in the DOM while the API request happens in the background.
  - *Remove:* Clicking remove triggers a smooth exit animation (sliding left and fading out) before removing the DOM node.

### 2.3 NavigationLinkBlock
Global routing triggers (Header, Footer, Sidebar).
- **Design:** Clean typography relying on font weight and color for hierarchy.
- **Micro-Interactions:**
  - *Hover:* An underline animates in from left to right, or text color smoothly shifts to the primary theme color.
  - *Prefetching (CRITICAL):* Must rigorously employ hover-based prefetching for zero-latency page transitions.

---

## 3. UI Technical Architecture

To enforce these elite visual standards, components must be constructed using the following technical stack:

1. **`cva` (Class Variance Authority):** All variant logic (primary vs secondary, small vs large) must be typed and mapped using `cva()`. Do not use messy ternary strings.
2. **`tailwind-merge` & `clsx`:** Exported as a `cn()` utility. This ensures that if a parent passes a custom className (e.g., `className="mt-4"`), it cleanly overrides the component's default margins without CSS collision.
3. **Framer Motion:** For complex entry/exit animations (like the Cart Drawer sliding in or Modals popping up) that require unmounting from the DOM.
4. **Radix UI Primitives:** For complex interactive components (Select, Dialog, Accordion), use unstyled Radix UI primitives as the base to guarantee perfect keyboard navigation and ARIA accessibility, styled with our Tailwind tokens.
