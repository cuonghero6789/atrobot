module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Keep this plugin before Reanimated to allow expo-router transforms
      require.resolve('expo-router/babel'),
      // Reanimated plugin MUST be last
      'react-native-reanimated/plugin',
    ],
  };
};


