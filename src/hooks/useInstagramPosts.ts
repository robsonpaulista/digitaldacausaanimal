import { useEffect, useState } from 'react';
import { fetchInstagramPosts, type InstagramPost } from '../services/instagram';

export function useInstagramPosts(): InstagramPost[] {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchInstagramPosts(controller.signal)
      .then(setPosts)
      .catch(() => {
        if (!controller.signal.aborted) setPosts([]);
      });

    return () => controller.abort();
  }, []);

  return posts;
}
