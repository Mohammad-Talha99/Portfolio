import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import ReactMarkdown from 'react-markdown';
import { useTheme } from './ThemeProvider';

const ChatInterface = () => {
    const { isDarkMode } = useTheme();
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am an AI assistant. Ask me anything about this portfolio.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = { role: 'assistant', content: '' };

            setMessages((prev) => [...prev, assistantMessage]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                assistantMessage.content += chunk;

                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...assistantMessage };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto p-4">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex items-start max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 dark:border-white/20">
                                    <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt="Bot" width={32} height={32} className="w-full h-full object-cover" />
                                </div>
                            )}
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 dark:border-white/20">
                                    <Image src={assets.user_image} alt="User" width={32} height={32} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div
                                className={`p-3 rounded-2xl prose max-w-none prose-sm leading-relaxed font-Ovo ${msg.role === 'user'
                                    ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-none prose-invert dark:prose-slate'
                                    : 'bg-gray-100 text-gray-800 dark:bg-darkHover dark:text-white rounded-tl-none border border-gray-200 dark:border-white/10 dark:prose-invert'
                                    }`}
                            >
                                <ReactMarkdown
                                    components={{
                                        a: ({ node, ...props }) => <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                        code: ({ node, ...props }) => <code {...props} className="bg-black/10 dark:bg-white/10 rounded px-1 py-0.5" />,
                                        pre: ({ node, ...props }) => <pre {...props} className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto" />
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-darkHover rounded-2xl rounded-tl-none border border-gray-200 dark:border-white/10">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something about me..."
                    className="w-full p-4 pr-12 rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-darkHover focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/50 text-gray-800 dark:text-white shadow-sm font-Ovo transition-all"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 p-2 bg-black dark:bg-white rounded-full text-white dark:text-black hover:opacity-80 disabled:opacity-50 transition-all"
                >
                    <Image src={assets.send_icon} alt="Send" className="w-5 h-5 invert dark:invert-0" />
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
