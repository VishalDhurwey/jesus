import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Copy } from 'lucide-react'; // Import Copy icon
import axios from 'axios'; // Import axios for API calls
import GlitchAsciiArt from './components/GlitchAsciiArt';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Ask me anything about the Bible's teachings...", isBot: true },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput('');
    setMessages((prev) => [...prev, { text: 'Getting Response From The Heaven...', isBot: true }]);

    try {
      const response = await axios.post('http://192.168.0.100:5000/get_chat_response', null, {
        params: { user_query: input },
      });

      const botResponse = response.data || 'Sorry, I could not understand that.';
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { text: botResponse, isBot: true },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { text: 'Sorry, there was an error processing your request.', isBot: true },
      ]);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('0x1234567890abcdef').then(() => {
      alert('Address copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col">
  <div className="max-w-full">
    {/* Header Section */}
    <header className="text-left py-4 px-4 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div className="flex flex-col justify-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Biblical AI Guide</h1>
        <p className="text-green-400 opacity-75 text-sm md:text-base">
          Seek wisdom through digital revelation
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm sm:text-base">Contact Address:</p>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 truncate">0x1234567890abcdef</span>
          <button onClick={copyAddress} className="text-green-400">
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    {/* Main Content Section */}
    <div className="border-t border-green-600 grid grid-cols-1 md:grid-cols-2 p-4 md:p-10 gap-4">
      <div className="flex justify-center">
        <div className="w-full max-w-sm h-48 sm:h-64 md:h-72">
          {/* Glitch Art Component */}
          <GlitchAsciiArt />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="bg-gray-900 rounded-lg p-4 w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800">
          <div className="space-y-4">
            {messages.map((user_query, index) => (
              <div
                key={index}
                className={`flex ${user_query.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    user_query.isBot ? 'text-green-500' : 'text-green-300'
                  }`}
                >
                  {user_query.isBot && (
                    <div className="w-6 h-6 mt-1 flex-shrink-0">
                      <Bot className="w-full h-full" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded ${
                      user_query.isBot ? 'bg-gray-800' : 'bg-gray-700'
                    }`}
                  >
                    <p className="text-sm sm:text-base">{user_query.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-4 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 bg-gray-900 text-green-500 p-3 rounded-lg border border-green-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder-green-700"
          />
          <button
            type="submit"
            className="bg-green-900 hover:bg-green-800 text-green-500 p-3 rounded-lg transition-colors duration-200"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <footer className="bg-gray-900 py-4 border-t border-green-600 mt-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <p className="text-green-400 opacity-75 text-sm sm:text-base">
      © 2024 Biblical AI Guide
    </p>
    <div className="flex space-x-4">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400"
      >
        {/* Twitter Icon */}
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.16.87A4.48 4.48 0 0 0 22.36 1a9.93 9.93 0 0 1-3.17 1.21A4.47 4.47 0 0 0 16.61 0c-2.46 0-4.45 1.99-4.45 4.45 0 .35.04.7.11 1.03A12.64 12.64 0 0 1 2.6 2.1a4.44 4.44 0 0 0-.6 2.24c0 1.55.79 2.92 1.98 3.73A4.47 4.47 0 0 1 .9 6.76v.06c0 2.17 1.55 4.02 3.63 4.43a4.48 4.48 0 0 1-1.18.16c-.29 0-.57-.03-.85-.08a4.47 4.47 0 0 0 4.16 3.1A8.95 8.95 0 0 1 0 19.54a12.68 12.68 0 0 0 6.92 2.03c8.29 0 12.85-6.88 12.85-12.85 0-.2 0-.4-.02-.6A9.95 9.95 0 0 0 24 4.4a9.94 9.94 0 0 1-2.68.73z" />
        </svg>
      </a>
      <a
        href="https://discord.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400"
      >
        {/* Discord Icon */}
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 15-5-3 5-3v6zm-1-7-5-3 5-3v6z" />
        </svg>
      </a>
      <a
        href="https://telegram.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400"
      >
        {/* Telegram Icon */}
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13l-3-3L2 22l9-5 3 3 11-16z" />
        </svg>
      </a>
    </div>
  </footer>
</div>
  );
}

export default App;
