import type { ReactNode } from 'react';
import { ArrowRight, Cat, Dog, MapPinned, Play, Route, Users, Venus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInstagramPosts } from '../hooks/useInstagramPosts';
import type { InstagramMediaType, InstagramPost } from '../services/instagram';
import {
  BUSAO_HUB_CITIES,
  BUSAO_PERIOD,
  BUSAO_TOTALS,
  TERESINA_AREAS,
  TERESINA_TOTALS,
} from '../data/busaoStats';
import { CONTACT } from '../data/content';
import { ChannelSignupForm } from './ChannelSignupForm';
import { FacebookIcon, InstagramIcon } from './icons';
import { Eyebrow } from './SectionHeading';
import './HeroSlides.css';

const formatNumber = new Intl.NumberFormat('pt-BR').format;
const percentOf = (part: number, total: number): string => `${Math.round((part / total) * 100)}%`;

interface NumberCard {
  value: number;
  label: string;
  detail: string;
  icon: LucideIcon;
}

const NUMBER_CARDS: NumberCard[] = [
  {
    value: BUSAO_TOTALS.cats,
    label: 'gatos',
    detail: `${percentOf(BUSAO_TOTALS.cats, BUSAO_TOTALS.pets)} dos atendimentos`,
    icon: Cat,
  },
  {
    value: BUSAO_TOTALS.dogs,
    label: 'cães',
    detail: `${percentOf(BUSAO_TOTALS.dogs, BUSAO_TOTALS.pets)} dos atendimentos`,
    icon: Dog,
  },
  {
    value: BUSAO_TOTALS.females,
    label: 'fêmeas',
    detail: 'menos ninhadas nas ruas',
    icon: Venus,
  },
  {
    value: BUSAO_TOTALS.tutors,
    label: 'tutores',
    detail: 'atendidos gratuitamente',
    icon: Users,
  },
];

const HIGHLIGHTED_CITIES = 5;
const maxAreaPets = Math.max(...TERESINA_AREAS.map((area) => area.pets));

interface SlideTextProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}

function SlideText({ eyebrow, title, lead, children }: SlideTextProps) {
  return (
    <div className="hero__content">
      <Eyebrow light>{eyebrow}</Eyebrow>
      <h2 className="hero-slide__title">{title}</h2>
      <p className="hero__lead">{lead}</p>
      {children ?? (
        <a href="#busao" className="btn btn--ghost-light">
          Conheça o Busão da Castração
          <ArrowRight className="btn__arrow" strokeWidth={2.5} />
        </a>
      )}
    </div>
  );
}

const MEDIA_LABEL: Record<InstagramMediaType, string> = {
  image: 'Foto',
  video: 'Vídeo',
  album: 'Álbum',
};

