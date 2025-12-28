import { useState, useEffect } from "react";

/**
 * Custom hook for syncing state with localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value
 * @returns {[any, Function]} - State value and setter function
 */
export default function useLocalStorage(key, initialValue) {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      if (storedValue === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
