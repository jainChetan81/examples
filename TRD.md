# Technical Requirements Document (TRD)
# Watermarking System

**Document Version:** 1.0  
**Created By:** jainChetanHN (chetan.jain@hackerearth.com)  
**Date:** 2025-09-11  
**Project:** Content Protection Watermarking System

## 1. Overview

This document outlines the technical requirements for a React-based watermarking system designed to prevent unauthorized copying and distribution of sensitive content during assessments or document viewing.

## 2. System Requirements

### 2.1 Functional Requirements

#### 2.1.1 Watermark Generation
- Generate unique watermarks containing user identification, attempt ID, and timestamp
- Support customizable watermark text format: `{userEmail} · {token} · {timestamp}`
- Create short hash tokens using FNV-1a 32-bit algorithm for user tracking

#### 2.1.2 Visual Watermark Implementation
- Apply semi-transparent watermark overlays across entire content area
- Support both light and dark theme color schemes
- Generate SVG-based repeating tile patterns for optimal coverage
- Configurable opacity, font size, angle, and tile dimensions

#### 2.1.3 Anti-Tampering Protection
- Real-time DOM monitoring to detect watermark removal attempts
- Automatic restoration of removed or hidden watermark elements
- Style tampering detection and immediate correction
- Print protection ensuring watermarks appear in printed documents

#### 2.1.4 Security Logging
- Log all tampering attempts with timestamps and user agent information
- Send tamper logs to configurable server endpoint using beacon API
- Include attempt ID for correlation with user sessions

### 2.2 Technical Requirements

#### 2.2.1 Frontend Technology Stack
- React 19 with TypeScript
- Next.js 15 for SSR/SSG capabilities
- TailwindCSS for responsive styling
- Modern browser APIs (MutationObserver, BeaconAPI)

#### 2.2.2 Component Architecture
- `WatermarkedContainer`: Main wrapper component with full-screen coverage
- Configurable props for customization (opacity, colors, dimensions)
- Responsive design with Tailwind utility classes
- Pointer events management for user interaction

#### 2.2.3 Performance Requirements
- Minimal performance impact on content rendering
- Efficient SVG generation and caching
- Optimized DOM monitoring with selective observation
- Print-friendly rendering with color adjustment

### 2.3 Non-Functional Requirements

#### 2.3.1 Security
- Client-side watermark generation to prevent server load
- Tamper-resistant implementation with multiple protection layers
- Secure logging without exposing sensitive user data

#### 2.3.2 Usability
- Transparent integration with existing content
- Non-intrusive visual presence
- Maintained content accessibility and interaction

#### 2.3.3 Compatibility
- Modern browser support (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Print compatibility across different browsers

## 3. Implementation Details

### 3.1 Watermark Persistence Methods

#### Method 1: DOM Mutation Monitoring
```typescript
const mo = new MutationObserver(() => {
  const overExists = !!overlayRef.current?.parentElement;
  if (!overExists) {
    addOverlay();
    logTamper(logUrl, "overlay_removed", attemptId);
  }
});
```

#### Method 2: Style Tampering Detection
```typescript
if (
  o.style.display === "none" ||
  o.style.visibility === "hidden" ||
  o.style.opacity === "0"
) {
  o.style.display = "";
  o.style.visibility = "";
  o.style.opacity = "";
  logTamper(logUrl, "overlay_hidden", attemptId);
}
```

#### Method 3: Print Event Handling
```typescript
const beforePrint = () => addOverlay();
window.addEventListener("beforeprint", beforePrint);
```

#### Method 4: SVG Background Generation
```typescript
const dataUrl = makeSvgDataUrl({
  text: watermark,
  tileW: tile.w,
  tileH: tile.h,
  angle,
  opacity,
  fontSize,
  color,
});
```

### 3.2 Server Integration Points

- Tamper logging endpoint: `/api/watermark/tamper`
- Required payload: `{ts, type, attemptId, ua}`
- Fallback mechanisms for failed beacon requests

### 3.3 Configuration Options

```typescript
interface WatermarkConfig {
  watermark: string;
  drift?: boolean;
  showCenterStamp?: boolean;
  tile?: { w: number; h: number };
  angle?: number;
  opacity?: number;
  fontSize?: number;
  colorLight?: string;
  colorDark?: string;
}
```

## 4. Security Considerations

- Client-side implementation limits effectiveness against determined attackers
- Multiple layers of protection provide reasonable deterrent effect
- Server-side logging enables audit trail for security incidents
- No sensitive data stored in client-side watermark components

## 5. Future Enhancements

- Server-side watermark generation for increased security
- Advanced obfuscation techniques
- Machine learning-based tamper detection
- Integration with DRM systems

---

**Document Status:** Active  
**Review Schedule:** Quarterly  
**Next Review Date:** 2025-12-11