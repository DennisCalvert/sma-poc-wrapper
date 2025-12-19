import { FederatedModuleConfig, FeatureFlag } from '@/types';

export const defaultFederatedModules: FederatedModuleConfig[] = [
  {
    name: 'example-module-1',
    remoteUrl: 'http://localhost:3001/remoteEntry.js',
    scope: 'exampleModule1',
    module: './App',
    defaultVersion: '1.0.0',
  },
  {
    name: 'example-module-2',
    remoteUrl: 'http://localhost:3002/remoteEntry.js',
    scope: 'exampleModule2',
    module: './App',
    defaultVersion: '1.0.0',
  },
];

export const defaultFeatureFlags: FeatureFlag[] = [
  {
    name: 'NEW_FEATURE_A',
    enabled: false,
    description: 'Enable new feature A',
  },
  {
    name: 'BETA_TESTING',
    enabled: false,
    description: 'Enable beta testing features',
  },
  {
    name: 'DEBUG_MODE',
    enabled: false,
    description: 'Enable debug mode logging',
  },
];
