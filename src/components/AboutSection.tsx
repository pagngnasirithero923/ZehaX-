import React from 'react';
import { Phone, Mail, User, Code, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">About ZehaX-AI</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          ZehaX-AI is a cutting-edge AI chatbot powered by advanced language models, designed to provide intelligent and helpful responses to your queries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-emerald-500" />
            Developer Info
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Age:</span>
              <span>17 years old</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Status:</span>
              <span>Single Developer</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Passionate about AI & Technology</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-emerald-500" />
              <span>074407177</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-5 h-5 text-emerald-500" />
              <span>psehan610@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg p-4 border border-emerald-500/30">
        <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
        <ul className="text-gray-300 space-y-1">
          <li>• Real-time AI conversations</li>
          <li>• Typing animations for natural interaction</li>
          <li>• Customizable API key management</li>
          <li>• Professional, responsive design</li>
          <li>• Stop generation functionality</li>
        </ul>
      </div>
    </div>
  );
}