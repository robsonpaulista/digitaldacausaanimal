export type InstagramMediaType = 'image' | 'video' | 'album';

export interface InstagramPost {
  id: string;
  caption: string;
  type: InstagramMediaType;
  image: string;
  permalink: string;
  timestamp: string;
}

const MEDIA_TYPES: readonly string[] = ['image', 'video', 'album'] satisfies InstagramMediaType[];

function isInstagramPost(value: unknown): value is InstagramPost {
  if (typeof value !== 'object' || value === null) return false;
  const post = value as Record<string, unknown>;
  return (
    typeof post.id === 'string' &&
    typeof post.caption === 'string' &&
    typeof post.type === 'string' &&
    MEDIA_TYPES.includes(post.type) &&
    typeof post.image === 'string' &&
    post.image.startsWith('https://') &&
    typeof post.permalink === 'string' &&
    post.permalink.startsWith('https://www.instagram.com/') &&
    typeof post.timestamp === 'string'
  );
}

export async function fetchInstagramPosts(signal?: AbortSignal): Promise<InstagramPost[]> {
  const response = await fetch('/api/instagram', { signal });
  if (!response.ok) throw new Error(`Feed do Instagram respondeu ${response.status}`);

  const data: unknown = await response.json();
  const posts = typeof data === 'object' && data !== null ? (data as { posts?: unknown }).posts : undefined;
  return Array.isArray(posts) ? posts.filter(isInstagramPost) : [];
}
