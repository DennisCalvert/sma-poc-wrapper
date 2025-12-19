'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FederatedModuleConfig, FeatureFlag } from '@/types';
import { defaultFederatedModules, defaultFeatureFlags } from '@/lib/config';

interface WrapperContextType {
  federatedModules: FederatedModuleConfig[];
  featureFlags: FeatureFlag[];
  isFeatureEnabled: (flagName: string) => boolean;
  getModuleUrl: (moduleName: string) => string;
}

const WrapperContext = createContext<WrapperContextType | undefined>(undefined);

export function WrapperProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage in development mode
  const [federatedModules, setFederatedModules] = useState<FederatedModuleConfig[]>(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
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
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      try {
        const saved = localStorage.getItem('devtools-flags');
        return saved ? JSON.parse(saved) : defaultFeatureFlags;
      } catch {
        return defaultFeatureFlags;
      }
    }
    return defaultFeatureFlags;
  });

  // Listen for storage changes in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Handle localStorage changes
      // Note: storage event only fires for changes from other tabs/windows
      // focus event ensures we sync when returning to this tab
      const handleStorageChange = () => {
        try {
          const updated = localStorage.getItem('devtools-federated-modules');
          const updatedFlags = localStorage.getItem('devtools-flags');
          if (updated) setFederatedModules(JSON.parse(updated));
          if (updatedFlags) setFeatureFlags(JSON.parse(updatedFlags));
        } catch {
          // Silently ignore parse errors
        }
      };

      window.addEventListener('storage', handleStorageChange);
      // Check for updates when window regains focus
      window.addEventListener('focus', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('focus', handleStorageChange);
      };
    }
  }, []);

  const isFeatureEnabled = (flagName: string): boolean => {
    const flag = featureFlags.find((f) => f.name === flagName);
    return flag?.enabled ?? false;
  };

  const getModuleUrl = (moduleName: string): string => {
    const federatedModule = federatedModules.find((m) => m.name === moduleName);
    return federatedModule?.overrideUrl || federatedModule?.remoteUrl || '';
  };

  return (
    <WrapperContext.Provider
      value={{
        federatedModules,
        featureFlags,
        isFeatureEnabled,
        getModuleUrl,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
}

export function useWrapper() {
  const context = useContext(WrapperContext);
  if (context === undefined) {
    throw new Error('useWrapper must be used within a WrapperProvider');
  }
  return context;
}
