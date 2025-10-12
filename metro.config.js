const { getDefaultConfig } = require('@expo/metro-config');
const { resolve } = require('metro-resolver');

const config = getDefaultConfig(__dirname);
config.resolver = config.resolver || {};
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

// Force tslib to use the ESM build which provides a default export
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === 'tslib' ||
    moduleName === 'tslib/tslib.js' ||
    moduleName === 'tslib/modules/index.js'
  ) {
    return resolve(context, 'tslib/tslib.es6.js', platform);
  }
  return resolve(context, moduleName, platform);
};

module.exports = config;
