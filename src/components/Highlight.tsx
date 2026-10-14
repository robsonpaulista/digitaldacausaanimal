import type { ReactNode } from 'react';
import { Scribble } from './icons';

interface HighlightProps {
  children: ReactNode;
  className?: string;
}

export function Highlight({ children, className = '' }: HighlightProps) {
  return (
    <span className={`highlight ${className}`.trim()}>
      {children}
      <Scribble className="highlight__scribble" />
    </span>
  );
}
