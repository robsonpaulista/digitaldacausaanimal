import { ArrowRight, Check, MapPin } from 'lucide-react';
import { BUSAO_TOTALS } from '../data/busaoStats';
import { Highlight } from './Highlight';
import { PawShape } from './icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './About.css';

const HIGHLIGHTS = [
  'Castração e microchipagem como políticas de cuidado',
  'Ações do Pacto pelos Animais em todo o Piauí',
  'Educação e conscientização sobre proteção animal',
  'Apoio e valorização dos protetores de animais',
];

export function About() {
  return (
    <section id="sobre" className="section about" aria-labelledby="sobre-title">
      <PawShape className="paw-decor paw-decor--dark about__paw" />

      <div className="container about__grid">
        <Reveal className="about__media">
          <span className="about__dots" aria-hidden="true" />
          <img
            className="about__img-main"
            src="/images/about-friends.jpg"
            alt="Cachorro e gato deitados juntos na grama"
            width={1000}
            height={588}
            loading="lazy"
          />
          <img
            className="about__img-round"
            src="/images/about-dog.jpg"
            alt="Cachorro sorridente de pelagem branca e marrom"
            width={1000}
            height={667}
            loading="lazy"
          />
          <div className="about__badge">
            <span className="icon-tile icon-tile--yellow">
              <MapPin />
            </span>
            <span>
              <strong>Todo o Piauí</strong>
              <small>{BUSAO_TOTALS.hubCities} cidades-polo e região</small>
            </span>
          </div>
        </Reveal>

        <div className="about__content">
          <SectionHeading
            id="sobre-title"
            eyebrow="Quem somos"
            title={
              <>
                Cuidar dos animais é <Highlight>transformar vidas</Highlight>
              </>
            }
          />

          <Reveal delay={100} className="about__text">
            <p>
              A <strong>Digital da Causa Animal</strong> é um espaço dedicado a acompanhar e dar visibilidade às
              políticas públicas de proteção e bem-estar animal no Piauí.
            </p>
            <p>
              Com o apoio do deputado federal <strong>Jadyel Alencar</strong>, divulgamos as ações do{' '}
              <strong>Pacto pelos Animais</strong>, uma iniciativa que promove o cuidado responsável por meio de
              castrações, microchipagem, educação e conscientização. Entre essas ações está o{' '}
              <strong>Busão da Castração</strong>, que leva atendimento veterinário a diferentes municípios do estado.
            </p>
            <p>
              Acreditamos que proteger os animais é também cuidar da saúde pública, prevenir o abandono e construir uma
              sociedade mais consciente e responsável.
            </p>
          </Reveal>

          <Reveal delay={160} as="ul" className="about__list">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <span className="about__check">
                  <Check strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </Reveal>

          <Reveal delay={220} className="about__actions">
            <a href="#pacto" className="btn btn--primary">
              Conheça o Pacto pelos Animais
              <ArrowRight className="btn__arrow" strokeWidth={2.5} />
            </a>
            <p className="about__motto">Informação, proteção e compromisso com a causa animal.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
