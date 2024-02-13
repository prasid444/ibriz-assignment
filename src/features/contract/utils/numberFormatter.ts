const convertBigIntToText = (number: bigint) => {
  const units = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',
  ];

  let unitIndex = 0;
  while (number >= 1000 && unitIndex < units.length - 1) {
    number = number / BigInt(1000);
    unitIndex++;
  }

  return `${number.toString()}${unitIndex > 0 ? ` ${units[unitIndex]}` : ``}`;
};
export { convertBigIntToText };
