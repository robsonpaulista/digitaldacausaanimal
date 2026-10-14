import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const style = { '--delay': `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} style={style} className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
