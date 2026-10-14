import { Heart } from 'lucide-react';
import { HELP_OPTIONS } from '../data/content';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { ChannelSignupForm } from './ChannelSignupForm';
import { PawShape } from './icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './HowToHelp.css';

export function HowToHelp() {
  return (
    <section id="ajudar" className="section help bg-brand bg-grid" aria-labelledby="ajudar-title">
      <PawShape className="paw-decor help__paw help__paw--1" />
      <PawShape className="paw-decor help__paw help__paw--2" />

      <div className="container">
        <div className="help__layout">
          <div className="help__main">
            <SectionHeading
              id="ajudar-title"
              light
              eyebrow="Como ajudar"
              title={
                <>
                  Faça parte dessa <span className="text-yellow">causa!</span>{' '}
                  <PawShape className="help__title-paw" />
                </>
              }
              description="A causa animal se faz com muitas mãos (e patinhas). Entre no canal oficial e escolha sua forma de ajudar."
            />

            <ul className="help__grid">
              {HELP_OPTIONS.map(({ title, description, icon: Icon }, index) => (
                <Reveal as="li" key={title} delay={index * 90} className="help__card">
                  <span className="icon-tile icon-tile--yellow">
                    <Icon strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="title-md">{title}</h3>
                    <p>{description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="help__cta">
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.donation)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--yellow"
              >
                <Heart strokeWidth={2.4} />
                Quero doar ração
              </a>
              <span className="hand">toda ajuda vale um abanar de rabo!</span>
            </Reveal>
          </div>

          <Reveal delay={120} className="help__form">
            <ChannelSignupForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
