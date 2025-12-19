# SMA POC Wrapper

A Next.js React wrapper application for managing and testing submodules from different GitHub repositories. This application provides developer tools for overriding submodule branches and toggling feature flags during development.

## Features

- 🎯 **Submodule Management**: Configure and manage multiple Git submodules
- 🔧 **Developer Tools**: Dev-mode-only tools for testing and debugging
- 🌿 **Branch Override**: Switch submodules to different branches in development
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

- Override submodule branches for testing
- Toggle feature flags
- Reset all settings to defaults

### Production Build

```bash
npm run build
npm start
```

In production mode, the developer tools are completely hidden and all submodules use their default branches.

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main page showing submodules and flags
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── DevTools.tsx         # Developer tools panel
│   ├── DevToolsWrapper.tsx  # Conditional wrapper for dev mode
│   └── WrapperProvider.tsx  # Context provider for state management
├── lib/                     # Library code
│   └── config.ts            # Default configuration for submodules and flags
└── types/                   # TypeScript type definitions
    └── index.ts             # Shared types
```

## Configuration

### Adding Submodules

Edit `src/lib/config.ts` to add or modify submodules:

```typescript
export const defaultSubmodules: SubmoduleConfig[] = [
  {
    name: 'your-module-name',
    defaultBranch: 'main',
    repository: 'https://github.com/your-org/your-repo',
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

### Getting Submodule Branch

```typescript
'use client';
import { useWrapper } from '@/components/WrapperProvider';

export default function YourComponent() {
  const { getSubmoduleBranch } = useWrapper();

  const branch = getSubmoduleBranch('example-module-1');
  // Use the branch to load the correct version
}
```

## Developer Tools

### Submodules Tab

- View all configured submodules
- See default branches
- Override branches temporarily for testing
- Visual indicators show when overrides are active

### Feature Flags Tab

- Toggle feature flags on/off
- See flag descriptions
- Changes apply immediately
- Settings persist across page refreshes

### Reset Functionality

Click "Reset All to Defaults" to clear all overrides and return to default configuration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Storage**: localStorage (development only)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is part of the SMA POC initiative.
