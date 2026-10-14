import { useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { CASTRA_STEPS } from '../data/content';
import { useInView } from '../hooks/useInView';
import { trackPixel } from '../services/metaPixel';
import { Highlight } from './Highlight';
import { PawShape, Sparks } from './icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './CastraMovel.css';

export function CastraMovel() {
  const [sectionRef, inView] = useInView<HTMLElement>();

  useEffect(() => {
    if (inView) trackPixel('ViewContent', { content_name: 'Busão da Castração' });
  }, [inView]);

  return (
    <section ref={sectionRef} id="busao" className="section castra" aria-labelledby="castra-title">
      <div className="container">
        <div className="castra__top">
          <div className="castra__intro">
            <SectionHeading
              id="castra-title"
              eyebrow="Busão da Castração"
              title={
                <>
                  A castração gratuita <Highlight>chega até você</Highlight>
                </>
              }
              description="Um ônibus totalmente equipado percorre os municípios do Piauí levando castração e microchipagem de qualidade, sem nenhum custo para o tutor."
            />

            <ol className="castra__steps">
              {CASTRA_STEPS.map(({ title, description, icon: Icon }, index) => (
                <Reveal as="li" key={title} delay={index * 80} className="castra__step">
                  <span className="castra__step-icon icon-tile icon-tile--soft">
                    <Icon strokeWidth={1.9} />
                    <span className="castra__step-number">{index + 1}</span>
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={120} className="castra__media">
            <div className="castra__stage">
              <span className="castra__blob" aria-hidden="true" />
              <span className="castra__sun" aria-hidden="true" />
              <PawShape className="castra__paw castra__paw--1" />
              <PawShape className="castra__paw castra__paw--2" />
              <img
                className="castra__pets"
                src="/images/busao-pets.webp"
                alt="Cachorro caramelo e gato rajado sentados em frente ao Busão da Castração"
                width={721}
                height={787}
                loading="lazy"
              />
            </div>
            <Sparks className="castra__sparks" />
            <div className="castra__badge">
              <span className="icon-tile icon-tile--yellow">
                <CalendarDays />
              </span>
              <span>
                <strong>Busão da Castração</strong>
                <small>Calendário</small>
              </span>
            </div>
            <span className="hand castra__hand">pode ser na sua cidade!</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
