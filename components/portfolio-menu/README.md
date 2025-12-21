# Portfolio Menu Component

A flexible navigation menu component for the portfolio website, built with React and TypeScript.

## Features

- **Responsive Design**: Supports horizontal and vertical layouts
- **Active State Detection**: Automatically highlights the current page
- **Icon Support**: Optional icons for each menu item
- **Variants**: Default and minimal styling options
- **Accessibility**: Proper ARIA labels and navigation semantics
- **Customizable**: Support for custom menu items and styling

## Usage

### Basic Usage

```tsx
import { PortfolioMenu } from "@/components/portfolio-menu";

function Navigation() {
  return <PortfolioMenu />;
}
```

### With Custom Props

```tsx
import { PortfolioMenu } from "@/components/portfolio-menu";

function Navigation() {
  return (
    <PortfolioMenu direction="vertical" variant="minimal" showIcons={false} />
  );
}
```

### Using asChild for Flexible Rendering

```tsx
import { PortfolioMenu } from "@/components/portfolio-menu";

function CustomNavigation() {
  return (
    <nav className="my-custom-nav">
      <PortfolioMenu asChild />
    </nav>
  );
}
```

## Props

| Prop        | Type                         | Default            | Description                |
| ----------- | ---------------------------- | ------------------ | -------------------------- |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"`     | Layout direction           |
| `variant`   | `"default" \| "minimal"`     | `"default"`        | Visual styling variant     |
| `showIcons` | `boolean`                    | `true`             | Whether to display icons   |
| `asChild`   | `boolean`                    | `false`            | Render without nav wrapper |
| `items`     | `MenuItem[]`                 | `defaultMenuItems` | Custom menu items          |
| `className` | `string`                     | `undefined`        | Additional CSS classes     |

## Menu Items

The component uses a default set of menu items, but you can provide custom items:

```tsx
const customItems = [
  { title: "Home", href: "/", Icon: Home },
  { title: "About", href: "/about", Icon: User },
  // ... more items
];

<PortfolioMenu items={customItems} />;
```

## Styling

The component uses Tailwind CSS classes and supports custom styling through the `className` prop. It includes:

- Animated underlines on hover
- Active state highlighting
- Icon hover effects
- Responsive design

## Accessibility

- Proper `nav` element with `role="navigation"`
- `aria-current="page"` for active items
- Keyboard navigation support
- Screen reader friendly

## File Structure

```
components/portfolio-menu/
├── index.tsx          # Main component
├── types.ts           # TypeScript interfaces
├── utils.ts           # Utility functions
└── README.md          # This documentation
```
