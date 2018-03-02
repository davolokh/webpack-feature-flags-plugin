const {
  evaluateWithMode,
  PREDEFINED_MODE_VALUES,
} = require('../src/utils');

describe('evaluateWithMode', () => {
  it('known modes', () => {
    expect(evaluateWithMode('PROD', PREDEFINED_MODE_VALUES, 'PROD')).toBe('true');
    expect(evaluateWithMode('DEV', PREDEFINED_MODE_VALUES, 'DEV')).toBe('true');

    expect(evaluateWithMode('PROD', PREDEFINED_MODE_VALUES, 'DEV')).toBe('false');
    expect(evaluateWithMode('DEV', PREDEFINED_MODE_VALUES, 'PROD')).toBe('false');
  });

  it('added modes', () => {
    expect(evaluateWithMode('FAKE_MODE', [...PREDEFINED_MODE_VALUES, 'FAKE_MODE'], 'FAKE_MODE')).toBe('true');
  });

  it('unknown modes', () => {
    expect(evaluateWithMode('FAKE_MODE', PREDEFINED_MODE_VALUES, 'FAKE_MODE')).toBe('false');
    expect(evaluateWithMode('ANOTHER_FAKE_MODE', PREDEFINED_MODE_VALUES, 'FAKE_MODE')).toBe('false');
  });

  it('plain values', () => {
    expect(evaluateWithMode(true, PREDEFINED_MODE_VALUES, 'DEV')).toBe('true');
    expect(evaluateWithMode(false, PREDEFINED_MODE_VALUES, 'PROD')).toBe('false');

    expect(evaluateWithMode(true, PREDEFINED_MODE_VALUES, 'FAKE_MODE')).toBe('true');
    expect(evaluateWithMode(false, PREDEFINED_MODE_VALUES, 'FAKE_MODE')).toBe('false');
  });
});
