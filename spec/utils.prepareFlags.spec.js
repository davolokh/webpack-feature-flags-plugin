const {
  prepareFlags,
} = require('../src/utils');
const sampleFeaturesConfig = require('./webpack.feature-flags.sample.config');


describe('prepareFlags', () => {
  it('prepareFlags: empty config defined', () => {
    expect(prepareFlags(sampleFeaturesConfig, {})).toMatchSnapshot();
  });

  it('prepareFlags: no namespace defined, DEV mode', () => {
    expect(prepareFlags(sampleFeaturesConfig, { mode: 'DEV' })).toMatchSnapshot();
  });

  it('prepareFlags: no namespace defined, PROD mode', () => {
    expect(prepareFlags(sampleFeaturesConfig, { mode: 'PROD' })).toMatchSnapshot();
  });

  it('prepareFlags: TEST namespace defined', () => {
    expect(prepareFlags(sampleFeaturesConfig, { namespace: 'TEST', mode: 'DEV' })).toMatchSnapshot();
  });
});
