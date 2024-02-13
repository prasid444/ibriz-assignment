import { convertBigIntToText } from '../numberFormatter'; // Import the function to be tested

describe('convertBigIntToText', () => {
  test('converts small numbers correctly', () => {
    expect(convertBigIntToText(BigInt(123))).toBe('123');
  });

  test('converts numbers to thousands correctly', () => {
    expect(convertBigIntToText(BigInt(123456))).toBe('123 thousand');
  });

  test('converts numbers to millions correctly', () => {
    expect(convertBigIntToText(BigInt(123456789))).toBe('123 million');
  });

  test('converts numbers to decillion correctly', () => {
    const number = BigInt('1234567890123456789012345678901234567890');
    expect(convertBigIntToText(number)).toBe('1234567 decillion');
  });

  test('handles negative numbers correctly', () => {
    expect(convertBigIntToText(BigInt(-123))).toBe('-123');
  });

  test('handles zero correctly', () => {
    expect(convertBigIntToText(BigInt(0))).toBe('0');
  });
});
