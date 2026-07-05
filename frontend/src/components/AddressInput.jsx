import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddressInput = ({ label, onSelect, icon, value, onChange, onUseCurrentLocation, onClear }) => {
  const [internalQuery, setInternalQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const isTypingRef = useRef(false);

  // Sync external value with internal query
  useEffect(() => {
    if (!isTypingRef.current) {
      setInternalQuery(value);
    }
  }, [value]);

  useEffect(() => {
    if (internalQuery.length < 3) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${internalQuery}&format=json&addressdetails=1`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching address:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(debounce);
  }, [internalQuery]);

  const handleInputChange = (e) => {
    isTypingRef.current = true;
    setInternalQuery(e.target.value);
    onChange(e.target.value);
  };

  const handleSelect = (result) => {
    isTypingRef.current = false;
    setInternalQuery(result.display_name);
    setResults([]);
    onSelect({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: result.display_name
    });
  };

  const handleClear = () => {
    isTypingRef.current = false;
    setInternalQuery('');
    setResults([]);
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-dark dark:text-gray-300 mb-1">{label}</label>
      <div className="relative">
        <div className="flex items-center bg-light dark:bg-gray-700 rounded-lg p-3 border border-transparent dark:border-gray-600">
          {icon}
          <input
            type="text"
            value={internalQuery}
            onChange={handleInputChange}
            onBlur={() => (isTypingRef.current = false)}
            className="w-full bg-transparent focus:outline-none ml-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Escribe una dirección..."
          />
          {internalQuery && internalQuery.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400 transition-colors"
              title="Limpiar"
            >
              <FaTimes className="text-gray-600 dark:text-gray-200 text-xs" />
            </button>
          )}
          {onUseCurrentLocation && (
            <button
              type="button"
              className="px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={onUseCurrentLocation}
            >
              <i className="fa-solid fa-crosshairs"></i>
            </button>
          )}
        </div>
        {results.length > 0 && isTypingRef.current && (
          <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
            {results.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleSelect(result)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200 text-sm"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressInput;