import React, { useEffect, useRef, useState, useCallback } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Layout } from "../components";

type WatermarkProps = {
  children: ReactNode;
  userEmail: string;
  attemptId?: string;
  className?: string;
  style?: CSSProperties;
  questionType?: "MCQ" | "CODING";
  logUrl?: string;
  onTamperDetected?: (type: string) => void;
};

type WatermarkConfig = {
  chunkWidthText1: number;
  chunkWidthText2: number;
  chunkHeight: number;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  globalAlpha: number;
  font: string;
  rotateAngle: number;
  fillStyle: string;
};

// Utility to calculate text width based on content length
function calculateTextWidth(text: string): number {
  const length = text?.length || 0;
  if (length > 100) return 1300;
  if (length > 80) return 1000;
  if (length > 70) return 850;
  if (length > 45) return 720;
  return 500;
}

// Canvas-based watermark generation
function generateWatermarkCanvas(
  text1: string,
  text2: string,
  config: WatermarkConfig
): string {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    canvas.width = 1700;
    canvas.height = 3000;

    ctx.textAlign = config.textAlign;
    ctx.textBaseline = config.textBaseline;
    ctx.globalAlpha = config.globalAlpha;
    ctx.font = config.font;

    // Apply rotation
    ctx.translate(850, 1500);
    ctx.rotate(config.rotateAngle);
    ctx.translate(-1020, -1800);

    ctx.fillStyle = config.fillStyle;

    const positions: Array<{ text: string; x: number; y: number }> = [];
    const chunkWidthText1 = config.chunkWidthText1;
    const chunkWidthText2 = config.chunkWidthText2;
    const chunkHeight = config.chunkHeight;

    const horizontalChunks = Math.ceil(1700 / chunkWidthText1) + 1;
    const verticalChunks = Math.ceil(3000 / chunkHeight) + 1;

    let currentTextIndex = 0;
    const verticalOffset = chunkHeight / 2;
    let staggerOffset = 0;

    for (let row = 0; row <= verticalChunks; row += 2) {
      staggerOffset = parseInt((row % 2).toString(), 10);

      const currentText = currentTextIndex % 2 === 0 ? text1 : text2;
      currentTextIndex++;

      for (let col = 0, horizontalOffset = chunkWidthText1 / 2; col <= horizontalChunks; col += 1) {
        let xPosition = col * chunkWidthText1 + staggerOffset * horizontalOffset;

        if (currentTextIndex % 2 === 0) {
          xPosition = col * chunkWidthText2 + staggerOffset * horizontalOffset + 75;
        }

        positions.push({
          text: currentText,
          x: xPosition,
          y: row * chunkHeight + verticalOffset
        });
      }
    }

    positions.forEach(pos => {
      ctx.fillText(pos.text, pos.x, pos.y);
    });

    return canvas.toDataURL();
  } catch (error) {
    console.error("Watermark canvas generation failed:", error);
    return "";
  }
}

// Security class for tamper protection
class WatermarkSecurity {
  private watermarkId: string;
  private watermarkWrapperId: string;
  private watermarkStyle: string;
  private imageUrl: string;
  private onTamperDetected: (type: string) => void;
  private DOMRemoveObserver: MutationObserver | null = null;
  private DOMAttrObserver: MutationObserver | null = null;

  constructor(
    watermarkId: string,
    watermarkWrapperId: string,
    watermarkStyle: string,
    imageUrl: string,
    onTamperDetected: (type: string) => void
  ) {
    this.watermarkId = watermarkId;
    this.watermarkWrapperId = watermarkWrapperId;
    this.watermarkStyle = watermarkStyle;
    this.imageUrl = imageUrl;
    this.onTamperDetected = onTamperDetected;

    this.initSecurity();
  }

  private getDOM(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  private initSecurity() {
    const wrapperElement = this.getDOM(this.watermarkWrapperId);
    const watermarkElement = this.getDOM(this.watermarkId);

    if (wrapperElement) {
      this.registerNodeRemoveListener(wrapperElement);
    }

    if (watermarkElement) {
      this.registerNodeAttrChangeListener(watermarkElement);
    }
  }

  private registerNodeRemoveListener(element: HTMLElement) {
    if (!window.MutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const removedNodes = mutation.removedNodes;
          if (removedNodes && removedNodes[0]) {
            const removedElement = removedNodes[0] as HTMLElement;
            if (removedElement.id && removedElement.id.indexOf(this.watermarkId) > -1) {
              this.onTamperDetected("watermark_removed");
              this.createWatermarkDom(element);
            }
          }
        }
      });
    });

    observer.observe(element, {
      childList: true
    });

    this.DOMRemoveObserver = observer;
  }

  private registerNodeAttrChangeListener(element: HTMLElement) {
    if (!window.MutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          this.onTamperDetected("watermark_modified");
          // Remove and recreate the element to prevent style tampering
          if (element.parentNode) {
            element.parentNode.removeChild(element);
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["style", "class"]
    });

    this.DOMAttrObserver = observer;
  }

  private createWatermarkDom(parentElement: HTMLElement) {
    const watermarkDiv = document.createElement("div");
    watermarkDiv.id = this.watermarkId;

    const fullStyle = this.watermarkStyle + `background-image: url("${this.imageUrl}");`;
    watermarkDiv.style.cssText = fullStyle;

    parentElement.appendChild(watermarkDiv);

    // Re-register attribute listener for the new element
    this.registerNodeAttrChangeListener(watermarkDiv);
  }

  public cleanup() {
    if (this.DOMRemoveObserver) {
      this.DOMRemoveObserver.disconnect();
      this.DOMRemoveObserver = null;
    }
    if (this.DOMAttrObserver) {
      this.DOMAttrObserver.disconnect();
      this.DOMAttrObserver = null;
    }
  }
}

