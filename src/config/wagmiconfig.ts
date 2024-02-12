import { createConfig, http } from 'wagmi';
import { goerli } from 'wagmi/chains';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [goerli],
  transports: {
    [goerli.id]: http(),
  },
});
