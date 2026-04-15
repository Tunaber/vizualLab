import { useState, useEffect, useRef } from 'react';
import type { GeoLocation } from '../types/weather';
import './CitySearch.css';

interface CitySearchProps {
  onCitySelect: (location: GeoLocation) => void;
  onSearch: (query: string) => Promise<GeoLocation[]>;
  currentCity?: string;
}

export function CitySearch({ onCitySelect, onSearch, currentCity }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await onSearch(query);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSelect = (location: GeoLocation) => {
    onCitySelect(location);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="city-search" ref={wrapperRef}>
      <div className="city-search__input-wrapper">
        <svg className="city-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="city-search__input"
          placeholder={currentCity || 'Поиск города...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        {isLoading && <div className="city-search__spinner" />}
      </div>
      {isOpen && results.length > 0 && (
        <ul className="city-search__results">
          {results.map((loc, idx) => (
            <li key={idx} className="city-search__result" onClick={() => handleSelect(loc)}>
              <span className="city-search__result-name">{loc.name}</span>
              <span className="city-search__result-country">
                {loc.country} {loc.state && `, ${loc.state}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
