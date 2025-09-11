# Watermarking System

A React-based content protection system that applies semi-transparent watermarks to prevent unauthorized copying and distribution of sensitive content.

## Features

- **Full-screen watermark coverage** with fixed positioning
- **Anti-tampering protection** using DOM monitoring
- **Theme-aware styling** supporting light/dark modes
- **Print protection** ensuring watermarks appear in printed documents
- **Tamper logging** to track removal attempts
- **Responsive design** using TailwindCSS

## Quick Start

```tsx
import { WatermarkedContainer, shortToken } from './watermarking';

function ProtectedContent() {
  const userEmail = "user@example.com";
  const attemptId = "attempt-123";
  const token = shortToken(userEmail + "|" + attemptId);
  const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  
  const watermark = `${userEmail} · ${token} · ${timestamp}`;

  return (
    <WatermarkedContainer
      watermark={watermark}
      attemptId={attemptId}
      logUrl="/api/watermark/tamper"
      className="min-h-screen w-full fixed inset-0 pointer-events-none"
    >
      <div className="p-16 max-w-4xl mx-auto pointer-events-auto">
        {/* Your protected content here */}
      </div>
    </WatermarkedContainer>
  );
}
```

## Component Props

### WatermarkedContainer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `watermark` | `string` | - | The text to display in watermark |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |
| `drift` | `boolean` | `false` | Enable drift animation (disabled for performance) |
| `showCenterStamp` | `boolean` | `false` | Show large center watermark |
| `tile` | `{w: number, h: number}` | `{w: 320, h: 220}` | Tile size in pixels |
| `angle` | `number` | `-30` | Rotation angle in degrees |
| `opacity` | `number` | `0.16` | Watermark opacity (0-1) |
| `fontSize` | `number` | `18` | Font size in pixels |
| `colorLight` | `string` | `"rgba(0,0,0,1)"` | Color for light theme |
| `colorDark` | `string` | `"rgba(255,255,255,1)"` | Color for dark theme |
| `logUrl` | `string` | `"/api/wm/tamper"` | Endpoint for tamper logging |
| `attemptId` | `string` | - | Unique identifier for session |

## Security Features

### Anti-Tampering Mechanisms

1. **DOM Monitoring**: Uses MutationObserver to detect watermark removal
2. **Style Protection**: Prevents hiding via CSS display/visibility/opacity
3. **Print Protection**: Re-applies watermarks before printing
4. **Automatic Restoration**: Immediately restores tampered watermarks

### Tamper Logging

The system logs tampering attempts to your server endpoint:

```typescript
// Payload sent to logUrl
{
  ts: number;        // Timestamp
  type: string;      // "overlay_removed" | "overlay_hidden"
  attemptId: string; // Session identifier
  ua: string;        // User agent
}
```

## Server Integration

Implement a tamper logging endpoint to receive notifications:

```typescript
// Example API route
export async function POST(request: Request) {
  const { ts, type, attemptId, ua } = await request.json();
  
  // Log the tamper attempt
  console.log(`Tamper detected: ${type} for ${attemptId} at ${ts}`);
  
  // Store in database, send alerts, etc.
  
  return new Response('OK');
}
```

## Styling with TailwindCSS

The component is designed to work seamlessly with TailwindCSS:

```tsx
<WatermarkedContainer
  watermark="Protected Content"
  className="min-h-screen w-full fixed inset-0 pointer-events-none"
>
  <div className="pointer-events-auto p-8 bg-white dark:bg-gray-900">
    {/* Interactive content */}
  </div>
</WatermarkedContainer>
```

## Utility Functions

### `shortToken(input: string, len?: number): string`

Generates a short hash token using FNV-1a algorithm:

```typescript
const token = shortToken("user@example.com|attempt-123", 6);
// Returns: "A1B2C3"
```

## Browser Compatibility

- Chrome 58+
- Firefox 55+  
- Safari 11+
- Edge 79+

## Security Considerations

- **Client-side limitation**: Determined attackers can bypass client-side protection
- **Deterrent effect**: Multiple protection layers provide reasonable deterrent
- **Audit trail**: Server logging enables security incident tracking
- **No sensitive data**: Watermark components don't store secrets

## Performance Notes

- Minimal rendering impact with optimized SVG generation
- Efficient DOM monitoring with selective observation
- Static watermarks (no animation) for better performance
- Print-friendly with exact color adjustment

---

**Author**: jainChetanHN (chetan.jain@hackerearth.com)  
**Version**: 1.0  
**Last Updated**: 2025-09-11