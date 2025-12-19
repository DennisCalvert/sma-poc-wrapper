import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer && webpack?.container) {
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
