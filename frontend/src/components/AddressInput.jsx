import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AddressInput = ({ label, onSelect, icon, value, onChange, onUseCurrentLocation }) => {
  const [internalQuery, setInternalQuery] = useState(value); // Internal state for typing
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const isTypingRef = useRef(false); // Track if user is actively typing

  // Sync external value with internal query
  useEffect(() => {
    if (!isTypingRef.current) { // Only update internalQuery if not actively typing
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
  }, [internalQuery]); // Depend on internalQuery

  const handleInputChange = (e) => {
    isTypingRef.current = true; // User is typing
    setInternalQuery(e.target.value);
    onChange(e.target.value); // Propagate change to parent
  };

  const handleSelect = (result) => {
    isTypingRef.current = false; // User selected, no longer typing
    setInternalQuery(result.display_name); // Update internal query
    setResults([]); // Clear results
    onSelect({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: result.display_name
    });
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
            onBlur={() => isTypingRef.current = false}
            className="w-full bg-transparent focus:outline-none ml-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Escribe una dirección..."
          />
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