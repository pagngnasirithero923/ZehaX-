import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import AboutSection from './components/AboutSection';

function App() {
  const [apiKey, setApiKey] = useState('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');
  const [showApiManager, setShowApiManager] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [chatKey, setChatKey] = useState(0); // For resetting chat

  const handleNewChat = () => {
    setChatKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Top Navigation */}
        <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <h1 className="text-xl font-bold text-white">ZehaX-AI</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAbout(true)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                title="About"
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowApiManager(true)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                title="API Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface
            key={chatKey}
            apiKey={apiKey}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-3">
          <div className="text-center text-sm text-gray-400">
            <p>© 2025 ZehaX-AI - Built with ❤️ by a 17-year-old developer | developer by Rev.Pagngnasiri Threo </p>
          </div>
        </footer>
      </div>

      {/* Modals */}
      {showApiManager && (
        <ApiKeyManager
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          onClose={() => setShowApiManager(false)}
        />
      )}

      {showAbout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">About ZehaX-AI</h2>
              <button
                onClick={() => setShowAbout(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <AboutSection />
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
