import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Module Federation configuration
  // Note: This is a conceptual wrapper - actual Module Federation setup
  // would require webpack configuration in pages directory or external tools
  // For Next.js App Directory, consider using dynamic imports with runtime configuration
  
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Add Module Federation plugin configuration
      const { ModuleFederationPlugin } = webpack.container;
      
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'smaWrapperHost',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            // Remotes can be added here or loaded dynamically
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
