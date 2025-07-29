import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage } from '../types';
import { Language, translations } from '../lib/translations';
import { SendIcon } from './icons/SendIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';

interface ResultsViewProps {
  summary: string;
  messages: ChatMessage[];
  userInput: string;
  onUserInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onReset: () => void;
  language: Language;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    const isLoading = !message.content && message.role === 'model';
    
    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center ring-1 ring-white/10">
                    <BotIcon className="w-5 h-5 text-brand-text-main" />
                </div>
            )}
            <div
                className={`max-w-md lg:max-w-xl p-3.5 rounded-2xl shadow-md ${
                isUser 
                    ? 'bg-brand-primary text-white rounded-br-none border border-white/20' 
                    : 'bg-brand-surface border border-brand-border text-brand-text-main rounded-bl-none'
                }`}
            >
                {isLoading ? (
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></span>
                    </div>
                ) : (
                    <div className="prose prose-sm sm:prose-base prose-invert max-w-none prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline" />,
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center ring-1 ring-white/20">
                    <UserIcon className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
};

export const ResultsView: React.FC<ResultsViewProps> = ({
  summary,
  messages,
  userInput,
  onUserInputChange,
  onSendMessage,
  onReset,
  language
}) => {
  const currentTranslations = translations[language];
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-brand-text-main">{currentTranslations.summary}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-text-muted bg-brand-secondary rounded-lg border border-transparent hover:bg-brand-primary/20 hover:border-brand-primary/50 hover:text-brand-text-main transition-colors"
            >
              <RefreshIcon className="w-4 h-4" />
              {currentTranslations.startOver}
            </button>
          </div>
        </div>
        <div className="p-5 bg-brand-bg/50 rounded-lg prose prose-invert max-w-none prose-p:text-brand-text-muted prose-li:text-brand-text-muted">
           <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
               components={{
                    a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline" />,
                }}
           >
             {summary}
           </ReactMarkdown>
        </div>
      </div>

      <div className="border-t border-brand-border-muted pt-8">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-brand-text-main mb-1">{currentTranslations.askQuestions}</h2>
            <p className="text-brand-text-muted">{currentTranslations.askAnything}</p>
        </div>
        
        <div className="h-[500px] flex flex-col bg-brand-bg/50 rounded-lg p-1 sm:p-2">
            <div className="flex-grow overflow-y-auto p-3 pr-2 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full text-brand-text-muted">
                        {currentTranslations.chatPlaceholder}
                    </div>
                )}
                {messages.map((msg, index) => (
                    <ChatBubble key={index} message={msg} />
                ))}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={onSendMessage} className="mt-2 p-2">
                <div className="relative">
                    <input
                        type="text"
                        value={userInput}
                        onChange={onUserInputChange}
                        placeholder={currentTranslations.typeYourQuestion}
                        className="w-full bg-brand-secondary text-brand-text-main placeholder-brand-text-muted pl-5 pr-14 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2 rounded-full hover:bg-brand-primary-hover disabled:bg-brand-secondary disabled:text-brand-text-muted transition-colors"
                        disabled={!userInput.trim()}
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};