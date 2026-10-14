import { createContext } from 'react';
import type { ConsentChoice } from '../services/consent';

export interface ConsentState {
  /** Há algo que dependa de consentimento (hoje, só o Pixel da Meta). */
  enabled: boolean;
  choice: ConsentChoice | null;
  bannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
}

export const ConsentContext = createContext<ConsentState | null>(null);
