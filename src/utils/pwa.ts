import { Platform } from 'react-native';

function addMetaTag(name: string, content: string): void {
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

function addLinkTag(rel: string, href: string, extras?: Record<string, string>): void {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (extras) {
    Object.entries(extras).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
  }
  document.head.appendChild(link);
}

function injectPWAMetaTags(): void {
  addLinkTag('manifest', '/manifest.json');
  addMetaTag('theme-color', '#0B1929');
  addLinkTag('apple-touch-icon', '/icon-192x192.png');
  addMetaTag('mobile-web-app-capable', 'yes');
  addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
  addMetaTag('apple-mobile-web-app-title', 'AC Wolves');
}

async function registerServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered with scope:', registration.scope);
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
}

export function setupPWA(): void {
  if (Platform.OS !== 'web') {
    return;
  }

  injectPWAMetaTags();
  registerServiceWorker();
}
