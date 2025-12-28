import { useState, useEffect } from "react";

/**
 * Custom hook for media query matching
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the media query matches
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update state initially
    setMatches(media.matches);

    // Create event listener
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Clean up
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
