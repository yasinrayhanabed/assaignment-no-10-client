import { useEffect } from 'react';

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `LearnVerse | ${title}`;
    return () => {
      document.title = 'LearnVerse';
    };
  }, [title]);
};