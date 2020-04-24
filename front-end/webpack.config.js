const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({ ...env, offline: false }, argv);
  // Customize the config before returning it.
  config.performance = {
    ...config.performance,
    maxAssetSize: 900000,
  };
  return config;
};
