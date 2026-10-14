import { Heart, Mail, MapPin } from 'lucide-react';
import { CONTACT, NAV_ITEMS, SERVICES } from '../data/content';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { FacebookIcon, InstagramIcon, PawShape, WhatsAppIcon } from './icons';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="footer bg-grid">
      <PawShape className="paw-decor footer__paw" />

      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logos">
              <img src="/images/logo-pacto.png" alt="Pacto pelos Animais – Castra-Móvel" width={385} height={296} loading="lazy" />
              <span aria-hidden="true" />
              <img src="/images/logo-digital.png" alt="Digital da Causa Animal" width={329} height={360} loading="lazy" />
            </div>
            <p>
              Castração, microchipagem, doação de ração, canal de denúncias e educação: juntos pela causa animal em todo
              o Piauí.
            </p>
            <div className="footer__social">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Links do rodapé">
            <h2>Navegação</h2>
            <ul>
              <li>
                <a href="#inicio">Início</a>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2>Serviços</h2>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a href={service.href}>{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2>Contato</h2>
            <ul className="footer__contact">
              <li>
                <WhatsAppIcon />
                <a href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                  {CONTACT.whatsappLabel}
                </a>
              </li>
              <li>
                <Mail />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <InstagramIcon />
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                  {CONTACT.instagramLabel}
                </a>
              </li>
              <li>
                <MapPin />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Digital da Causa Animal. Todos os direitos reservados.</p>
          <p className="footer__love">
            Feito com <Heart aria-label="amor" /> pela causa animal
          </p>
        </div>
      </div>
    </footer>
  );
}
