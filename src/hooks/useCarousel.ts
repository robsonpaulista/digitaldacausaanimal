import { useCallback, useEffect, useState } from 'react';

export interface Carousel {
  index: number;
  playing: boolean;
  running: boolean;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  togglePlaying: () => void;
  setHovered: (hovered: boolean) => void;
  setFocused: (focused: boolean) => void;
}

const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useCarousel(count: number, interval = 7000): Carousel {
  const [index, setIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [pageVisible, setPageVisible] = useState<boolean>(true);

  const goTo = useCallback((target: number) => setIndex(((target % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((current) => (current + 1) % count), [count]);
  const prev = useCallback(() => setIndex((current) => (current - 1 + count) % count), [count]);
  const togglePlaying = useCallback(() => setPlaying((current) => !current), []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const running = playing && !hovered && !focused && pageVisible;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(next, interval);
    return () => window.clearTimeout(timer);
  }, [running, index, interval, next]);

  return { index, playing, running, goTo, next, prev, togglePlaying, setHovered, setFocused };
}
