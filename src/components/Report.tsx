import { AlertTriangle, Lock, Phone, Scale } from 'lucide-react';
import { REPORT_SIGNS } from '../data/content';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../services/whatsapp';
import { PawShape, WhatsAppIcon } from './icons';
import { Reveal } from './Reveal';
import { Eyebrow } from './SectionHeading';
import './Report.css';

export function Report() {
  return (
    <section id="denuncia" className="report" aria-labelledby="denuncia-title">
      <div className="container">
        <div className="report__box">
          <PawShape className="report__paw report__paw--1" />
          <PawShape className="report__paw report__paw--2" />

          <div className="report__content">
            <Reveal>
              <Eyebrow>Canal de denúncias</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h2 id="denuncia-title" className="title-lg report__title">
                Viu maus&#8209;tratos?
                <span>Não se cale.</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="report__lead">
                Sua denúncia pode salvar uma vida. Envie o endereço, uma descrição e, se possível, fotos ou vídeos. Nós
                encaminhamos aos órgãos competentes e acompanhamos o caso.
              </p>
            </Reveal>

            <Reveal delay={200} as="ul" className="report__signs">
              {REPORT_SIGNS.map((sign) => (
                <li key={sign}>
                  <AlertTriangle strokeWidth={2.4} />
                  {sign}
                </li>
              ))}
            </Reveal>

            <Reveal delay={260} className="btn-group">
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.report)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <WhatsAppIcon />
                Denunciar pelo WhatsApp
              </a>
              <a href="tel:190" className="btn btn--outline">
                <Phone strokeWidth={2.3} />
                Flagrante? Ligue 190
              </a>
            </Reveal>

            <Reveal delay={320} className="report__notes">
              <p>
                <Lock strokeWidth={2.3} />
                Sua identidade é preservada.
              </p>
              <p>
                <Scale strokeWidth={2.3} />
                Maus-tratos a cães e gatos é crime: reclusão de 2 a 5 anos (Lei 14.064/2020).
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} className="report__media">
            <div className="report__photo">
              <img
                src="/images/report.jpg"
                alt="Pug preto com cachecol olhando para cima com expressão triste"
                width={750}
                height={1000}
                loading="lazy"
              />
            </div>
            <p className="hand report__hand">
              eles contam
              <br />
              com você!
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
