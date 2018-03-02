const {
  isObject,
} = require('../src/utils');

describe('isObject', () => {
  it('object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ foo: 'bar '})).toBe(true);
  });

  it('string', () => {
    expect(isObject('test string')).toBe(false);
    expect(isObject('')).toBe(false);
  });

  it('null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('undefined', () => {
    expect(isObject(undefined)).toBe(false);
  });

  it('boolean', () => {
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
  });

  it('numbers', () => {
    expect(isObject(0)).toBe(false);
    expect(isObject(9)).toBe(false);
  });

  it('function', () => {
    expect(isObject(() => {})).toBe(false);
  });
});
