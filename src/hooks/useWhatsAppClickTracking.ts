import { useEffect } from 'react';
import { trackPixel } from '../services/metaPixel';

const WHATSAPP_LINK = 'a[href^="https://wa.me/"]';

/** Os links de WhatsApp estão espalhados pelo site; um único ouvinte registra todos como "Contact". */
export function useWhatsAppClickTracking(): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(WHATSAPP_LINK)) {
        trackPixel('Contact', { content_name: 'WhatsApp' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
