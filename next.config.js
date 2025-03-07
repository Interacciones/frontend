/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle modern JavaScript features
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-private-methods']
        }
      }
    });

    return config;
  },
  output: 'export',
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;
