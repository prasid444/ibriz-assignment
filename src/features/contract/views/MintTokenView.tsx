/* eslint-disable no-console */
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button } from 'antd';
import { AmountInput } from 'components';
import { TEST_ADDRESS } from 'constants/address';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Address, TransactionExecutionError, parseAbi, parseEther } from 'viem';
import { ErrorType } from 'viem/_types/errors/utils';
import { useWriteContract } from 'wagmi';
import { z } from 'zod';

const schema = z.object({
  token_count: z
    .number({
      required_error: 'Token Amount is required',
      invalid_type_error: 'Token Amount should be a number',
    })
    .positive('Token Amount must be greated than 0'),
});

export const MintTokenView = ({
  address,
  onClickNext,
}: {
  address: Address;
  onClickNext: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onSubmit = async (data: any) => {
    writeContract({
      address: TEST_ADDRESS,
      abi: parseAbi(['function mint(uint256 tokenId)']),
      functionName: 'mint',
      args: [parseEther(`${data.token_count}`)],
    });
  };
  const formattedError = error as TransactionExecutionError;

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="token_count"
          render={({ field }) => (
            <AmountInput
              disabled={isPending}
              min={0}
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              errorMessage={errors?.token_count?.message as string}
            />
          )}
        />
        <div className="flex flex-col gap-2">
          {formattedError && <Alert message={formattedError.shortMessage} type="error" showIcon />}
          {hash && (
            <Alert
              message={`Transaction Completed. Txn Hash: ${hash}`}
              type="success"
              showIcon
              action={
                <Button
                  onClick={() => {
                    onClickNext();
                  }}
                  size="small"
                  type="text"
                >
                  Go To Transfer
                </Button>
              }
            />
          )}
        </div>

        <Button
          size="large"
          block
          className="bg-primary"
          type="primary"
          htmlType="submit"
          loading={isPending}
        >
          Mint Tokens
        </Button>
      </form>
    </div>
  );
};
