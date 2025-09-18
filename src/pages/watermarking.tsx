import React from "react";


export default function Example() {
  const userEmail = "jane.doe@example.com";
  const attemptId = "attempt-7c028163-4e6b";
  const token = shortToken(userEmail + "|" + attemptId);
  const when = new Date().toISOString().slice(0, 16).replace("T", " ");

  const watermark = `${userEmail} · ${token} · ${when}`;

  return (
    <WatermarkedContainer
      watermark={watermark}
      showCenterStamp={false}
      attemptId={attemptId}
      className="min-h-screen w-full fixed inset-0 pointer-events-none"
    >
      <div className="p-16 max-w-4xl mx-auto pointer-events-auto">
        <h1 className="text-3xl font-bold mb-6">Two Sum</h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Given an array of integers nums and an integer target, return indices of
          the two numbers such that they add up to target.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm text-gray-800 dark:text-gray-200">{`function twoSum(nums, target) { /* ... */ }`}</code>
        </pre>
      </div>
    </WatermarkedContainer>
  );
}
// Watermark.tsx
import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { CSSProperties, ReactNode } from "react";

type WatermarkedContainerProps = {
  children: ReactNode;
  watermark?: string; // e.g., "user@acme.com · A1B2C3 · 2025-09-11 12:00"
  userEmail?: string; // User's email address
  userCompany?: string; // User's company name
  className?: string;
  style?: CSSProperties;
  showCenterStamp?: boolean; // bold, large center mark
  tile?: { w: number; h: number }; // px tile size
  angle?: number; // degrees
  opacity?: number; // 0..1, actual text alpha inside SVG
  fontSize?: number; // px
  color?: string; // watermark color
  attemptId?: string; // passed to tamper logs
};

