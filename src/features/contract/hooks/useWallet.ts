import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { Connector, useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';

interface WalletStatus {
  isConnected: boolean;
  isConnecting: boolean;
}

interface UseWalletReturnType {
  walletStatus: WalletStatus;
  address: Address | undefined;
  balance:
    | {
        decimals: number;
        formatted: string;
        symbol: string;
        value: bigint;
      }
    | undefined;
  availableConnection: ReadonlyArray<Connector>;
  connect: (connection: Connector) => void;
  disconnect: () => void;
  refetchBalance: () => void;
}

const useWallet = (): UseWalletReturnType => {
  const [status, setStatus] = useState<WalletStatus>({
    isConnected: false,
    isConnecting: false,
  });

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data: balance, refetch: refetchBalance } = useBalance({ address });

  const init = () => {
    setStatus({
      isConnected: false,
      isConnecting: false,
    });
  };

  const refetchNewBalance = () => {
    refetchBalance();
  };

  const connectWallet = async (connector: Connector) => {
    init();
    connect(
      { chainId: 5, connector: connector },
      {
        onError(error, variables, context) {
          init();
          message.error(error.message);
        },
        onSuccess(data, variables, context) {
          setStatus({ ...status, isConnected: true });
          // fetchAccount();
        },
      }
    );
  };
  const disconnectWallet = () => {
    disconnect();
    init();
  };

  useEffect(() => {
    if (address !== undefined) {
      setStatus({ ...status, isConnected: true });
    }
  }, [address]);

  return {
    walletStatus: status,
    availableConnection: connectors,
    connect: connectWallet,
    balance: balance,
    address: address,
    disconnect: disconnectWallet,
    refetchBalance: refetchNewBalance,
  };
};

export default useWallet;
