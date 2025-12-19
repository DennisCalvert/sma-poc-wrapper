'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SubmoduleConfig, FeatureFlag } from '@/types';
import { defaultSubmodules, defaultFeatureFlags } from '@/lib/config';

interface WrapperContextType {
  submodules: SubmoduleConfig[];
  featureFlags: FeatureFlag[];
  isFeatureEnabled: (flagName: string) => boolean;
  getSubmoduleBranch: (moduleName: string) => string;
}

const WrapperContext = createContext<WrapperContextType | undefined>(undefined);

export function WrapperProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage in development mode
  const [submodules, setSubmodules] = useState<SubmoduleConfig[]>(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const saved = localStorage.getItem('devtools-submodules');
      return saved ? JSON.parse(saved) : defaultSubmodules;
    }
    return defaultSubmodules;
  });
  
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const saved = localStorage.getItem('devtools-flags');
      return saved ? JSON.parse(saved) : defaultFeatureFlags;
    }
    return defaultFeatureFlags;
  });

  // Listen for storage changes in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Listen for storage changes (in case DevTools updates them)
      const handleStorageChange = () => {
        const updated = localStorage.getItem('devtools-submodules');
        const updatedFlags = localStorage.getItem('devtools-flags');
        if (updated) setSubmodules(JSON.parse(updated));
        if (updatedFlags) setFeatureFlags(JSON.parse(updatedFlags));
      };

      window.addEventListener('storage', handleStorageChange);
      
      // Also poll for changes since storage event doesn't fire in the same tab
      const interval = setInterval(handleStorageChange, 1000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, []);

  const isFeatureEnabled = (flagName: string): boolean => {
    const flag = featureFlags.find((f) => f.name === flagName);
    return flag?.enabled ?? false;
  };

  const getSubmoduleBranch = (moduleName: string): string => {
    const submodule = submodules.find((m) => m.name === moduleName);
    return submodule?.currentBranch || submodule?.defaultBranch || 'main';
  };

  return (
    <WrapperContext.Provider
      value={{
        submodules,
        featureFlags,
        isFeatureEnabled,
        getSubmoduleBranch,
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
