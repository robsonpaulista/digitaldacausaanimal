import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { CARE_TIPS, EDUCATION_FEATURES } from '../data/content';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { Highlight } from './Highlight';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './Education.css';

export function Education() {
  return (
    <section id="educacao" className="section section--soft education" aria-labelledby="educacao-title">
      <div className="container">
        <div className="education__grid">
          <Reveal className="education__media">
            <img
              src="/images/education.jpg"
              alt="Mulher sorrindo e fazendo carinho em um gato rajado"
              width={1000}
              height={667}
              loading="lazy"
            />
            <div className="education__badge">
              <GraduationCap />
              <span>
                <strong>Escolas parceiras</strong>
                <small>em todo o Piauí</small>
              </span>
            </div>
          </Reveal>

          <div className="education__content">
            <SectionHeading
              id="educacao-title"
              eyebrow="Educação nas escolas"
              title={
                <>
                  Ensinar o respeito desde <Highlight>pequenininhos</Highlight>
                </>
              }
              description="Crianças que aprendem a cuidar dos animais se tornam adultos mais empáticos. Levamos a causa animal para dentro da sala de aula de forma leve e divertida."
            />

            <ul className="education__features">
              {EDUCATION_FEATURES.map(({ title, description, icon: Icon }, index) => (
                <Reveal as="li" key={title} delay={index * 80}>
                  <span className="icon-tile icon-tile--yellow">
                    <Icon strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={240}>
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.school)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Levar o projeto à minha escola
                <ArrowUpRight className="btn__arrow" strokeWidth={2.5} />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="care">
          <Reveal className="care__header">
            <h3 className="title-md">Dicas de guarda responsável</h3>
            <span className="hand">amor também é cuidado ♥</span>
          </Reveal>
          <ul className="care__grid">
            {CARE_TIPS.map(({ title, description, icon: Icon }, index) => (
              <Reveal as="li" key={title} delay={index * 70} className="care__card">
                <span className="icon-tile icon-tile--soft">
                  <Icon strokeWidth={1.9} />
                </span>
                <h4>{title}</h4>
                <p>{description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
