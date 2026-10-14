import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { useScrolled } from '../hooks/useScrolled';
import { WhatsAppIcon } from './icons';
import './WhatsAppFloat.css';

export function WhatsAppFloat() {
  const visible = useScrolled(400);

  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-float ${visible ? 'is-visible' : ''}`}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon strokeWidth={2} />
      <span className="wa-float__label">Fale conosco</span>
    </a>
  );
}
