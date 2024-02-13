import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button } from 'antd';
import { AddressInput, AmountInput } from 'components';
import { TEST_ADDRESS } from 'constants/address';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { parseAbi, parseEther, TransactionExecutionError } from 'viem';
import { useWriteContract } from 'wagmi';
import { z } from 'zod';

import { isValidEthereumAddress } from '../utils/addressValidator';

const schema = z.object({
  eth_address: z
    .string({
      invalid_type_error: 'Token Count should be a number',
    })
    .min(1, 'Ether Address is required')
    .refine((val) => isValidEthereumAddress(val), {
      message: 'Invalid Ethereum address',
    }),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount should be a number',
    })
    .positive('Amount must be greated than 0'),
});

export const TransferTokenView = ({ onClickPrevious }: { onClickPrevious: () => void }) => {
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
      abi: parseAbi(['function transfer(address receipientId, uint256 tokenId)']),
      functionName: 'transfer',
      args: [data?.eth_address, parseEther(`${data.amount}`)],
    });
  };

  const formattedError = error as TransactionExecutionError;
  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="eth_address"
          render={({ field }) => <AddressInput {...field} placeholder="Recipient Address" />}
        />
        {errors.eth_address && <p className="text-error">{errors.eth_address.message as string}</p>}
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <AmountInput
              disabled={isPending}
              min={0}
              {...field}
              placeholder="Amount To Send"
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              errorMessage={errors?.amount?.message as string}
            />
          )}
        />
        <div className="flex flex-col gap-2">
          {formattedError && <Alert message={formattedError.shortMessage} type="error" showIcon />}
          {hash && (
            <Alert
              message={`Transaction Hash: ${hash}`}
              type="info"
              showIcon
              action={
                <Button
                  onClick={() => {
                    onClickPrevious();
                  }}
                  size="small"
                  type="text"
                >
                  Go To Mint
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
          Transfer
        </Button>
      </form>
    </div>
  );
};
