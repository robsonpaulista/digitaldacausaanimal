import { ArrowUpRight, CalendarDays, MapPinned } from 'lucide-react';
import { PACTO_ACTIONS, PACTO_KEY_FIGURES, PACTO_PARTNERS } from '../data/content';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { Highlight } from './Highlight';
import { PawShape, WhatsAppIcon } from './icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './Pacto.css';

export function Pacto() {
  return (
    <section id="pacto" className="section section--soft pacto" aria-labelledby="pacto-title">
      <div className="container">
        <div className="pacto__intro">
          <div className="pacto__text">
            <SectionHeading
              id="pacto-title"
              eyebrow="Governo do Estado do Piauí"
              title={
                <>
                  <Highlight>Pacto</Highlight> pelos Animais
                </>
              }
            />

            <Reveal delay={80} className="pacto__paragraphs">
              <p>
                O <strong>Pacto pelos Animais</strong> é uma iniciativa do Governo do Estado do Piauí, lançada em junho
                de 2026, com o objetivo de integrar e fortalecer as políticas públicas de{' '}
                <strong>proteção, bem-estar e cidadania animal</strong> em todos os 224 municípios do estado.
              </p>
              <p>
                O programa é coordenado pela Secretaria de Estado do Meio Ambiente e Recursos Hídricos (Semarh), em
                articulação com outras pastas, como a Secretaria da Saúde, da Segurança Pública, da Educação e do
                Planejamento, além de contar com a parceria do Ministério Público do Estado do Piauí (MPPI).
              </p>
            </Reveal>

            <Reveal delay={140} className="pacto__partners">
              <span>Em articulação com</span>
              <ul>
                {PACTO_PARTNERS.map((partner) => (
                  <li key={partner}>{partner}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="pacto__card">
            <PawShape className="paw-decor pacto__card-paw" />
            <div className="pacto__logo-plate">
              <img
                src="/images/logo-pacto.png"
                alt="Pacto pelos Animais – Castra-Móvel"
                className="pacto__logo"
                width={385}
                height={296}
                loading="lazy"
              />
            </div>
            <span className="pacto__launch">
              <CalendarDays strokeWidth={2.2} />
              Lançado em junho de 2026
            </span>
            <ul className="pacto__figures">
              {PACTO_KEY_FIGURES.map(({ value, label }) => (
                <li key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <p className="pacto__territories">
              <MapPinned strokeWidth={2.2} />
              Presente nos 12 territórios de desenvolvimento do Piauí
            </p>
          </Reveal>
        </div>

        <Reveal className="pacto__actions-head">
          <h3 className="title-md">Principais ações e metas</h3>
          <span className="hand">em todos os 224 municípios!</span>
        </Reveal>

        <div className="pacto__grid">
          {PACTO_ACTIONS.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 70}>
              <article className="action-card">
                <span className="action-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="icon-tile action-card__icon">
                  <Icon strokeWidth={1.9} />
                </span>
                <h4>{title}</h4>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={PACTO_ACTIONS.length * 70}>
            <article className="action-card action-card--cta">
              <PawShape className="paw-decor action-card__paw" />
              <span className="hand action-card__hand">Tem alguma dúvida?</span>
              <h4>Fale com a nossa equipe</h4>
              <p>Respondemos rapidinho pelo WhatsApp, com todo o carinho.</p>
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--yellow"
              >
                <WhatsAppIcon />
                Chamar no WhatsApp
                <ArrowUpRight className="btn__arrow" strokeWidth={2.5} />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
