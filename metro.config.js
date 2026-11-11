const path = require('path');

// Resolve @expo/metro-config whether it is hoisted to the project's top-level node_modules or
// nested under `expo/node_modules/@expo/metro-config` (non-hoisted installs), so this file keeps
// working regardless of how dependencies were installed and without relying on a duplicate
// install at a parent directory.
let metroConfig;
try {
  metroConfig = require('@expo/metro-config');
} catch (_) {
  metroConfig = require(
    path.resolve(__dirname, 'node_modules/expo/node_modules/@expo/metro-config')
  );
}
const { getDefaultConfig } = metroConfig;

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
