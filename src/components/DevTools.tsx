'use client';

import { useState, useEffect } from 'react';
import { FederatedModuleConfig, FeatureFlag } from '@/types';
import { defaultFederatedModules, defaultFeatureFlags } from '@/lib/config';

export default function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'modules' | 'flags'>('modules');
  
  // Initialize state from localStorage
  const [federatedModules, setFederatedModules] = useState<FederatedModuleConfig[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('devtools-federated-modules');
        return saved ? JSON.parse(saved) : defaultFederatedModules;
      } catch {
        return defaultFederatedModules;
      }
    }
    return defaultFederatedModules;
  });
  
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('devtools-flags');
        return saved ? JSON.parse(saved) : defaultFeatureFlags;
      } catch {
        return defaultFeatureFlags;
      }
    }
    return defaultFeatureFlags;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('devtools-federated-modules', JSON.stringify(federatedModules));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, [federatedModules]);

  useEffect(() => {
    try {
      localStorage.setItem('devtools-flags', JSON.stringify(featureFlags));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, [featureFlags]);

  const handleUrlChange = (index: number, url: string) => {
    const updated = [...federatedModules];
    updated[index].overrideUrl = url ? url : undefined;
    setFederatedModules(updated);
  };

  const handleFlagToggle = (index: number) => {
    const updated = [...featureFlags];
    updated[index].enabled = !updated[index].enabled;
    setFeatureFlags(updated);
  };

  const handleReset = () => {
    setFederatedModules(defaultFederatedModules);
    setFeatureFlags(defaultFeatureFlags);
    try {
      localStorage.removeItem('devtools-federated-modules');
      localStorage.removeItem('devtools-flags');
    } catch {
      // Silently fail if localStorage is unavailable
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
        title="Developer Tools"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
        Dev Tools
      </button>

      {/* Dev Tools Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="font-bold text-lg">Developer Tools</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-purple-700 rounded p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('modules')}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === 'modules'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Federated Modules
            </button>
            <button
              onClick={() => setActiveTab('flags')}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === 'flags'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Feature Flags
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {activeTab === 'modules' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Override federated module remote URLs for testing
                </p>
                {federatedModules.map((module, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {module.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Scope: {module.scope} | Module: {module.module}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                          Default Remote URL
                        </label>
                        <input
                          type="text"
                          value={module.remoteUrl}
                          disabled
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                          Override URL (optional)
                        </label>
                        <input
                          type="text"
                          value={module.overrideUrl || ''}
                          onChange={(e) => handleUrlChange(index, e.target.value)}
                          placeholder="e.g., http://localhost:3005/remoteEntry.js"
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      {module.overrideUrl && (
                        <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Using override: {module.overrideUrl}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'flags' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Toggle feature flags for testing
                </p>
                {featureFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {flag.name}
                      </h3>
                      {flag.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {flag.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleFlagToggle(index)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        flag.enabled
                          ? 'bg-purple-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          flag.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900/50">
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
            >
              Reset All to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
