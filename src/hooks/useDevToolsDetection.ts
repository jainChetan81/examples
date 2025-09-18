import { useEffect, useState } from 'react';

// Dev tools detection logging
function logDevToolsDetection(type: string, attemptId?: string) {
  const timestamp = new Date().toISOString();

  // Console warning for debugging
  console.warn(
    `🚨 DEVELOPER TOOLS DETECTED 🚨\n` +
    `Type: ${type}\n` +
    `Time: ${timestamp}\n` +
    `Attempt ID: ${attemptId || 'Unknown'}\n` +
    `URL: ${window.location.href}`
  );
}

/**
 * Enhanced developer tools detection hook
 * - Detects dev tools opening via window size changes
 * - Blocks keyboard shortcuts
 * - Uses smart interval management (stops polling once detected)
 * - State persists until page reload (not session storage)
 */
export function useDevToolsDetection() {
  const [devToolsDetected, setDevToolsDetected] = useState(false);

  useEffect(() => {
    // If already detected, don't start any monitoring - save resources
    if (devToolsDetected) return;

    let devToolsOpen = false;
    let checkInterval: NodeJS.Timeout | null = null;

    // Enhanced devtools detection (window size + performance timing + console check)
    const startDevToolsMonitoring = () => {
      const threshold = 160;

      checkInterval = setInterval(() => {
        // If already detected, stop polling to save resources
        if (devToolsDetected || devToolsOpen) {
          if (checkInterval) clearInterval(checkInterval);
          return;
        }

        // Method 1: Window size detection (for docked devtools)
        const heightDiff = window.outerHeight - window.innerHeight;
        const widthDiff = window.outerWidth - window.innerWidth;

        // Method 2: Console toString detection (works for detached devtools)
        let consoleDetected = false;
        try {
          const element = document.createElement('div');
          (element as any).__defineGetter__('id', function() {
            consoleDetected = true;
            return 'devtools-detected';
          });
          // Trigger the getter
          console.log(element);
        } catch {
          // Ignore
        }

        if (heightDiff > threshold || widthDiff > threshold || consoleDetected) {
          devToolsOpen = true;
          setDevToolsDetected(true);
          logDevToolsDetection('devtools_opened');
          // Stop polling once detected - no need to continue
          if (checkInterval) clearInterval(checkInterval);
        }
      }, 2000);
    };

    // Keyboard shortcut blocking
    const handleKeyDown = (e: KeyboardEvent) => {
      // If already detected, don't process more shortcuts
      if (devToolsDetected) return;

      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        setDevToolsDetected(true);
        logDevToolsDetection('keyboard_shortcut');
      }
    };

    // Start monitoring
    document.addEventListener('keydown', handleKeyDown);
    startDevToolsMonitoring();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [devToolsDetected]);

  return devToolsDetected;
}