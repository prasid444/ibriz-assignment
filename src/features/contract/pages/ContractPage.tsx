/* eslint-disable no-console */

import { Button, message, Result, Spin } from 'antd';
import { ArrowLeft, Hammer, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
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
  const { transform, opacity } = useSpring({
    opacity: activeStep === 1 ? 1 : 0,
    transform: `perspective(600px) rotateX(${activeStep === 1 ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

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
  // const transitions = useTransition(activeStep === 0, {
  //   from: { opacity: 0, height: 0 },
  //   enter: { opacity: 1, height: 300 },
  //   leave: { opacity: 0, height: 0 },
  // });

  return (
    <div className="h-screen bg-gray-200 flex flex-col ">
      <div className="flex py-2 px-1 items-center bg-[#DF5627]">
        <div className="">
          <Link to={'/'}>
            <Button type="link" icon={<ArrowLeft color="white" />} />
          </Link>
        </div>
        <div className="px-2 flex-1 flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Contract Page</h1>
        </div>
        <div
          className="text-white text-xs"
          title={`${formatEther(data?.value as bigint)} ${data?.symbol}`}
        >
          Balance: {parseFloat(formatEther(data?.value as bigint)).toFixed(5)} {data?.symbol}
        </div>
      </div>
      <div className="p-auto flex flex-row flex-1 items-center justify-center">
        <div className="bg-white rounded-lg p-2 w-full md:w-fit md:p-6 md:min-w-[500px] flex-col gap-4">
          <center>
            <label
              className={`w-[200px] h-[40px] rounded-[23px] border border-gray-300 bg-white flex items-center cursor-pointer relative box-border`}
            >
              <input
                type="checkbox"
                checked={activeStep === 0}
                onChange={(e) => setActiveStep(e.target.checked === true ? 0 : 1)}
                hidden
              />
              <span
                className={`text-red-600 font-bold w-1/2 text-xs inline-block text-center relative z-10 uppercase ${activeStep === 0 ? 'text-white' : ''} transition duration-200`}
              >
                Mint
              </span>
              <span
                className={`text-red-600 font-bold w-1/2 text-xs inline-block text-center relative z-10 uppercase ${activeStep === 1 ? 'text-white' : ''} transition duration-200`}
              >
                Transfer
              </span>
              <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full transition duration-200 ${activeStep === 1 ? 'transform translate-x-full' : ''}`}
              ></div>
            </label>
          </center>
          <div
            className={`pt-4 ${activeStep === 1 ? 'h-[280px]' : 'h-[180px]'} transition-all duration-400 relative`}
          >
            <animated.div
              className={'absolute w-full p-4 '}
              style={{ opacity: opacity.to((o) => 1 - o), transform }}
            >
              <MintTokenView address={address as Address} onClickNext={() => setActiveStep(1)} />
            </animated.div>
            <animated.div
              className={'absolute w-full p-4'}
              style={{
                opacity,
                transform,
                rotateX: '180deg',
              }}
            >
              <TransferTokenView onClickPrevious={() => setActiveStep(0)} />
            </animated.div>
            {/* {transitions((styles, item) =>
              item ? (
                <animated.div style={{ ...styles }}>
                  <MintTokenView
                    address={address as Address}
                    onClickNext={() => setActiveStep(1)}
                  />
                </animated.div>
              ) : (
                <animated.div style={{ ...styles }}>
                  <TransferTokenView onClickPrevious={() => setActiveStep(0)} />
                </animated.div>
              )
            )} */}
          </div>
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
