# Mama Poote - Design & Functionality Consistency Guide

## Overview

This document outlines the design standards, color scheme, and functional patterns used throughout the Mama Poote application to ensure consistency across all pages.

---

## Color Scheme (Theme Variables)

### Light Mode (Default)

```css
--background: oklch(1 0 0)           /* White */
--foreground: oklch(0.145 0 0)       /* Dark gray/black */
--accent: oklch(0.97 0 0)            /* Light gray */
--primary: oklch(0.205 0 0)          /* Dark */
--secondary: oklch(0.97 0 0)         /* Light */
--muted-foreground: oklch(0.556 0 0) /* Medium gray */
--destructive: oklch(0.577 0.245 27.325) /* Red/Orange */
```

### Dark Mode

```css
--background: oklch(0.145 0 0)       /* Dark */
--foreground: oklch(0.985 0 0)       /* White */
--accent: oklch(0.269 0 0)           /* Dark gray */
--primary: oklch(0.985 0 0)          /* White */
--secondary: oklch(0.269 0 0)        /* Dark gray */
--muted-foreground: oklch(0.708 0 0) /* Light gray */
--destructive: oklch(0.396 0.141 25.723) /* Red */
```

---

## Typography & Spacing

### Heading Hierarchy

- **h1**: `text-3xl font-bold` - Page titles
- **h2**: `text-2xl font-semibold` - Section headers
- **h3**: `text-lg font-semibold` - Card headers
- **Body**: `text-base` / `text-sm` - Content

### Spacing Scale

- **xs**: `px-2` / `py-1`
- **sm**: `px-4` / `py-2`
- **md**: `px-6` / `py-4`
- **lg**: `px-8` / `py-8`
- **Container padding**: `px-4 sm:px-6 lg:px-8`

---

## Component Patterns

### Buttons

```tsx
// Primary Action
<Button size="lg" variant="default">
  Action
</Button>

// Secondary Action
<Button size="lg" variant="outline">
  Alternative
</Button>

// Icon Button
<Button variant="ghost" size="icon">
  <IconName className="h-5 w-5" />
</Button>

// Destructive Action
<Button variant="outline" className="text-destructive hover:text-destructive">
  Delete
</Button>
```

### Color Usage for Text

- **Visible prices/amounts**: `text-foreground` ✅ (NOT `text-accent`)
- **Muted text/labels**: `text-muted-foreground`
- **Important emphasis**: `text-foreground font-semibold`
- **Error/alerts**: `text-destructive`

### Grid Layouts

All responsive grids should follow this pattern:

```tsx
{
  /* Mobile-first, stacked layout */
}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>;
```

**Breakpoints:**

- Mobile (default): Single column
- Tablet (md: 768px): 2 columns
- Desktop (lg: 1024px): 3+ columns

### Navigation Headers

All pages should have consistent header structure:

```tsx
<div className="flex items-center justify-between">
  {/* Back button (left) */}
  <Button variant="ghost" size="icon" onClick={() => router.back()}>
    <ArrowLeft className="h-5 w-5" />
  </Button>

  {/* Title (center) */}
  <h1 className="text-3xl font-bold text-foreground">Title</h1>

  {/* Action button (right) */}
  <Button variant="ghost" size="icon" asChild>
    <Link href="/home">
      <Home className="h-5 w-5" />
    </Link>
  </Button>
</div>
```

---

## Page Structure

### Empty States

When showing empty states (no cart items, no orders, etc.):

```tsx
<div className="min-h-screen bg-background">
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="text-center space-y-6 py-16">
      <Icon className="h-24 w-24 text-muted-foreground mx-auto" />
      <h1 className="text-3xl font-bold text-foreground">Title</h1>
      <p className="text-muted-foreground text-lg">Description</p>

      {/* Call-to-action buttons in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
        <Button size="lg" variant="default">
          Primary
        </Button>
        <Button size="lg" variant="outline">
          Secondary
        </Button>
      </div>
    </div>
  </div>
</div>
```

### Main Content Layout

```tsx
<div className="min-h-screen bg-background">
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="space-y-8">
      {/* Header with navigation */}

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">Primary Content</div>
        <div className="lg:col-span-1">Sidebar</div>
      </div>
    </div>
  </div>
</div>
```

---

## Recent Updates

### Cart Page (`/app/cart/page.tsx`)

✅ **Price Visibility Fixed**

- Changed item prices from `text-accent` → `text-foreground`
- Changed total price from `text-accent` → `text-foreground`
- Reason: `text-accent` renders as light gray, nearly invisible on light backgrounds

✅ **Navigation Improvements**

- Added back button (left) - uses `router.back()`
- Added home button (right) - links to `/`
- Centered page title for better UX

✅ **Code Comments Added**

