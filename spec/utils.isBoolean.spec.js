const {
  isBoolean,
} = require('../src/utils');

describe('isBoolean', () => {
  it('boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('object', () => {
    expect(isBoolean({})).toBe(false);
    expect(isBoolean({ foo: 'bar '})).toBe(false);
  });

  it('string', () => {
    expect(isBoolean('test string')).toBe(false);
    expect(isBoolean('')).toBe(false);
  });

  it('null', () => {
    expect(isBoolean(null)).toBe(false);
  });

  it('undefined', () => {
    expect(isBoolean(undefined)).toBe(false);
  });

  it('numbers', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(9)).toBe(false);
  });

  it('function', () => {
    expect(isBoolean(() => {})).toBe(false);
  });
});
