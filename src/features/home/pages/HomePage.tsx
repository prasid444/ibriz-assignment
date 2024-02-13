/* eslint-disable no-console */
import useWallet from 'features/contract/hooks/useWallet';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDisconnect } from 'wagmi';

export const HomePage = () => {
  const { availableConnection } = useWallet();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    // disconnect any existing connection
    disconnect();
  }, []);
  return (
    <div className="h-screen bg-primary flex flex-row items-center justify-center">
      <div className="flex flex-col gap-6 justify-center items-center md:max-w-[600px] p-2 md:p-4">
        <h1 className="text-white font-bold text-4xl text-center">Welcome</h1>
        <p className="text-center text-white">
          This Assignment uses two functions{' '}
          <mark className="px-2 text-primary bg-white rounded dark:bg-white">Mint</mark> , and{' '}
          <mark className="px-2 text-primary bg-white rounded dark:bg-white">Transfer</mark> to
          interact with the ERC20 contract as per requirement.
        </p>
        {availableConnection.length === 0 ? (
          <div className="text-xs text-gray-200 text-center">
            Couldn't find any connectors. Make sure you open this page in wallet friendly browser or
            you have wallet extension installed and reload the page.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <Link
              to="/contract"
              className="inline-block text-lg rounded-full border border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-primary transition duration-300"
            >
              Continue
            </Link>

            {/* {connectors.map((value) => {
              console.log('icon', value, value.icon);
              return (
                <Button
                  key={value.id}
                  size="large"
                  type="primary"
                  icon={<img className="h-8" src={value.icon} />}
                  className="bg-primary min-w-[200px]"
                  onClick={() => {
                    connect(
                      { chainId: 5, connector: value },
                      {
                        onSuccess(data, variables, context) {
                          navigate({
                            pathname: `/contract/${data.accounts[0]}`,
                          });
                        },
                        onError(error, variables, context) {
                          message.error(error.message);
                        },
                        onSettled(data, error, variables, context) {},
                      }
                    );
                  }}
                >
                  {value.name}
                </Button>
              );
            })} */}
          </div>
        )}
      </div>
    </div>
  );
};
