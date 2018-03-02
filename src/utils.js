const isObject = varaiable => varaiable !== null && typeof varaiable === 'object';

const isBoolean = variable => typeof variable === "boolean";

const PREDEFINED_MODE_VALUES = ['DEV', 'PROD'];

const evaluateWithMode = (value, modes, mode) => {
  if (isBoolean(value)) {
    return JSON.stringify(value);
  }
  if (modes.includes(value)) {
    return JSON.stringify(value === mode);
  }
  return JSON.stringify(false);
}

const stringifyAndReplaceMode = (config, modes, mode) => {
  const updatedConfig = { ... config };
  for (const [key, value] of Object.entries(updatedConfig)) {
    updatedConfig[key] = isObject(value) ?
      stringifyAndReplaceMode(updatedConfig[key], modes, mode) :
      evaluateWithMode(value, modes, mode);
  };
  return updatedConfig;
}


const prepareFlags = (featureFlagsConfig, { namespace, mode, modes = PREDEFINED_MODE_VALUES }) => {
  const config = namespace ? { [namespace]: featureFlagsConfig } : featureFlagsConfig;
  return stringifyAndReplaceMode(config, modes, mode);
}

module.exports = {
  isObject,
  isBoolean,
  evaluateWithMode,
  stringifyAndReplaceMode,
  PREDEFINED_MODE_VALUES,
  prepareFlags,
};
