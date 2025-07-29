import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { Language, translations } from '../lib/translations';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  language: Language;
}

const ACCEPTED_FILES = "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,.pdf,.docx,.txt";

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, language }) => {
  const [isDragging, setIsDragging] = useState(false);
  const currentTranslations = translations[language];

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileUpload(file);
    }
  };

  return (
    <div
      className={`relative border border-brand-border rounded-xl p-8 text-center transition-all duration-300 ease-in-out group ${
        isDragging ? 'border-brand-primary scale-105' : 'hover:border-brand-primary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className={`absolute -inset-px rounded-xl border-2 border-transparent transition-all duration-300 pointer-events-none ${isDragging ? 'border-brand-primary animate-subtle-pulse' : 'group-hover:border-brand-primary/50'}`}></div>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept={ACCEPTED_FILES}
        onChange={handleChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center p-8">
        <UploadIcon className="w-16 h-16 text-brand-text-muted mb-6 transition-colors group-hover:text-brand-text-main" />
        <p className="text-xl font-semibold text-brand-text-main">
          {currentTranslations.dragAndDrop}
        </p>
        <p className="text-brand-text-muted mt-2">{currentTranslations.orClick}</p>
      </label>
    </div>
  );
};