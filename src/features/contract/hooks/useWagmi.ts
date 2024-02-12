import { useEffect, useState } from 'react';
import {
  Connector,
  useAccount,
  UseAccountReturnType,
  useBalance,
  UseBalanceReturnType,
  useConnect,
} from 'wagmi';

interface WalletStatus {
  isConnected: boolean;
  account: UseAccountReturnType | null; // Account can be null if not connected
  balance: UseBalanceReturnType | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
}

const useWagmi = (): WalletStatus => {
  const [status, setStatus] = useState<WalletStatus>({
    isConnected: false,
    account: null,
    balance: null,
    status: 'idle',
    error: null,
  });

  const { connectors, connect } = useConnect();

  const connectWallet = async (connector: Connector) => {
    setStatus({ ...status, status: 'loading' });
    connect(
      { chainId: 5, connector: connector },
      {
        onError(error, variables, context) {
          setStatus({ ...status, error: error as Error, status: 'error' });
        },
        onSuccess(data, variables, context) {
          setStatus({ ...status, isConnected: true, status: 'success' });
        },
      }
    );
  };

  const fetchAccount = async () => {
    setStatus({ ...status, status: 'loading' });
    try {
      const account: UseAccountReturnType = await useAccount();
      setStatus({ ...status, account, status: 'success' });
    } catch (error) {
      setStatus({ ...status, error: error as Error, status: 'error' });
    }
  };

  const fetchBalance = async () => {
    setStatus({ ...status, status: 'loading' });
    try {
      const balance = await useBalance();
      setStatus({ ...status, balance, status: 'success' });
    } catch (error) {
      setStatus({ ...status, error: error as Error, status: 'error' });
    }
  };

  useEffect(() => {
    if (status.isConnected) {
      fetchAccount();
      fetchBalance();
    }
  }, [status.isConnected]);

  return status;
};

export default useWagmi;
