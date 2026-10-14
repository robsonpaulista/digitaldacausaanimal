/// <reference types="node" />

const GRAPH_VERSION = 'v24.0';
const POST_LIMIT = 6;
const CAPTION_MAX = 220;
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
const CACHE_OK = 'public, s-maxage=3600, stale-while-revalidate=86400';

type GraphMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

interface GraphMedia {
  id: string;
  caption?: string;
  media_type: GraphMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramPost {
  id: string;
  caption: string;
  type: 'image' | 'video' | 'album';
  image: string;
  permalink: string;
  timestamp: string;
}

const MEDIA_TYPES: Record<GraphMediaType, InstagramPost['type']> = {
  IMAGE: 'image',
  VIDEO: 'video',
  CAROUSEL_ALBUM: 'album',
};

function isGraphMedia(value: unknown): value is GraphMedia {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.permalink === 'string' &&
    typeof item.timestamp === 'string' &&
    typeof item.media_type === 'string' &&
    item.media_type in MEDIA_TYPES
  );
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

function toPost(media: GraphMedia): InstagramPost {
  return {
    id: media.id,
    caption: truncate((media.caption ?? '').trim(), CAPTION_MAX),
    type: MEDIA_TYPES[media.media_type],
    image: (media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url) ?? '',
    permalink: media.permalink,
    timestamp: media.timestamp,
  };
}

function json(body: { posts: InstagramPost[] }, status: number, cacheControl: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cacheControl },
  });
}

function graphError(body: unknown): string {
  if (typeof body !== 'object' || body === null) return 'resposta inválida';
  const error = (body as { error?: { message?: unknown } }).error;
  return typeof error?.message === 'string' ? error.message : 'erro desconhecido';
}

export async function GET(): Promise<Response> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) {
    console.error('Instagram: defina INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID nas variáveis de ambiente.');
    return json({ posts: [] }, 503, 'no-store');
  }

  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(userId)}/media`);
  url.search = new URLSearchParams({ fields: FIELDS, limit: String(POST_LIMIT), access_token: token }).toString();

  try {
    const response = await fetch(url);
    const body: unknown = await response.json();

    if (!response.ok) {
      console.error(`Instagram respondeu ${response.status}: ${graphError(body)}`);
      return json({ posts: [] }, 502, 'no-store');
    }

    const data = typeof body === 'object' && body !== null ? (body as { data?: unknown }).data : undefined;
    const posts = Array.isArray(data) ? data.filter(isGraphMedia).map(toPost).filter((post) => post.image) : [];

    return json({ posts }, 200, CACHE_OK);
  } catch (error) {
    console.error('Instagram: falha ao consultar a Graph API.', error instanceof Error ? error.message : error);
    return json({ posts: [] }, 502, 'no-store');
  }
}