function SocialLinks() {
  return (
    <ul className="hs-social" aria-label="Redes sociais">
      <li>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${CONTACT.instagramLabel}`}>
          <InstagramIcon strokeWidth={2.2} />
          Instagram
        </a>
      </li>
      <li>
        <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
          <FacebookIcon strokeWidth={2.2} />
          Facebook
        </a>
      </li>
    </ul>
  );
}

function InstagramStrip({ posts }: { posts: InstagramPost[] }) {
  return (
    <ul className="hs-insta" aria-label="Últimas publicações e redes sociais">
      {posts.map(({ id, caption, type, image, permalink }) => (
        <li key={id} className="hs-insta__post">
          <a
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${MEDIA_LABEL[type]} no Instagram${caption ? `: ${caption.slice(0, 90)}` : ''}`}
          >
            <img src={image} alt="" width={120} height={120} loading="lazy" decoding="async" />
            {type === 'video' && <Play className="hs-insta__play" strokeWidth={2.6} aria-hidden="true" />}
          </a>
        </li>
      ))}
      <li className="hs-insta__social hs-insta__social--instagram">
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Seguir ${CONTACT.instagramLabel} no Instagram`}>
          <InstagramIcon strokeWidth={2.2} />
        </a>
      </li>
      <li className="hs-insta__social">
        <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Seguir no Facebook">
          <FacebookIcon strokeWidth={2.2} />
        </a>
      </li>
    </ul>
  );
}

export function CommunitySlide() {
  const posts = useInstagramPosts();

  return (
    <div className="hero__grid">
      <SlideText
        eyebrow="Fique por dentro"
        title={
          <>
            Acompanhe <span className="text-yellow">cada etapa</span> do programa
          </>
        }
        lead={
          <>
            Siga nossas redes e entre no canal oficial para saber <strong>onde o Busão vai estar</strong> e todas as
            ações do Pacto.
          </>
        }
      >
        {posts.length ? <InstagramStrip posts={posts} /> : <SocialLinks />}
      </SlideText>

      <div className="hs-form">
        <ChannelSignupForm compact />
      </div>
    </div>
  );
}

export function NumbersSlide() {
  return (
    <div className="hero__grid">
      <SlideText
        eyebrow="Busão da Castração em números"
        title={
          <>
            <span className="text-yellow">{formatNumber(BUSAO_TOTALS.pets)}</span> pets castrados e microchipados
          </>
        }
        lead={
          <>
            Em <strong>{BUSAO_TOTALS.actions} ações</strong> em <strong>{BUSAO_TOTALS.hubCities} cidades-polo</strong>{' '}
            que também receberam pets de municípios vizinhos, {BUSAO_PERIOD}, sem custo para o tutor.
          </>
        }
      />

      <ul className="hs-numbers">
        {NUMBER_CARDS.map(({ value, label, detail, icon: Icon }) => (
          <li key={label} className="hs-numbers__card">
            <span className="icon-tile icon-tile--yellow">
              <Icon strokeWidth={2} />
            </span>
            <strong>{formatNumber(value)}</strong>
            <span className="hs-numbers__label">{label}</span>
            <small>{detail}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CitiesSlide() {
  return (
    <div className="hero__grid">
      <SlideText
        eyebrow="Por onde o Busão passou"
        title={
          <>
            <span className="text-yellow">{BUSAO_TOTALS.hubCities} cidades-polo</span> e suas vizinhas
          </>
        }
        lead={
          <>
            O Busão se instala em cidades estratégicas e recebe também <strong>tutores dos municípios vizinhos</strong>.
          </>
        }
      />

      <div className="hs-panel">
        <p className="hs-panel__title">
          <MapPinned strokeWidth={2.2} />
          Pets atendidos por cidade-polo
        </p>
        <ul className="hs-cities">
          {BUSAO_HUB_CITIES.map(({ name, pets }, position) => (
            <li key={name} className={position < HIGHLIGHTED_CITIES ? 'is-top' : ''}>
              <span>{name}</span>
              <strong>{formatNumber(pets)}</strong>
            </li>
          ))}
        </ul>
        <p className="hs-panel__note">
          <Route strokeWidth={2.2} />
          Cada polo atende também os municípios do entorno.
        </p>
      </div>
    </div>
  );
}

export function TeresinaSlide() {
  return (
    <div className="hero__grid">
      <SlideText
        eyebrow="Teresina"
        title={
          <>
            O Busão foi até os <span className="text-yellow">bairros da capital</span>
          </>
        }
        lead={
          <>
            <strong>{TERESINA_TOTALS.actions} ações</strong> em zonas e bairros de Teresina, com{' '}
            <strong>{formatNumber(TERESINA_TOTALS.pets)} pets</strong> castrados e microchipados perto de casa.
          </>
        }
      />

      <div className="hs-panel">
        <p className="hs-panel__title">
          <MapPinned strokeWidth={2.2} />
          Pets atendidos por região
        </p>
        <ul className="hs-areas">
          {TERESINA_AREAS.map(({ name, pets, actions }) => (
            <li key={name}>
              <span className="hs-areas__name">
                {name}
                {actions > 1 && <small>{actions} ações</small>}
              </span>
              <span className="hs-areas__bar" aria-hidden="true">
                <span style={{ width: `${(pets / maxAreaPets) * 100}%` }} />
              </span>
              <strong>{formatNumber(pets)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
