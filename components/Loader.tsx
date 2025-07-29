import React from 'react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-t-brand-primary border-brand-border rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-medium text-brand-text-muted">{message}</p>
    </div>
  );
};