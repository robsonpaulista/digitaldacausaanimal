import { Images, Play } from 'lucide-react';
import { CONTACT } from '../data/content';
import { useInstagramPosts } from '../hooks/useInstagramPosts';
import type { InstagramMediaType } from '../services/instagram';
import { InstagramIcon } from './icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import './InstagramFeed.css';

const MEDIA_LABEL: Record<InstagramMediaType, string> = {
  image: 'Foto',
  video: 'Vídeo',
  album: 'Álbum',
};

function MediaBadge({ type }: { type: InstagramMediaType }) {
  if (type === 'image') return null;
  return (
    <span className="insta__badge" aria-hidden="true">
      {type === 'video' ? <Play strokeWidth={2.4} /> : <Images strokeWidth={2.2} />}
    </span>
  );
}

export function InstagramFeed() {
  const posts = useInstagramPosts();
  if (!posts.length) return null;

  return (
    <section id="instagram" className="section section--soft insta" aria-labelledby="instagram-title">
      <div className="container">
        <div className="insta__head">
          <SectionHeading
            id="instagram-title"
            eyebrow="No Instagram"
            title={
              <>
                Acompanhe o dia a dia da <span className="text-blue">causa animal</span>
              </>
            }
          />
          <Reveal delay={80}>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <InstagramIcon strokeWidth={2.2} />
              Seguir {CONTACT.instagramLabel}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ul className="insta__grid">
            {posts.map(({ id, caption, type, image, permalink }) => (
              <li key={id}>
                <a
                  href={permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta__item"
                  aria-label={`${MEDIA_LABEL[type]} no Instagram${caption ? `: ${caption.slice(0, 90)}` : ''}`}
                >
                  <img src={image} alt="" width={320} height={320} loading="lazy" decoding="async" />
                  <MediaBadge type={type} />
                  {caption && (
                    <span className="insta__caption" aria-hidden="true">
                      <span>{caption}</span>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