- Function descriptions for `handleQuantityChange()`, `canProceedToCheckout()`, `handleCheckout()`
- Section labels for empty cart vs. filled cart states
- Component section comments for better code navigation

---

## Design Consistency Checklist

When creating or modifying pages:

### ✓ Structure

- [ ] Page has consistent max-width container (`max-w-4xl` or `max-w-7xl`)
- [ ] Proper padding applied (`px-4 sm:px-6 lg:px-8`)
- [ ] Responsive grid layout used (mobile-first approach)
- [ ] Header section with navigation

### ✓ Colors

- [ ] Prices and important values use `text-foreground`
- [ ] Secondary/muted text uses `text-muted-foreground`
- [ ] Errors use `text-destructive`
- [ ] No hardcoded color values (use theme variables)

### ✓ Typography

- [ ] Appropriate heading levels (h1, h2, h3)
- [ ] Font sizes scale with breakpoints
- [ ] Font weights used appropriately (bold, semibold, regular)

### ✓ Components

- [ ] Buttons use variant system (`default`, `outline`, `ghost`)
- [ ] Icons are properly sized (`h-4 w-4`, `h-5 w-5`, etc.)
- [ ] Cards/sections have proper spacing
- [ ] Badges used for status/tags

### ✓ Functionality

- [ ] Navigation buttons functional (back, home links)
- [ ] Forms validated before submission
- [ ] Error/success states clearly indicated
- [ ] Loading states shown for async operations
- [ ] Confirmation dialogs for destructive actions

### ✓ Responsiveness

- [ ] Single column on mobile (grid-cols-1)
- [ ] 2 columns on tablet (md:grid-cols-2)
- [ ] 3+ columns on desktop (lg:grid-cols-3+)
- [ ] No horizontal scroll on mobile
- [ ] Touch targets at least 44x44px

---

## Icon Usage

### Standard Icon Sizes

```tsx
// Navigation/Header buttons
<Icon className="h-5 w-5" />

// List items/Content
<Icon className="h-4 w-4" /> or <Icon className="h-5 w-5" />

// Hero/Large sections
<Icon className="h-24 w-24" /> or <Icon className="h-16 w-16" />
```

### Common Icons by Context

- **Navigation**: `ArrowLeft`, `Home`, `ChevronLeft`, `ChevronRight`
- **Actions**: `ShoppingCart`, `Trash2`, `Edit`, `Save`
- **Status**: `Clock`, `CheckCircle`, `AlertCircle`, `Heart`
- **Empty States**: `ShoppingBag`, `Search`, `Package`

---

## API & Context Integration

### Cart Context

```tsx
const { items, total, updateQuantity, removeItem, clearCart, addItem } =
  useCart();
```

### Auth Context

```tsx
const { user, signIn, signUp, signOut, updateProfile } = useAuth();
```

### Routing

```tsx
const router = useRouter();
router.push("/path"); // Navigate to path
router.back(); // Go to previous page
```

---

## Testing & Validation

### Color Contrast

- Ensure text-foreground has sufficient contrast on background
- Use browser DevTools to verify WCAG AA compliance
- Test in both light and dark modes

### Responsive Design

- Test on mobile (375px), tablet (768px), desktop (1024px+)
- Verify no layout shifts or overflow
- Check all buttons/interactive elements on touch devices

### Functionality

- Empty states work correctly
- Quantity changes reflected in cart total
- Navigation buttons functional
- Form submissions validated

---

## File Structure Reference

```
app/
├── page.tsx                    # Home page
├── cart/page.tsx              # Shopping cart ✅ Updated
├── menu/page.tsx              # Menu browsing
├── checkout/page.tsx          # Payment
├── profile/page.tsx           # User profile
├── orders/page.tsx            # Order history
├── auth/
│   ├── signin/page.tsx       # Login
│   └── signup/page.tsx       # Registration
├── about/page.tsx             # About page
├── contact/page.tsx           # Contact form
└── meal/[id]/page.tsx        # Meal details

components/
├── ui/                        # shadcn/ui components
├── AddToCartModal.tsx
├── CheckoutModal.tsx
├── SoupCustomizationModal.tsx
└── UserProfileDropdown.tsx

lib/
├── meals.ts                   # Menu data
└── utils.ts                   # Helper functions

contexts/
├── AuthContext.tsx            # User authentication
└── CartContext.tsx            # Shopping cart state
```

---

## Future Enhancements

1. **Dark Mode Toggle** - Add theme switcher component
2. **Loading Skeletons** - Improve UX during data fetching
3. **Animation Library** - Consistent page transitions
4. **Accessibility** - ARIA labels, keyboard navigation
5. **Mobile Menu** - Hamburger menu for better mobile UX

---

## Notes

- Always test changes across light/dark modes
- Use theme variables for colors (never hardcode hex values)
- Keep components functional and reusable
- Maintain consistent spacing and typography
- Document complex logic with inline comments
