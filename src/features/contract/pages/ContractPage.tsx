/* eslint-disable no-console */

import { Button, message, Result, Spin, Steps } from 'antd';
import { ArrowLeft, Hammer, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Address, formatEther } from 'viem';
import { useBalance, useEstimateGas } from 'wagmi';

import { MintTokenView } from '../views/MintTokenView';
import { TransferTokenView } from '../views/TransferTokenView';

export const ContractPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const params = useParams();
  const { id: address } = params ?? {};

  console.log('got address', address);
  const { data, isLoading, error, status, refetch } = useBalance({
    address: address as Address,
  });
  const result = useEstimateGas();
  useEffect(() => {
    if (!address) {
      message.error('Failed getting address');
      navigate('/');
    }
  }, [address]);

  const steps: {
    [key: number]: {
      key: number;
      title: string;
      description?: string;
      icon: React.ReactNode;
      content: React.ReactNode;
    };
  } = {
    0: {
      key: 0,
      title: 'Mint Token',
      icon: <Hammer />,
      description: 'Mint token for your connected address.',
      content: <MintTokenView address={address as Address} onClickNext={() => setActiveStep(1)} />,
    },
    1: {
      key: 1,
      title: 'Send Token',
      description: 'Send token to receipient',
      icon: <Send />,
      content: <TransferTokenView onClickPrevious={() => setActiveStep(0)} />,
    },
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-row items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return <Result title={error?.message} status={'error'} />;
  }
  return (
    <div className="h-screen bg-gray flex flex-col ">
      <div className="flex py-2 px-1 items-center bg-[#DF5627]">
        <div className="">
          <Link to={'/'}>
            <Button type="link" icon={<ArrowLeft color="white" />} />
          </Link>
        </div>
        <div className="px-2 flex-1 flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Contract Page</h1>
        </div>
        <div className="text-white text-xs">
          Balance: {formatEther(data?.value as bigint)} {data?.symbol}
        </div>
      </div>
      <div className="p-4 flex-1">
        <div className="bg-white rounded-md">
          <Steps
            direction="vertical"
            onChange={(current) => setActiveStep(current)}
            current={activeStep}
            items={Object.values(steps)}
          />
          <div className="mt-4">{steps[activeStep].content}</div>
          {/* <Tabs
            defaultActiveKey="mint"
            activeKey={activeTabKey}
            destroyInactiveTabPane
            onChange={(newKey) => setActiveTabKey(newKey)}
            items={[
              {
                key: 'mint',
                id: 'mint',
                label: 'Mint Token',
                children: <MintTokenView address={address as Address} />,
              },
              {
                key: 'transfer',
                id: 'transfer',
                label: 'Transfer Token',
                children: <TransferTokenView />,
              },
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};