export function WatermarkedContainer({
  children,
  watermark,
  userEmail,
  userCompany,
  className,
  style,
  showCenterStamp = false,
  tile = { w: 320, h: 220 },
  angle = -30,
  opacity = 0.16,
  fontSize = 18,
  color = "rgba(0,0,0,1)",
  attemptId,
}: WatermarkedContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);



  // Validate that we have either userEmail or userCompany
  const hasValidIdentifier = userEmail || userCompany;

  // Generate watermark text if not provided
  const finalWatermark = watermark || (hasValidIdentifier
    ? `${userEmail || userCompany} · ${attemptId || 'N/A'} · ${new Date().toISOString().slice(0, 16).replace("T", " ")}`
    : '');

  useEffect(() => {
    ensureGlobalStyles();
  }, []);

  const dataUrl = useMemo(
    () =>
      makeSvgDataUrl({
        text: finalWatermark,
        tileW: tile.w,
        tileH: tile.h,
        angle,
        opacity,
        fontSize,
        color,
      }),
    [finalWatermark, tile.w, tile.h, angle, opacity, fontSize, color]
  );

  // Create basic watermark overlay
  useEffect(() => {
    const el = containerRef.current;
    if (!el || (!hasValidIdentifier && !watermark)) return;

    // Create watermark overlay
    let over = overlayRef.current;
    if (!over) {
      over = document.createElement("div");
      overlayRef.current = over;
      over.className = "wm-layer";
      over.setAttribute("aria-hidden", "true");
      over.dataset.role = "watermark";
      Object.assign(over.style, {
        position: "absolute",
        inset: "0",
        zIndex: "1",
        pointerEvents: "none",
        backgroundRepeat: "repeat",
        backgroundSize: `${tile.w}px ${tile.h}px`,
        backgroundImage: `url("${dataUrl}")`,
        mixBlendMode: "multiply",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      });
    }
    if (!over.parentElement) el.appendChild(over);

    // Create center stamp if enabled
    if (showCenterStamp) {
      let center = centerRef.current;
      if (!center) {
        center = document.createElement("div");
        centerRef.current = center;
        center.className = "wm-center-stamp";
        center.setAttribute("aria-hidden", "true");
        Object.assign(center.style, {
          position: "absolute",
          inset: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: "2",
          transform: `rotate(${angle}deg)`,
          fontFamily: "system-ui, sans-serif",
          fontWeight: "600",
          fontSize: "42px",
          opacity: String(Math.min(opacity * 1.8, 0.35)),
          color: color,
          textAlign: "center",
          whiteSpace: "pre-line",
        });
        center.textContent = finalWatermark;
      }
      if (!center.parentElement) el.appendChild(center);
    }

    return () => {
      // Cleanup on unmount
      overlayRef.current?.remove();
      centerRef.current?.remove();
    };
  }, [dataUrl, tile.w, tile.h, angle, opacity, fontSize, color, showCenterStamp, finalWatermark, hasValidIdentifier, watermark]);

  // Proactive watermark enforcement - removes and recreates every 2 seconds
  useEffect(() => {
    const el = containerRef.current;
    if (!el || (!hasValidIdentifier && !watermark)) return;

    const applyCriticalStyles = (element: HTMLElement, isOverlay: boolean) => {
      if (isOverlay) {
        // Overlay styles
        element.style.setProperty('position', 'absolute', 'important');
        element.style.setProperty('inset', '0', 'important');
        element.style.setProperty('z-index', '1', 'important');
        element.style.setProperty('pointer-events', 'none', 'important');
        element.style.setProperty('background-repeat', 'repeat', 'important');
        element.style.setProperty('background-size', `${tile.w}px ${tile.h}px`, 'important');
        element.style.setProperty('background-image', `url("${dataUrl}")`, 'important');
        element.style.setProperty('mix-blend-mode', 'multiply', 'important');
        element.style.setProperty('display', 'block', 'important');
        element.style.setProperty('visibility', 'visible', 'important');
        element.style.setProperty('opacity', '1', 'important');
        element.style.setProperty('width', '100%', 'important');
        element.style.setProperty('height', '100%', 'important');
        element.style.setProperty('-webkit-print-color-adjust', 'exact', 'important');
        element.style.setProperty('print-color-adjust', 'exact', 'important');
      } else {
        // Center stamp styles
        element.style.setProperty('position', 'absolute', 'important');
        element.style.setProperty('inset', '0', 'important');
        element.style.setProperty('display', 'flex', 'important');
        element.style.setProperty('align-items', 'center', 'important');
        element.style.setProperty('justify-content', 'center', 'important');
        element.style.setProperty('pointer-events', 'none', 'important');
        element.style.setProperty('z-index', '2', 'important');
        element.style.setProperty('transform', `rotate(${angle}deg)`, 'important');
        element.style.setProperty('font-family', 'system-ui, sans-serif', 'important');
        element.style.setProperty('font-weight', '600', 'important');
        element.style.setProperty('font-size', '42px', 'important');
        element.style.setProperty('opacity', String(Math.min(opacity * 1.8, 0.35)), 'important');
        element.style.setProperty('color', color, 'important');
        element.style.setProperty('text-align', 'center', 'important');
        element.style.setProperty('white-space', 'pre-line', 'important');
        element.style.setProperty('visibility', 'visible', 'important');
      }
    };

    const enforceWatermarks = () => {
      let needsHeavyOperation = false;

      // Check overlay watermark
      let overlay = overlayRef.current;
      if (!overlay || !overlay.parentElement || !el.contains(overlay)) {
        needsHeavyOperation = true;
      } else {
        // Lightweight: Just enforce CSS properties
        applyCriticalStyles(overlay, true);

        // Verify correct attributes
        if (!overlay.classList.contains('wm-layer')) {
          overlay.className = 'wm-layer';
        }
        if (!overlay.getAttribute('aria-hidden')) {
          overlay.setAttribute('aria-hidden', 'true');
        }
        if (overlay.dataset.role !== 'watermark') {
          overlay.dataset.role = 'watermark';
        }
      }

      // Check center stamp if enabled
      let center = centerRef.current;
      if (showCenterStamp) {
        if (!center || !center.parentElement || !el.contains(center)) {
          needsHeavyOperation = true;
        } else {
          // Lightweight: Just enforce CSS properties
          applyCriticalStyles(center, false);

          // Verify text content
          if (center.textContent !== finalWatermark) {
            center.textContent = finalWatermark;
          }

          // Verify correct attributes
          if (!center.classList.contains('wm-center-stamp')) {
            center.className = 'wm-center-stamp';
          }
          if (!center.getAttribute('aria-hidden')) {
            center.setAttribute('aria-hidden', 'true');
          }
        }
      }

      // Only do heavy DOM operations if elements are missing
      if (needsHeavyOperation) {
        console.log('🛡️ Heavy DOM operation: recreating watermarks');

        // Remove ALL existing watermark elements
        const existingWatermarks = el.querySelectorAll('.wm-layer, .wm-center-stamp');
        existingWatermarks.forEach(element => element.remove());

        // Clear refs
        overlayRef.current = null;
        centerRef.current = null;

        // Create fresh overlay watermark
        const newOverlay = document.createElement("div");
        overlayRef.current = newOverlay;
        newOverlay.className = "wm-layer";
        newOverlay.setAttribute("aria-hidden", "true");
        newOverlay.dataset.role = "watermark";

        applyCriticalStyles(newOverlay, true);
        el.appendChild(newOverlay);

        // Create fresh center stamp if enabled
        if (showCenterStamp) {
          const newCenter = document.createElement("div");
          centerRef.current = newCenter;
          newCenter.className = "wm-center-stamp";
          newCenter.setAttribute("aria-hidden", "true");

          applyCriticalStyles(newCenter, false);
          newCenter.textContent = finalWatermark;
          el.appendChild(newCenter);
        }
      } else {
        console.log('🛡️ Lightweight operation: CSS enforcement only');
      }
    };

    let timeoutId: NodeJS.Timeout | null = null;
    let isRunning = false;

    const scheduleNextEnforcement = () => {
      if (isRunning) return; // Prevent multiple scheduling

      timeoutId = setTimeout(async () => {
        if (isRunning) return; // Double-check before execution

        isRunning = true;

        try {
          // Run enforcement
          enforceWatermarks();

          // Small delay to let other tasks run
          await new Promise(resolve => setTimeout(resolve, 10));

        } catch (error) {
          console.error('Watermark enforcement error:', error);
        } finally {
          isRunning = false;

          // Schedule next enforcement only after current one completes
          scheduleNextEnforcement();
        }
      }, 2000);
    };

    // Initial enforcement
    enforceWatermarks();

    // Start the recursive timeout cycle
    scheduleNextEnforcement();

    return () => {
      isRunning = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [containerRef, overlayRef, centerRef, dataUrl, tile.w, tile.h, angle, opacity, fontSize, color, showCenterStamp, finalWatermark, hasValidIdentifier, watermark]);

  // If no valid identifier, don't show watermark
  if (!hasValidIdentifier && !watermark) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }


  const containerStyle: CSSProperties = {
    // Ensure watermark prints with content
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
    ...style,
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {children}
    </div>
  );
}


