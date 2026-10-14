import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readConsent, saveConsent, type ConsentChoice } from '../services/consent';
import { grantMetaPixel, META_PIXEL_ID, revokeMetaPixel } from '../services/metaPixel';
import { ConsentContext, type ConsentState } from './consentContext';

const enabled = Boolean(META_PIXEL_ID);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => (enabled ? readConsent() : null));
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);

  useEffect(() => {
    if (choice === 'granted') grantMetaPixel();
    else if (choice === 'denied') revokeMetaPixel();
  }, [choice]);

  const decide = useCallback((next: ConsentChoice) => {
    saveConsent(next);
    setChoice(next);
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<ConsentState>(
    () => ({
      enabled,
      choice,
      bannerOpen: enabled && (choice === null || preferencesOpen),
      accept: () => decide('granted'),
      reject: () => decide('denied'),
      openPreferences: () => setPreferencesOpen(true),
    }),
    [choice, preferencesOpen, decide],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
