/* eslint-disable no-console */
import { Button, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnect } from 'wagmi';

export const HomePage = () => {
  const { connectors, connect } = useConnect();
  const navigate = useNavigate();
  // const connectors: Connector[] = [];
  return (
    <div className="h-screen bg-primary flex flex-row items-center justify-center">
      <div className="flex flex-col gap-6 justify-center items-center md:max-w-[600px] p-2 md:p-4">
        <h1 className="text-white font-bold text-4xl text-center">Welcome to Minting Assignment</h1>
        <div className="text-white text-md">Select Connectors</div>
        {connectors.length === 0 ? (
          <div className="text-xs text-gray-200 text-center">
            Couldn't find any connectors. Make sure you open this page in wallet friendly browser or
            you have wallet extension installed and reload the page.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            {connectors.map((value) => {
              return (
                <Button
                  size="large"
                  type="primary"
                  className="bg-primary min-w-[200px]"
                  onClick={() => {
                    // value.getAccounts().
                    // const chainID = await value.getChainId();
                    connect(
                      { chainId: 1, connector: value },
                      {
                        onSuccess(data, variables, context) {
                          navigate({
                            pathname: '/contract',
                            search: `?addr=${data.accounts[0]}`,
                          });
                        },
                        onError(error, variables, context) {
                          message.error(error.message);
                        },
                        onSettled(data, error, variables, context) {
                          console.log('dasd', data, error, variables, context);
                          message.success('setled');
                        },
                      }
                    );
                  }}
                >
                  {value.name}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
