// Example.tsx
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
      drift={false}
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
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type WatermarkedContainerProps = {
  children: ReactNode;
  watermark: string; // e.g., "user@acme.com · A1B2C3 · 2025-09-11 12:00"
  className?: string;
  style?: CSSProperties;
  drift?: boolean; // slow drift animation to foil clean crops
  showCenterStamp?: boolean; // bold, large center mark
  tile?: { w: number; h: number }; // px tile size
  angle?: number; // degrees
  opacity?: number; // 0..1, actual text alpha inside SVG
  fontSize?: number; // px
  colorLight?: string; // used on light theme
  colorDark?: string; // used on dark theme
  attemptId?: string; // passed to tamper logs
};

export function WatermarkedContainer({
  children,
  watermark,
  className,
  style,
  drift = false,
  showCenterStamp = false,
  tile = { w: 320, h: 220 },
  angle = -30,
  opacity = 0.16,
  fontSize = 18,
  colorLight = "rgba(0,0,0,1)",
  colorDark = "rgba(255,255,255,1)",
  attemptId,
}: WatermarkedContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const [devToolsDetected, setDevToolsDetected] = useState(false);

  useEffect(() => {
    ensureGlobalStyles();
    detectDevTools(setDevToolsDetected, attemptId);
  }, [attemptId]);

  const isDark = usePrefersDark();
  const color = isDark ? colorDark : colorLight;

  const dataUrl = useMemo(
    () =>
      makeSvgDataUrl({
        text: watermark,
        tileW: tile.w,
        tileH: tile.h,
        angle,
        opacity,
        fontSize,
        color,
      }),
    [watermark, tile.w, tile.h, angle, opacity, fontSize, color]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.position = el.style.position || "relative";

    const addOverlay = () => {
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
          mixBlendMode: isDark ? "screen" : "multiply",
          // improve print fidelity
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          // optional drift animation disabled
          animation: "",
        } as CSSProperties);
      }
      if (!over.parentElement) el.appendChild(over);

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
          } as CSSProperties);
          center.textContent = watermark;
        }
        if (!center.parentElement) el.appendChild(center);
      } else if (centerRef.current?.parentElement) {
        centerRef.current.remove();
      }
    };

    addOverlay();

    const mo = new MutationObserver(() => {
      const overExists = !!overlayRef.current?.parentElement;
      if (!overExists) {
        addOverlay();
        logTamper("overlay_removed", attemptId);
      } else {
        // if someone hid it, put it back
        const o = overlayRef.current!;
        if (
          o.style.display === "none" ||
          o.style.visibility === "hidden" ||
          o.style.opacity === "0"
        ) {
          o.style.display = "";
          o.style.visibility = "";
          o.style.opacity = "";
          logTamper("overlay_hidden", attemptId);
        }
      }
    });

    mo.observe(el, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Re-ensure before printing (some browsers alter backgrounds)
    const beforePrint = () => addOverlay();
    window.addEventListener("beforeprint", beforePrint);

    return () => {
      mo.disconnect();
      window.removeEventListener("beforeprint", beforePrint);
    };
  }, [
    dataUrl,
    tile.w,
    tile.h,
    drift,
    isDark,
    color,
    watermark,
    angle,
    opacity,
    showCenterStamp,
    attemptId,
  ]);

  const containerStyle: CSSProperties = {
    // Ensure watermark prints with content
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
    ...style,
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {devToolsDetected ? (
        <div className="flex items-center justify-center bg-red-50 dark:bg-red-900 min-h-screen pointer-events-auto z-50 relative">
          <div className="text-center p-8 max-w-md pointer-events-auto">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Developer Tools Detected
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              For security reasons, this content is hidden when developer tools are open.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors pointer-events-auto cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      ) : (
        children
      )}
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

function usePrefersDark() {
  const ref = useRef(
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mm = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mm) return;
    const onChange = () => {
      ref.current = mm.matches;
    };
    mm.addEventListener?.("change", onChange);
    return () => mm.removeEventListener?.("change", onChange);
  }, []);

  // reading current value is enough; component re-renders due to other deps
  return ref.current as boolean;
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

function logTamper(type: string, attemptId?: string) {
  const timestamp = new Date().toISOString();
  const userAgent = navigator.userAgent;
  
  console.warn(
    `🚨 WATERMARK TAMPERING DETECTED 🚨\n` +
    `Type: ${type}\n` +
    `Time: ${timestamp}\n` +
    `Attempt ID: ${attemptId || 'Unknown'}\n` +
    `User Agent: ${userAgent}\n` +
    `URL: ${window.location.href}`
  );
}

function detectDevTools(setDevToolsDetected: (detected: boolean) => void, attemptId?: string) {
  let devToolsOpen = false;
  
  // Detect dev tools opening via console size trick (improved to ignore zoom)
  const detectOpen = () => {
    // Use percentage-based detection instead of fixed pixel threshold
    const getThreshold = () => Math.min(window.outerWidth, window.outerHeight) * 0.4;
    
    const checkInterval = setInterval(() => {
      const threshold = getThreshold();
      const heightDiff = window.outerHeight - window.innerHeight;
      const widthDiff = window.outerWidth - window.innerWidth;
      
      // Only trigger if BOTH dimensions suggest dev tools (more reliable)
      if (heightDiff > threshold && widthDiff > 100) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          setDevToolsDetected(true);
          console.warn(
            `🔍 DEVELOPER TOOLS DETECTED 🔍\n` +
            `Time: ${new Date().toISOString()}\n` +
            `Attempt ID: ${attemptId || 'Unknown'}\n` +
            `URL: ${window.location.href}\n` +
            `⚠️ Content hidden for security!`
          );
        }
      } else {
        if (devToolsOpen) {
          devToolsOpen = false;
          setDevToolsDetected(false);
        }
      }
    }, 1000);

    return () => clearInterval(checkInterval);
  };

  // Detect F12, Ctrl+Shift+I, etc.
  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      setDevToolsDetected(true);
      console.warn(
        `🚫 KEYBOARD SHORTCUT BLOCKED 🚫\n` +
        `Time: ${new Date().toISOString()}\n` +
        `Attempt ID: ${attemptId || 'Unknown'}\n` +
        `Key: ${e.key}\n` +
        `⚠️ Developer tools access blocked!`
      );
    }
  };

  // Right-click context menu detection (commented out)
  // const handleRightClick = (e: MouseEvent) => {
  //   e.preventDefault();
  //   console.warn(
  //     `🚫 RIGHT-CLICK BLOCKED 🚫\n` +
  //     `Time: ${new Date().toISOString()}\n` +
  //     `Attempt ID: ${attemptId || 'Unknown'}\n` +
  //     `⚠️ Context menu disabled for security!`
  //   );
  // };

  document.addEventListener('keydown', handleKeyDown);
  // document.addEventListener('contextmenu', handleRightClick);
  const cleanup = detectOpen();

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    // document.removeEventListener('contextmenu', handleRightClick);
    cleanup();
  };
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