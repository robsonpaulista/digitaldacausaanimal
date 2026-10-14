import { useRef } from 'react';
import type { CSSProperties, FocusEvent, KeyboardEvent, PointerEvent, ReactNode } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, HandHeart, HeartHandshake, Pause, Play, Truck } from 'lucide-react';
import { BUSAO_TOTALS } from '../data/busaoStats';
import { useCarousel } from '../hooks/useCarousel';
import { CitiesSlide, CommunitySlide, NumbersSlide, TeresinaSlide } from './HeroSlides';
import { CurvedArrow, PawShape, Sparks } from './icons';
import { Reveal } from './Reveal';
import './Hero.css';

const TRUST_AVATARS = ['/images/hero-cat.jpg', '/images/puppy.jpg', '/images/about-dog.jpg'];
const AUTOPLAY_MS = 8000;
const SWIPE_THRESHOLD = 50;

function IntroSlide() {
  return (
    <div className="hero__grid">
      <div className="hero__content">
        <Reveal>
          <h1 id="hero-title" className="title-xl hero__title">
            Digital da <span className="text-yellow">Causa Animal</span>
            <span className="hero__title-place">no Piauí</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero__lead">
            Informação, mobilização e políticas públicas para <strong>proteção e bem-estar animal.</strong>
          </p>
        </Reveal>

        <Reveal delay={240} className="btn-group">
          <a href="#ajudar" className="btn btn--yellow">
            Faça parte dessa causa! <span aria-hidden="true">🐾</span>
            <ArrowRight className="btn__arrow" strokeWidth={2.5} />
          </a>
          <a href="#busao" className="btn btn--ghost-light">
            <HandHeart strokeWidth={2.2} />
            Quero castrar meu pet
          </a>
        </Reveal>

        <Reveal delay={320} className="hero__trust">
          <div className="hero__avatars" aria-hidden="true">
            {TRUST_AVATARS.map((src) => (
              <img key={src} src={src} alt="" width={48} height={48} loading="lazy" />
            ))}
          </div>
          <p>
            <strong>+{Math.floor(BUSAO_TOTALS.pets / 1000)} mil</strong> animais castrados
            <br />
            com segurança e carinho
          </p>
        </Reveal>
      </div>

      <div className="hero__visual">
        <div className="hero__circle" aria-hidden="true" />

        <div className="hero__photo hero__photo--main">
          <img
            src="/images/hero-dog.jpg"
            alt="Cachorro beagle feliz olhando para a câmera"
            width={1000}
            height={750}
            fetchPriority="high"
          />
        </div>

        <div className="hero__photo hero__photo--cat">
          <img src="/images/hero-cat.jpg" alt="Gato rajado de olhos verdes" width={1000} height={1000} />
        </div>

        <Sparks className="hero__sparks" />

        <p className="hero__note hand">
          Eles não têm pedigree,
          <br />
          mas têm amor <span>de sobra!</span>
          <CurvedArrow className="hero__note-arrow" />
        </p>

        <div className="hero__card hero__card--top">
          <span className="icon-tile icon-tile--yellow">
            <Truck />
          </span>
          <span>
            <strong>Busão da Castração</strong>
            <small>na sua cidade</small>
          </span>
        </div>

        <div className="hero__card hero__card--bottom">
          <span className="icon-tile">
            <HeartHandshake />
          </span>
          <span>
            <strong>100% gratuito</strong>
            <small>para o tutor</small>
          </span>
        </div>
      </div>
    </div>
  );
}

interface Slide {
  label: string;
  content: ReactNode;
}

const SLIDES: Slide[] = [
  { label: 'Digital da Causa Animal', content: <IntroSlide /> },
  { label: 'Busão da Castração em números', content: <NumbersSlide /> },
  { label: 'Cidades-polo atendidas', content: <CitiesSlide /> },
  { label: 'Bairros de Teresina', content: <TeresinaSlide /> },
  { label: 'Fique por dentro', content: <CommunitySlide /> },
];

export function Hero() {
  const { index, playing, running, goTo, next, prev, togglePlaying, setHovered, setFocused } = useCarousel(
    SLIDES.length,
    AUTOPLAY_MS,
  );
  const pointerStartX = useRef<number | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.pointerType === 'mouse' ? null : event.clientX;
  };

  const handlePointerCancel = () => {
    pointerStartX.current = null;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX < 0) next();
    else prev();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  };

  const progressStyle = { '--hero-autoplay': `${AUTOPLAY_MS}ms` } as CSSProperties;

  return (
    <section
      id="inicio"
      className="hero bg-brand bg-grid"
      aria-labelledby="hero-title"
      aria-roledescription="carrossel"
    >
      <PawShape className="paw-decor hero__paw hero__paw--1" />
      <PawShape className="paw-decor hero__paw hero__paw--2" />
      <PawShape className="paw-decor hero__paw hero__paw--3" />

      <div
        className="container hero__stage"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <div
          className="hero__slides"
          aria-live={running ? 'off' : 'polite'}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {SLIDES.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <div
                key={slide.label}
                className={`hero__slide ${active ? 'is-active' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} de ${SLIDES.length}: ${slide.label}`}
                aria-hidden={!active}
                inert={!active}
              >
                {slide.content}
              </div>
            );
          })}
        </div>

        <div className="hero__controls">
          <button type="button" className="hero__arrow" onClick={prev} aria-label="Destaque anterior">
            <ChevronLeft strokeWidth={2.5} />
          </button>

          <div className="hero__dots" style={progressStyle}>
            {SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.label}
                type="button"
                className={`hero__dot ${slideIndex === index ? 'is-active' : ''} ${running ? 'is-running' : ''}`}
                onClick={() => goTo(slideIndex)}
                aria-label={`Ir para o destaque ${slideIndex + 1}: ${slide.label}`}
                aria-current={slideIndex === index}
              >
                <span className="hero__dot-track" />
              </button>
            ))}
          </div>

          <button type="button" className="hero__arrow" onClick={next} aria-label="Próximo destaque">
            <ChevronRight strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="hero__arrow hero__arrow--play"
            onClick={togglePlaying}
            aria-label={playing ? 'Pausar troca automática' : 'Retomar troca automática'}
          >
            {playing ? <Pause strokeWidth={2.5} /> : <Play strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </section>
  );
}
