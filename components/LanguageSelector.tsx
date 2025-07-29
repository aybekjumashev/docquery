import React, { useState, useEffect, useRef } from 'react';
import { Language, languageOptions } from '../lib/translations';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { CheckIcon } from './icons/CheckIcon';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };
  
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const currentLabel = languageOptions.find(opt => opt.value === currentLanguage)?.label || 'Select Language';

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-4 py-2 bg-brand-surface border border-brand-border text-brand-text-main text-sm rounded-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentLabel}</span>
        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-brand-surface border border-brand-border rounded-md shadow-lg z-10 animate-fade-in-up"
          role="listbox"
        >
          <ul className="p-1">
            {languageOptions.map(({ value, label }) => (
              <li key={value}>
                <button
                  onClick={() => handleLanguageSelect(value)}
                  className="w-full text-left flex items-center px-3 py-1.5 text-sm text-brand-text-main hover:bg-brand-secondary rounded-md transition-colors"
                  role="option"
                  aria-selected={currentLanguage === value}
                >
                  <span className="flex-grow">{label}</span>
                  {currentLanguage === value && <CheckIcon className="w-4 h-4 text-brand-primary" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};