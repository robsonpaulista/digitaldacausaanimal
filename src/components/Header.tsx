import { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { CONTACT, NAV_ITEMS } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useScrolled } from '../hooks/useScrolled';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { FacebookIcon, InstagramIcon, PawShape, WhatsAppIcon } from './icons';
import './Header.css';

const SECTION_IDS = ['inicio', ...NAV_ITEMS.map((item) => item.id), 'contato'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  useLockBodyScroll(menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--open' : ''}`}>
      <div className="container header__bar">
        <a href="#inicio" className="header__brand" onClick={closeMenu} aria-label="Digital da Causa Animal – início">
          <img
            src="/images/logo-pacto.png"
            alt="Pacto pelos Animais – Castra-Móvel"
            className="header__logo header__logo--pacto"
            width={385}
            height={296}
          />
          <span className="header__divider" aria-hidden="true" />
          <img
            src="/images/logo-digital.png"
            alt="Digital da Causa Animal"
            className="header__logo header__logo--digital"
            width={329}
            height={360}
          />
        </a>

        <nav className="header__nav" aria-label="Navegação principal">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#ajudar" className="btn btn--yellow header__cta">
          <Heart strokeWidth={2.4} />
          Fazer parte da matilha
        </a>

        <button
          type="button"
          className="header__burger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu bg-grid" hidden={!menuOpen}>
        <PawShape className="paw-decor mobile-menu__paw" />
        <nav aria-label="Navegação mobile">
          <ul className="mobile-menu__list">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id} style={{ animationDelay: `${index * 50 + 80}ms` }}>
                <a href={`#${item.id}`} onClick={closeMenu}>
                  {item.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <a href="#ajudar" className="btn btn--yellow btn--block" onClick={closeMenu}>
            Quero fazer parte da matilha
          </a>
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost-light btn--block"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>
          <div className="mobile-menu__social">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