export function WatermarkContainer({
  children,
  userEmail,
  attemptId = "default-attempt",
  className = "",
  style = {},
  questionType = "CODING",
  logUrl = "/api/watermark/tamper",
  onTamperDetected
}: WatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<WatermarkSecurity | null>(null);
  const [, setIsReady] = useState(false);

  const watermarkId = "watermark";
  const watermarkWrapperId = "watermark-wrapper";

  // Generate watermark content
  const confidentialText = "CONFIDENTIAL - DO NOT DISTRIBUTE";
  const userText = `${userEmail}                           `;
  const confidentialSpaced = `                 ${confidentialText}`;

  // Log tamper attempts
  const logTamperAttempt = useCallback(async (type: string) => {
    try {
      const payload = {
        timestamp: Date.now(),
        type,
        attemptId,
        userAgent: navigator.userAgent,
        userEmail
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon(logUrl, JSON.stringify(payload));
      } else {
        fetch(logUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(console.error);
      }
    } catch (error) {
      console.error("Failed to log tamper attempt:", error);
    }
  }, [logUrl, attemptId, userEmail]);

  // Handle tamper detection
  const handleTamperDetected = useCallback((type: string) => {
    console.warn(`🚨 Watermark tamper detected: ${type}`);
    logTamperAttempt(type);
    onTamperDetected?.(type);
  }, [logTamperAttempt, onTamperDetected]);

  // Generate watermark image
  const generateWatermark = useCallback(() => {
    const config: WatermarkConfig = {
      chunkWidthText1: calculateTextWidth(userText),
      chunkWidthText2: calculateTextWidth(confidentialSpaced),
      chunkHeight: questionType === "MCQ" ? 180 : 50,
      textAlign: "left",
      textBaseline: "bottom",
      globalAlpha: questionType === "MCQ" ? 0.4 : 0.5,
      font: "18px Arial",
      rotateAngle: -0.3,
      fillStyle: "#777"
    };

    return generateWatermarkCanvas(userText, confidentialSpaced, config);
  }, [userText, confidentialSpaced, questionType]);

  // Initialize security when component mounts
  useEffect(() => {
    if (!containerRef.current) return;

    const imageUrl = generateWatermark();
    if (!imageUrl) return;

    const opacity = questionType === "MCQ" ? 0.4 : 0.5;
    const watermarkStyle = `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: ${opacity};
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
      background-color: transparent;
      background-repeat: repeat;
    `;

    // Create initial watermark element
    const watermarkDiv = document.createElement("div");
    watermarkDiv.id = watermarkId;
    watermarkDiv.style.cssText = watermarkStyle + `background-image: url("${imageUrl}");`;
    containerRef.current.appendChild(watermarkDiv);

    // Initialize security
    const security = new WatermarkSecurity(
      watermarkId,
      watermarkWrapperId,
      watermarkStyle,
      imageUrl,
      handleTamperDetected
    );

    securityRef.current = security;
    setIsReady(true);

    return () => {
      security.cleanup();
      securityRef.current = null;
    };
  }, [watermarkId, watermarkWrapperId, generateWatermark, questionType, handleTamperDetected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (securityRef.current) {
        securityRef.current.cleanup();
      }
    };
  }, []);

  const containerStyle: CSSProperties = {
    position: "relative",
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
    ...style
  };

  return (
    <div
      ref={containerRef}
      id={watermarkWrapperId}
      className={className}
      style={containerStyle}
    >
      {children}
    </div>
  );
}

// Example page component
export default function WatermarkingExample() {
  const userEmail = "jane.doe@example.com";
  const attemptId = "attempt-7c028163-4e6b";

  const handleTamperDetected = (type: string) => {
    console.log(`Tamper detected: ${type}`);
    // Could show notification, increment counter, etc.
  };

  return (
    <Layout title="Watermarking">
      <WatermarkContainer
        userEmail={userEmail}
        attemptId={attemptId}
        questionType="CODING"
        onTamperDetected={handleTamperDetected}
        className="min-h-screen w-full fixed inset-0 pointer-events-none"
      >
        <div className="p-16 max-w-4xl mx-auto pointer-events-auto">
          <h1 className="text-3xl font-bold mb-6">Watermarking - MutationObserver</h1>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            This implementation uses MutationObserver for real-time tamper detection
            and canvas-based watermark generation for enhanced security.
          </p>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Features:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time tamper detection using MutationObserver</li>
              <li>Canvas-based watermark generation</li>
              <li>Immediate watermark recreation when removed</li>
              <li>Style modification protection</li>
              <li>Tamper logging to server endpoint</li>
              <li>Print protection</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Try to tamper with the watermark:
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Open DevTools and try to delete or modify the watermark elements.
              Watch the console for tamper detection logs.
            </p>
          </div>
        </div>
      </WatermarkContainer>
    </Layout>
  );
}