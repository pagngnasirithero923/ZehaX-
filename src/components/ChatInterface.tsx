import React, { useState, useRef, useEffect } from 'react';
import { Send, Square, MessageCircle, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  apiKey: string;
  onNewChat: () => void;
}

export default function ChatInterface({ apiKey, onNewChat }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsLoading(false);
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ZehaX-AI'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            {
              role: "system",
              content: "ඔයාගේ නම ZehaX-AI. ඔයාව හදපු කෙනා පඤ්ඤාසිරි පොඩි හාමුදුරුවෝ. " +
                      "ඔයාගේ අඩවිය ZehaX. ඔයා හිතකර, සාදෘශ්ය සහායකයෙක්. " +
                      "මම කවුද කියලා අහනකොට, 'මම ZehaX-AI, පඤ්ඤාසිරි හාමුදුරුවන්ගේ AI සහයකයා! 😊' කියලා පිළිතුරු දෙන්න."
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            {
              role: 'user',
              content: input.trim()
            }
          ],
          stream: false
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setIsTyping(false);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      let currentText = '';
      for (let i = 0; i < aiResponse.length; i++) {
        if (controller.signal.aborted) break;
        
        currentText += aiResponse[i];
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id 
              ? { ...msg, content: currentText }
              : msg
          )
        );
        
        await new Promise(resolve => setTimeout(resolve, 20));
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'කණගාටුයි, ඔබගේ ඉල්ලීම සැකසීමේ දෝෂයක් ඇති විය. කරුණාකර ඔබගේ API key පරීක්ෂා කර නැවත උත්සාහ කරන්න.',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setAbortController(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ZehaX-AI</h1>
            <p className="text-sm text-gray-400">පඤ්ඤාසිරි හාමුදුරුවන්ගේ AI සහායකයා</p>
          </div>
        </div>
        <button
          onClick={onNewChat}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>නව සංවාදය</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">ZehaX-AI වෙත සාදරයෙන් පිළිගනිමු!</h3>
            <p>පහත ටයිප් කරන්න ඔබගේ පණිවිඩය ඇතුළත් කරන්න.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-sm text-gray-300">AI සිතමින් ඇත...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ඔබගේ පණිවිඩය ටයිප් කරන්න..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          {isLoading ? (
            <button
              onClick={stopGeneration}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2 animate-pulse"
            >
              <Square className="w-4 h-4" />
              <span className="hidden sm:inline">නවත්තන්න</span>
            </button>
          ) : (
            <button
              onClick={sendMessage}
              disabled={!input.trim() || !apiKey}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
            }
