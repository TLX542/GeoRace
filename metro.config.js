const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Suppress "Attempted to import the module ... ReactNativeFeatureFlags which is not listed in the exports"
  // warning from @react-native/virtualized-lists importing a private React Native internal.
  // File-based resolution already works; this tells Metro to skip the exports check for these paths.
  const privateFlags = path.resolve(
    __dirname,
    'node_modules/react-native/src/private/featureflags/ReactNativeFeatureFlags.js'
  );
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    'react-native/src/private/featureflags/ReactNativeFeatureFlags': privateFlags,
  };

  return config;
})();
