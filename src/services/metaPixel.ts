const PIXEL_SCRIPT_URL = 'https://connect.facebook.net/en_US/fbevents.js';
const PIXEL_COOKIES = ['_fbp', '_fbc'] as const;

const rawPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim() ?? '';
export const META_PIXEL_ID = /^\d+$/.test(rawPixelId) ? rawPixelId : '';

export type PixelEvent = 'PageView' | 'ViewContent' | 'Lead' | 'Contact';
export type PixelParams = Record<string, string | number>;

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;
let granted = false;

/** Mesmo contrato do snippet oficial: enfileira chamadas até o fbevents.js carregar. */
function createQueue(): Fbq {
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  return fbq;
}

function loadPixelScript(): Fbq {
  if (window.fbq) return window.fbq;
  const fbq = createQueue();
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = PIXEL_SCRIPT_URL;
  document.head.append(script);
  return fbq;
}

export function grantMetaPixel(): void {
  if (!META_PIXEL_ID) return;
  granted = true;
  const fbq = loadPixelScript();
  fbq('consent', 'grant');

  if (initialized) return;
  initialized = true;
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
}

export function revokeMetaPixel(): void {
  granted = false;
  window.fbq?.('consent', 'revoke');

  const rootDomain = location.hostname.replace(/^www\./, '');
  for (const name of PIXEL_COOKIES) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${rootDomain}`;
  }
}

export function trackPixel(event: PixelEvent, params?: PixelParams): void {
  if (!granted) return;
  window.fbq?.('track', event, params);
}
