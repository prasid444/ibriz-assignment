/* eslint-disable no-console */

import { Button, Dropdown, MenuProps, Spin } from 'antd';
import { BlurWrapper } from 'components';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Address, formatEther } from 'viem';

import useWallet from '../hooks/useWallet';
import { convertBigIntToText } from '../utils/numberFormatter';
import { MintTokenView } from '../views/MintTokenView';
import { TransferTokenView } from '../views/TransferTokenView';

export const ContractPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { walletStatus, availableConnection, connect, balance, disconnect } = useWallet();

  const params = useParams();
  const { id: address } = params ?? {};

  if (walletStatus.isConnecting) {
    return (
      <div className="h-screen flex flex-row items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  let walletOptionMenu: MenuProps['items'] = availableConnection.map((value, index) => {
    return {
      key: value.id,
      icon: <img className="h-4 w-4 object-cover" src={value.icon} alt={value.name} />,
      title: value.name,
      label: value.name,
      className: 'py-2',
      onClick: () => connect(value),
    };
  });
  if (walletOptionMenu.length === 0) {
    walletOptionMenu = [
      {
        key: 'id',
        label: 'No connectors found',
      },
    ];
  }
  return (
    <div className="h-screen bg-gray-200 flex flex-col ">
      <div className="flex py-2 px-4 items-center bg-[#DF5627]">
        <div className="h-12 flex-1 flex items-center gap-2">
          <h1 className="text-xl font-bold text-white"></h1>
        </div>
        <div className="flex gap-4 items-center">
          {balance ? (
            <div
              className="text-white text-xs"
              title={`${formatEther(balance?.value as bigint, 'wei')} ${balance?.symbol}`}
            >
              Balance: {convertBigIntToText(balance?.value)} DAI
              {/* TODO: use dynamic instead of DAI */}
            </div>
          ) : (
            <div>
              <Dropdown arrow trigger={['click']} menu={{ items: walletOptionMenu }}>
                <Button type="default" shape="round" className="text-white" size="large">
                  Connect
                </Button>
              </Dropdown>
            </div>
          )}
          {walletStatus.isConnected && (
            <div>
              <Button
                type="default"
                onClick={() => {
                  disconnect();
                }}
                shape="round"
                className="text-white"
                size="large"
              >
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>
      <BlurWrapper
        active={!walletStatus.isConnected}
        className="h-full flex-1 flex-row items-center flex"
        message="Please connect with wallet to continue"
      >
        <div className="p-2 md:p-4 flex flex-row flex-1 items-center justify-center">
          <div className="bg-white h-full md:h-fit rounded-lg p-4 w-full md:max-w-[600px] md:p-6 flex flex-col gap-8">
            <center>
              <label
                className={`w-[200px] h-[40px] rounded-[23px] border border-primary bg-white flex items-center cursor-pointer relative box-border`}
              >
                <input
                  type="checkbox"
                  checked={activeStep === 0}
                  onChange={(e) => setActiveStep(e.target.checked === true ? 0 : 1)}
                  hidden
                />
                <span
                  className={`text-primary font-bold w-1/2 text-xs inline-block text-center relative z-10 uppercase ${activeStep === 0 ? 'text-white' : ''} transition duration-200`}
                >
                  Mint
                </span>
                <span
                  className={`text-primary font-bold w-1/2 text-xs inline-block text-center relative z-10 uppercase ${activeStep === 1 ? 'text-white' : ''} transition duration-200`}
                >
                  Transfer
                </span>
                <div
                  className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition duration-200 ${activeStep === 1 ? 'transform translate-x-full' : ''}`}
                ></div>
              </label>
            </center>
            {activeStep === 0 ? (
              <MintTokenView address={address as Address} onClickNext={() => setActiveStep(1)} />
            ) : (
              <TransferTokenView onClickPrevious={() => setActiveStep(0)} />
            )}
          </div>
        </div>
      </BlurWrapper>
    </div>
  );
};
