const webpack = require('webpack');
const { prepareFlags } = require('./utils');

function FeatureFlagsPlugin(featureFlagsConfig, pluginConfig = {}) {
  return new webpack.DefinePlugin(
    prepareFlags(featureFlagsConfig, pluginConfig)
  );
}

module.exports = {
  FeatureFlagsPlugin
};