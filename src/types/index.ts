export interface FederatedModuleConfig {
  name: string;
  remoteUrl: string;
  defaultVersion?: string;
  overrideUrl?: string;
  scope: string;
  module: string;
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
}

export interface DevToolsState {
  federatedModules: FederatedModuleConfig[];
  featureFlags: FeatureFlag[];
}
