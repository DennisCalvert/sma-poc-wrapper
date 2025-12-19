'use client';

import { useWrapper } from '@/components/WrapperProvider';

export default function Home() {
  const { submodules, featureFlags, getSubmoduleBranch } = useWrapper();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <main className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SMA POC Wrapper
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Wrapper application for submodule management and feature flags
          </p>
          <div className="mt-4 inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
            {process.env.NODE_ENV === 'development' ? '🔧 Development Mode' : '🚀 Production Mode'}
          </div>
        </div>

        {/* Submodules Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Loaded Submodules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submodules.map((submodule, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {submodule.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {submodule.repository}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Active Branch:
                    </span>
                    <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                      {getSubmoduleBranch(submodule.name)}
                    </span>
                  </div>
                  {submodule.currentBranch && (
                    <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
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
                      Branch override active
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Flags Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Feature Flags
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featureFlags.map((flag, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    flag.enabled
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {flag.name}
                    </h3>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        flag.enabled ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  {flag.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {flag.description}
                    </p>
                  )}
                  <div className="mt-2 text-xs font-medium">
                    <span
                      className={
                        flag.enabled
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }
                    >
                      {flag.enabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        {process.env.NODE_ENV === 'development' && (
          <section className="mt-12">
            <div className="bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Developer Tools Available
              </h3>
              <p className="text-purple-800 dark:text-purple-200">
                Click the <strong>&quot;Dev Tools&quot;</strong> button in the bottom-right corner to:
              </p>
              <ul className="mt-3 space-y-2 text-purple-800 dark:text-purple-200">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Override submodule branches for testing different versions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Toggle feature flags on/off to test different configurations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Changes are persisted in localStorage for your convenience</span>
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
