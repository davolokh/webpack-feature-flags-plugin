# webpack-feature-flags-plugin
Feature Flags plugin for [Webpack](https://webpack.js.org).

![License](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Build Status](https://travis-ci.org/davolokh/webpack-feature-flags-plugin.svg?branch=master)](https://travis-ci.org/davolokh/webpack-feature-flags-plugin)
[![Coverage Status](https://coveralls.io/repos/github/davolokh/webpack-feature-flags-plugin/badge.svg)](https://coveralls.io/github/davolokh/webpack-feature-flags-plugin)
[![Dependency Status](https://david-dm.org/davolokh/webpack-feature-flags-plugin.svg)](https://david-dm.org/davolokh/webpack-feature-flags-plugin)
[![devDependency Status](https://david-dm.org/davolokh/webpack-feature-flags-plugin/dev-status.svg)](https://david-dm.org/davolokh/webpack-feature-flags-plugin#info=devDependencies)
[![Npm Version](https://badge.fury.io/js/webpack-feature-flags-plugin.svg)](http://badge.fury.io/js/webpack-feature-flags-plugin)


# Intro
> Feature Toggles (often also refered to as Feature Flags) are a powerful technique, allowing teams to modify system behavior without changing code. They fall into various usage categories, and it's important to take that categorization into account when implementing and managing toggles. Toggles introduce complexity. We can keep that complexity in check by using smart toggle implementation practices and appropriate tools to manage our toggle configuration, but we should also aim to constrain the number of toggles in our system.
(c) [Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)

# Description
**FeatureFlagsPlugin** is an abstraction over [DefinePlugin](https://webpack.js.org/plugins/define-plugin/#feature-flags) which is supposed to be used for FeatureFlags within [Webpack](https://webpack.js.org).

**FeatureFlagsPlugin** was constructed exact for FeatureFlags.
It has two key features:
- it simplifies configuration process (no need to write `JSON.stringify('YOUR_FLAG_VALUE')` any more)
- it extends flags configuration with *modes*. It's easy to switch `DEV`/`PROD` modes without changing/duplicating configs.


# Installation
Simply install plugin using [npm](https://www.npmjs.com):
```
npm install webpack-feature-flags-plugin
```
or, if you use [yarn](https://yarnpkg.com):

```
yarn add webpack-feature-flags-plugin
```



# Usage
1. Create a config file (all the FeatureFlags definitions goes here).

**webpack.feature-flags.config.js:**

**TBD**

2. Import both plugin and it's config in **webpack.config.js:**
```javascript
const FeatureFlagsPlugin = require('webpack-feature-flags-plugin');
const flagsConfig = require('./webpack.feature-flags.config');
```

3. Use imported plugin and config in `plugins` section within **webpack.config.js:**
```javascript
...
  plugins: [
    ...
    new FeatureFlagsPlugin(flagsConfig, { mode: 'DEV' }), // (flagsConfig, pluginConfig)
    ...
  ],
... 
```

4. Now you can simply use variables from config in your code.
```javascript

if (FeatureFlags.featureGroup1.feature1.enabled) {
  ...
}
```



# Configuration

## Plugin Configuration

Plugin's Constructor accepts two parameters:

- `flagsConfig` - Object, required.
Represents your FeatureFlags definitions.

- `pluginConfig` - Object, optional.
Defines `modes` set and a selected `mode`.
  
  - `modes: ['MODE1', 'MODE2']` - array of modes you want to have to be resolved. Predefined modes are `PROD` and `DEV`.
  - `mode: 'DEV'` - selected `mode`.

There are two possible configuration for FeatureFlags: 

- Boolean: `true/false` - plugin does nothing for this case.
- String: i.e. `DEV` - in this case plugin checks if this mode is defined in `modes` and does an evaluation.

The evalutation algorithm is pretty simple: if modes are equal - feature flag is set to `true`. In all other cases (unknow mode, another mode) - `false`.

## Sample Config
```javascript
module.exports = 
  FeatureFlags: {
    namespace1: {
      feature10: {
        enabled: 'DEV', // FeatureFlags.namespace1.feature10.enabled === true only when plugin configured in 'DEV' mode 
      },
      feature11: {
        enabled: true, // FeatureFlags.namespace1.feature11.enabled === true always
      }
    },
    nameSpace2: {
      feature20: {
        enabled: 'PROD', // FeatureFlags.namespace2.feature20.enabled === true only when plugin configured in 'PROD' mode 
      },
      feature21: {
        enabled: false,  // FeatureFlags.namespace2.feature21.enabled === true never
      },
    },
    nameSpace3: {
      feature30: {
        enabled: 'USER_EXTENDED_MODE', // FeatureFlags.namespace3.feature30.enabled === true only when plugin configured in 'USER_EXTENDED_MODE' mode and modes were extended with 'USER_EXTENDED_MODE'
      }
    }
  }
}

```


# Tips

## Dead-code elimination

Webpack removes dead code using [tree-shaking](https://webpack.js.org/guides/tree-shaking/):
> Tree shaking is a term commonly used in the JavaScript context for dead-code elimination. It relies on the static structure of ES2015 module syntax, i.e. `import` and `export`. 

**Note:** It's strongly recommended to read [Caveats](https://webpack.js.org/guides/tree-shaking/#caveats) section to avoid unexpecrted behavior.

**Note 2:** Using `if (FeatureFlags.featureGroup1.feature1.enabled) { ... }` allows webpack to remove dead code, but using the HOC described below doesn't.

## Usage with React

**withFeatureFlag.js:**
```javascript
import React from 'react';

const withFeatureFlag = (flagName, ComposedComponent, FallbackComponent) => {
  class FeatureFlagHOC extends React.PureComponent {
    render() {
      const isEnabled = FeatureFlags[flagName].enabled;
      if (isEnabled) {
        return <ComposedComponent {...this.props} />;
      }
      if (FallbackComponent) {
        return <FallbackComponent {...this.props} />;
      }
      return null;
    }
  }

  return FeatureFlagHOC;
};

export { withFeatureFlag };
```

