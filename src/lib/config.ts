import { SubmoduleConfig, FeatureFlag } from '@/types';

export const defaultSubmodules: SubmoduleConfig[] = [
  {
    name: 'example-module-1',
    defaultBranch: 'main',
    repository: 'https://github.com/example/module-1',
  },
  {
    name: 'example-module-2',
    defaultBranch: 'main',
    repository: 'https://github.com/example/module-2',
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
