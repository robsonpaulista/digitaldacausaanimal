import { useEffect, useState } from 'react';
import { fetchPiauiCities } from '../services/ibge';

export function usePiauiCities(): string[] {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchPiauiCities(controller.signal)
      .then(setCities)
      .catch(() => {
        if (!controller.signal.aborted) setCities([]);
      });

    return () => controller.abort();
  }, []);

  return cities;
}
