import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { WhatsAppIcon } from './icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './Faq.css';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <section id="duvidas" className="section faq" aria-labelledby="duvidas-title">
      <div className="container faq__grid">
        <div className="faq__head">
          <SectionHeading
            id="duvidas-title"
            eyebrow="Dúvidas frequentes"
            title={
              <>
                Ficou com alguma <span className="text-blue">dúvida?</span>
              </>
            }
            description="Separamos as perguntas que mais recebemos sobre castração, microchip e denúncias."
          />
        </div>

        <Reveal delay={120} className="faq__contact">
          <img
            src="/images/cta-dogs.jpg"
            alt="Dois cachorros correndo felizes em uma estrada de terra"
            width={1000}
            height={667}
            loading="lazy"
          />
          <div className="faq__contact-body">
            <strong>Não encontrou sua resposta?</strong>
            <p>Fale com a gente, vamos adorar ajudar você e seu pet.</p>
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp btn--block"
            >
              <WhatsAppIcon />
              Conversar no WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="faq__list">
          {FAQ_ITEMS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={question} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    {question}
                    <span className="faq__icon" aria-hidden="true">
                      <Plus strokeWidth={2.6} />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!isOpen} className="faq__panel">
                  <div>
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
