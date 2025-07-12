import { useEffect } from 'react';
import { updateSEO } from '../lib/seo';

export function useSEO(pageKey: string) {
  useEffect(() => {
    updateSEO(pageKey);
  }, [pageKey]);
}