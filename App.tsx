
import React, { useState, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { summarizeText, startChat, sendMessage } from './services/geminiService';
import { extractTextFromFile } from './services/fileParserService';
import type { ChatMessage } from './types';
import type { Language } from './lib/translations';
import { translations } from './lib/translations';
import { FileUploader } from './components/FileUploader';
import { ResultsView } from './components/ResultsView';
import { Loader } from './components/Loader';
import { LanguageSelector } from './components/LanguageSelector';

const App: React.FC = () => {
    const [pdfText, setPdfText] = useState<string | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [language, setLanguage] = useState<Language>('en');

    const handleFileProcess = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);
        setPdfText(null);
        setSummary(null);
        setMessages([]);
        setChatSession(null);

        try {
            setLoadingMessage(translations[language].parsingMessage);
            const text = await extractTextFromFile(file);
            setPdfText(text);

            setLoadingMessage(translations[language].summaryMessage);
            const generatedSummary = await summarizeText(text, language);
            setSummary(generatedSummary);
            
            setLoadingMessage(translations[language].chatMessage);
            const chat = startChat(text, language);
            setChatSession(chat);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [language]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !chatSession) return;

        const newUserMessage: ChatMessage = { role: 'user', content: userInput };
        // Add a placeholder message that will show a loading indicator.
        const modelResponsePlaceholder: ChatMessage = { role: 'model', content: '' };

        setMessages(prev => [...prev, newUserMessage, modelResponsePlaceholder]);
        const currentInput = userInput;
        setUserInput('');

        try {
            const responseText = await sendMessage(chatSession, currentInput);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'model' && lastMessage.content === '') {
                    lastMessage.content = responseText;
                }
                return newMessages;
            });
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to get response.';
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'model' && lastMessage.content === '') {
                    lastMessage.content = `Error: ${errorMessage}`;
                }
                return newMessages;
            });
        }
    }, [userInput, chatSession]);
    
    const handleReset = () => {
        setPdfText(null);
        setSummary(null);
        setMessages([]);
        setChatSession(null);
        setError(null);
        setIsLoading(false);
        setUserInput('');
    };
    
    const currentTranslations = translations[language];

    return (
        <div className="min-h-screen font-sans flex flex-col items-center p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow">
                <header className="mb-10">
                    <div className="flex justify-between items-center gap-4 mb-4">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text-main tracking-tight flex items-center gap-3">
                            <img src="/logo.png" alt="" className="h-12" />
                            <span>{currentTranslations.appTitle}</span>
                        </h1>
                        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                    </div>
                    <p className="text-lg text-brand-text-muted tracking-wide text-center">
                        {currentTranslations.appSubtitle}
                    </p>
                </header>
                
                <main className="bg-brand-surface/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-10 ring-1 ring-brand-border">
                    {isLoading && <Loader message={loadingMessage} />}
                    
                    {error && (
                        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg mb-4 text-center">
                            <p className="font-bold mb-2">{currentTranslations.errorOccurred}</p>
                            <p className="mb-4">{error}</p>
                            <button onClick={handleReset} className="px-4 py-2 text-sm bg-red-800 hover:bg-red-700 rounded-lg transition-colors">
                                {currentTranslations.tryAgain}
                            </button>
                        </div>
                    )}

                    {!isLoading && !summary && !error && (
                        <FileUploader onFileUpload={handleFileProcess} language={language} />
                    )}
                    
                    {!isLoading && summary && (
                        <ResultsView
                            summary={summary}
                            messages={messages}
                            userInput={userInput}
                            onUserInputChange={(e) => setUserInput(e.target.value)}
                            onSendMessage={handleSendMessage}
                            onReset={handleReset}
                            language={language}
                        />
                    )}
                </main>

                <footer className="text-center mt-auto pt-12 pb-4 text-gray-700 text-xs">
                     <p>
                        <a 
                            href="https://t.me/aybek_jumashev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-gray-500 transition-colors"
                        >
                            {currentTranslations.developedBy}
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;