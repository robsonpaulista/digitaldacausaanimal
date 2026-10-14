export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'dca:consent:v1';

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Navegação privada pode bloquear o storage; a escolha vale só para esta visita.
  }
}
