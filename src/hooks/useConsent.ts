import { useContext } from 'react';
import { ConsentContext, type ConsentState } from '../context/consentContext';

export function useConsent(): ConsentState {
  const consent = useContext(ConsentContext);
  if (!consent) throw new Error('useConsent precisa estar dentro de <ConsentProvider>');
  return consent;
}
