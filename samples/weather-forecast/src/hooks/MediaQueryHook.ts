import {useEffect, useState} from 'react';

export const useMediaQuery = (query: string) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    if (mediaMatch.addEventListener) {
      mediaMatch.addEventListener("change", handler)
    } else {
      mediaMatch.addListener(handler)
    }

    return () => mediaMatch.removeEventListener
      ? mediaMatch.removeEventListener("change", handler)
      : mediaMatch.removeListener(handler)
  });
  return matches;
};