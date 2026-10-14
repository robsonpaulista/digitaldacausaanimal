import { STATS, type Stat } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { PawShape, Sparks } from './icons';
import './Impact.css';

const numberFormatter = new Intl.NumberFormat('pt-BR');

interface StatItemProps {
  stat: Stat;
  start: boolean;
}

function StatItem({ stat, start }: StatItemProps) {
  const { value, prefix = '', suffix = '', label, icon: Icon } = stat;
  const current = useCountUp(value, start);

  return (
    <li className="impact__item">
      <span className="icon-tile icon-tile--glass">
        <Icon strokeWidth={1.9} />
      </span>
      <strong className="impact__value">
        {prefix}
        {numberFormatter.format(current)}
        {suffix}
      </strong>
      <span className="impact__label">{label}</span>
    </li>
  );
}

export function Impact() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="impact" aria-labelledby="impacto-title">
      <div className="container">
        <div ref={ref} className="impact__box bg-brand bg-grid">
          <PawShape className="paw-decor impact__paw impact__paw--1" />
          <PawShape className="paw-decor impact__paw impact__paw--2" />

          <div className="impact__header">
            <h2 id="impacto-title" className="title-lg">
              Nosso impacto <span className="text-yellow">em números</span>
            </h2>
            <p className="hand impact__hand">
              cada número é uma vida!
              <Sparks className="impact__sparks" />
            </p>
          </div>

          <ul className="impact__grid">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} start={inView} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
