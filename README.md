# SMA POC Wrapper

A Next.js React wrapper application for managing federated modules using Webpack Module Federation. This application provides developer tools for overriding module remote URLs and toggling feature flags during development.

## Features

- 🎯 **Module Federation**: Configure and manage Webpack federated modules
- 🔧 **Developer Tools**: Dev-mode-only tools for testing and debugging
- 🌐 **URL Override**: Switch federated module remote URLs for testing different deployments
- 🚩 **Feature Flags**: Toggle feature flags on/off for testing
- 💾 **State Persistence**: Developer settings saved in localStorage
- 🎨 **Modern UI**: Built with Tailwind CSS and dark mode support
- 🔒 **Production Safe**: Dev tools automatically hidden in production builds

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

In development mode, you'll see a **"Dev Tools"** button in the bottom-right corner. Click it to:

- Override federated module remote URLs for testing
- Toggle feature flags
- Reset all settings to defaults

### Production Build

```bash
npm run build
npm start
```

In production mode, the developer tools are completely hidden and all modules use their default remote URLs.

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main page showing modules and flags
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── DevTools.tsx         # Developer tools panel
│   ├── DevToolsWrapper.tsx  # Conditional wrapper for dev mode
│   └── WrapperProvider.tsx  # Context provider for state management
├── lib/                     # Library code
│   └── config.ts            # Default configuration for modules and flags
└── types/                   # TypeScript type definitions
    └── index.ts             # Shared types
```

## Configuration

### Adding Federated Modules

Edit `src/lib/config.ts` to add or modify federated modules:

```typescript
export const defaultFederatedModules: FederatedModuleConfig[] = [
  {
    name: 'your-module-name',
    remoteUrl: 'http://localhost:3001/remoteEntry.js',
    scope: 'yourModuleScope',
    module: './App',
    defaultVersion: '1.0.0',
  },
];
```

### Adding Feature Flags

Edit `src/lib/config.ts` to add feature flags:

```typescript
export const defaultFeatureFlags: FeatureFlag[] = [
  {
    name: 'YOUR_FEATURE_FLAG',
    enabled: false,
    description: 'Description of your feature',
  },
];
```

## Usage in Your Code

### Accessing Feature Flags

```typescript
'use client';
import { useWrapper } from '@/components/WrapperProvider';

export default function YourComponent() {
  const { isFeatureEnabled } = useWrapper();

  if (isFeatureEnabled('NEW_FEATURE_A')) {
    // Feature A code
  }
}
```

### Getting Module Remote URL

```typescript
'use client';
import { useWrapper } from '@/components/WrapperProvider';

export default function YourComponent() {
  const { getModuleUrl } = useWrapper();

  const moduleUrl = getModuleUrl('example-module-1');
  // Use the URL to load the federated module
}
```

## Developer Tools

### Federated Modules Tab

- View all configured federated modules
- See default remote URLs, scopes, and exposed modules
- Override remote URLs temporarily for testing different deployments
- Visual indicators show when overrides are active

### Feature Flags Tab

- Toggle feature flags on/off
- See flag descriptions
- Changes apply immediately
- Settings persist across page refreshes

### Reset Functionality

Click "Reset All to Defaults" to clear all overrides and return to default configuration.

## Webpack Module Federation

This wrapper uses Webpack Module Federation to dynamically load remote modules at runtime. The configuration in `next.config.ts` sets up the host application, and developer tools allow testing different remote module deployments.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Module Federation**: Webpack Module Federation with @module-federation/nextjs-mf
- **State Management**: React Context API
- **Storage**: localStorage (development only)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is part of the SMA POC initiative.
