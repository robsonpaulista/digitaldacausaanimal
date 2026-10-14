import { useEffect, useRef } from 'react';
import { Cookie } from 'lucide-react';
import { PRIVACY_URL } from '../data/content';
import { useConsent } from '../hooks/useConsent';
import './CookieBanner.css';

export function CookieBanner() {
  const { bannerOpen, choice, accept, reject } = useConsent();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reopened = bannerOpen && choice !== null;

  useEffect(() => {
    if (reopened) titleRef.current?.focus();
  }, [reopened]);

  if (!bannerOpen) return null;

  return (
    <section className="cookie-banner" aria-labelledby="cookie-banner-title">
      <span className="cookie-banner__icon" aria-hidden="true">
        <Cookie strokeWidth={2} />
      </span>
      <div className="cookie-banner__text">
        <h2 id="cookie-banner-title" ref={titleRef} tabIndex={-1}>
          Cookies e privacidade
        </h2>
        <p>
          Com a sua permissão, usamos o Pixel da Meta para medir as visitas e mostrar conteúdos da causa animal no
          Facebook e no Instagram. <a href={PRIVACY_URL}>Política de Privacidade</a>
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn--outline" onClick={reject}>
          Recusar
        </button>
        <button type="button" className="btn btn--primary" onClick={accept}>
          Aceitar
        </button>
      </div>
    </section>
  );
}