/* Utils */

function makeSvgDataUrl(opts: {
  text: string;
  tileW: number;
  tileH: number;
  angle: number;
  opacity: number; // 0..1
  fontSize: number;
  color: string; // opaque color; opacity applied separately
}) {
  const { text, tileW, tileH, angle, opacity, fontSize, color } = opts;

  // Multi-line stagger for denser tiling
  const lines = [
    escapeXml(text),
    escapeXml(text),
    escapeXml(text),
    escapeXml(text),
  ];

  const fill = colorToRgba(color, opacity);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${tileW}" height="${tileH}">
  <g transform="rotate(${angle} ${tileW / 2} ${tileH / 2})"
     font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
     font-size="${fontSize}" fill="${fill}">
    <text x="0" y="${tileH * 0.3}">${lines[0]}</text>
    <text x="${tileW * 0.15}" y="${tileH * 0.6}">${lines[1]}</text>
    <text x="${tileW * 0.3}" y="${tileH * 0.9}">${lines[2]}</text>
  </g>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function colorToRgba(color: string, alpha: number) {
  // If color is already rgba(...), just replace alpha at the end best-effort
  if (color.startsWith("rgba(")) {
    return color.replace(/\brgba\(([^)]+)\)/, (_, inner) => {
      const parts = inner.split(",").map((p: string) => p.trim());
      parts[3] = String(alpha);
      return `rgba(${parts.join(", ")})`;
    });
  }
  if (color.startsWith("rgb(")) {
    return color.replace(
      /\brgb\(([^)]+)\)/,
      (_, inner) => `rgba(${inner.trim()}, ${alpha})`
    );
  }
  // hex or named colors -> fallback to black with alpha
  return `rgba(0, 0, 0, ${alpha})`;
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


function ensureGlobalStyles() {
  const id = "wm-global-style";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
@keyframes wm-drift {
  0% { background-position: 0px 0px; }
  100% { background-position: -120px -90px; }
}

@media print {
  .wm-layer {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-color: transparent !important;
  }
}
`;
  document.head.appendChild(style);
}



/* Optional: small helper to build a short token */
export function shortToken(input: string, len = 6) {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return ("00000000" + h.toString(16)).slice(-len).toUpperCase();
}