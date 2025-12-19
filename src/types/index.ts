export interface SubmoduleConfig {
  name: string;
  defaultBranch: string;
  currentBranch?: string;
  repository: string;
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
}

export interface DevToolsState {
  submodules: SubmoduleConfig[];
  featureFlags: FeatureFlag[];
}
