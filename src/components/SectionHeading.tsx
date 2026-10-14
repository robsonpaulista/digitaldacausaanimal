import type { ReactNode } from 'react';
import { PawPrint } from 'lucide-react';
import { Reveal } from './Reveal';
import './SectionHeading.css';

interface EyebrowProps {
  children: ReactNode;
  light?: boolean;
}

export function Eyebrow({ children, light = false }: EyebrowProps) {
  return (
    <span className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>
      <span className="eyebrow__icon">
        <PawPrint strokeWidth={2.4} />
      </span>
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 id={id} className="title-lg">
        {title}
      </h2>
      {description && <p className="lead">{description}</p>}
    </Reveal>
  );
}
