export const isValidEthereumAddress = (address: string): boolean => {
  // This is a regular expression for Ethereum address
  const addressRegExp = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegExp.test(address);
};
