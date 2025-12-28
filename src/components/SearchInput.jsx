import { Search } from "lucide-react";
import { useState } from "react";

/**
 * Search input component with debouncing
 * @param {Object} props
 * @param {Function} props.onSearch - Search handler function
 * @param {string} props.placeholder - Input placeholder text
 * @param {number} props.debounceDelay - Debounce delay in ms
 */
export default function SearchInput({
  onSearch,
  placeholder = "Search...",
  debounceDelay = 300,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear existing timer
    if (timer) clearTimeout(timer);

    // Set new timer for debouncing
    const newTimer = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);

    setTimer(newTimer);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    if (timer) clearTimeout(timer);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="input pl-10 pr-10"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Clear search"
        >
          <span className="text-sm">✕</span>
        </button>
      )}
    </div>
  );
}
