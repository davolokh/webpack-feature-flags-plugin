const {
  stringifyAndReplaceMode,
  PREDEFINED_MODE_VALUES,
} = require('../src/utils');
const stubConfig = require('./webpack.feature-flags.sample.config');


describe('stringifyAndReplaceMode', () => {
  it('stub data, with PROD mode', () => {
    expect(stringifyAndReplaceMode(stubConfig, PREDEFINED_MODE_VALUES, 'PROD')).toMatchSnapshot();
  });

  it('stub data, with DEV mode', () => {
    expect(stringifyAndReplaceMode(stubConfig, PREDEFINED_MODE_VALUES, 'DEV')).toMatchSnapshot();
  });

  it('stub data, with added USER_EXTENDED_MODE mode', () => {
    expect(stringifyAndReplaceMode(stubConfig, [...PREDEFINED_MODE_VALUES, 'USER_EXTENDED_MODE'], 'USER_EXTENDED_MODE')).toMatchSnapshot();
  });

  it('stub data, with UNKNOWN_MODE mode', () => {
    expect(stringifyAndReplaceMode(stubConfig, PREDEFINED_MODE_VALUES, 'UNKNOWN_MODE')).toMatchSnapshot();
  });
  
});
