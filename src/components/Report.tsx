import { Camera, FileText, Lock, Phone } from 'lucide-react';
import { PawShape } from './icons';
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
              <h3 className="report__subtitle">Como fazer uma denúncia de maus&#8209;tratos?</h3>
            </Reveal>

            <Reveal delay={180} as="ul" className="report__steps">
              <li>
                <Phone strokeWidth={2.4} />
                <span>
                  Em casos de flagrante ou situação de emergência, ligue para o <strong>190</strong>.
                </span>
              </li>
              <li>
                <FileText strokeWidth={2.3} />
                Para formalizar a denúncia, procure informar o endereço completo do local, descrever a situação e
                relatar os fatos com o máximo de detalhes possível.
              </li>
              <li>
                <Camera strokeWidth={2.3} />
                Se for seguro, reúna provas, como fotos ou vídeos, sem se colocar em risco.
              </li>
            </Reveal>

            <Reveal delay={260} className="btn-group">
              <a href="tel:190" className="btn btn--primary">
                <Phone strokeWidth={2.3} />
                Flagrante? Ligue 190
              </a>
            </Reveal>

            <Reveal delay={320} className="report__notes">
              <p>
                <Lock strokeWidth={2.3} />
                <strong>Sua identidade poderá ser preservada, caso você solicite.</strong>
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
