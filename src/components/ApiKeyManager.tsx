import React, { useState } from 'react';
import { Key, Eye, EyeOff, Save, X } from 'lucide-react';

interface ApiKeyManagerProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onClose: () => void;
}

export default function ApiKeyManager({ apiKey, onApiKeyChange, onClose }: ApiKeyManagerProps) {
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [useCustomKey, setUseCustomKey] = useState(false);

  const defaultKey = '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';

  const handleSave = () => {
    onApiKeyChange(useCustomKey ? tempKey : defaultKey);
    onClose();
  };

  const handleReset = () => {
    setUseCustomKey(false);
    setTempKey(defaultKey);
    onApiKeyChange(defaultKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-white">API Key Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
              <input
                type="checkbox"
                checked={!useCustomKey}
                onChange={(e) => setUseCustomKey(!e.target.checked)}
                className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Use default API key</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
              <input
                type="checkbox"
                checked={useCustomKey}
                onChange={(e) => setUseCustomKey(e.target.checked)}
                className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Use custom API key</span>
            </label>
          </div>

          {useCustomKey && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Custom ZehaX API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="Enter your ZehaX API key"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-400 bg-gray-700/50 p-3 rounded-lg">
            <p className="font-medium text-emerald-400 mb-1">Default Key Info:</p>
            <p>A default ZehaX API key is provided for your convenience. You can also use your own key for unlimited usage.</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}