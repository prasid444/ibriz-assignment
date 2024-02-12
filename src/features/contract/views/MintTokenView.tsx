/* eslint-disable no-console */
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Divider, Form, InputNumber, Spin } from 'antd';
import { TEST_ADDRESS } from 'constants/address';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Address, parseAbi, parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { z } from 'zod';

import { FormStatus } from '../utils/types';

const schema = z.object({
  token_count: z
    .number({
      required_error: 'Token Count is required',
      invalid_type_error: 'Token Count should be a number',
    })
    .int('Token Count must be an integer')
    .positive('Token Count must be greated than 0'),
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
  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    error: null,
    success: null,
  });

  const onSubmit = async (data: any) => {
    setFormStatus({ ...formStatus, loading: true });
    writeContract({
      address: TEST_ADDRESS,
      abi: parseAbi(['function mint(uint256 tokenId)']),
      functionName: 'mint',
      args: [parseEther(data.token_count)],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-primary text-2xl font-bold text-center">Mint Token Form</h1>
      <Divider />
      <Form disabled={isPending} layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Token Count" required tooltip="Number of Tokens to mint.">
          <Controller
            control={control}
            name="token_count"
            render={({ field }) => (
              <InputNumber className="w-full" size="large" min={0} {...field} />
            )}
          />
          {errors.token_count && (
            <p className="text-error">{errors.token_count.message as string}</p>
          )}
        </Form.Item>
        <div className="flex flex-col gap-2">
          {error && (
            <Alert message={(error.name as string) + ' : ' + error.message} type="error" showIcon />
          )}
          {hash && (
            <Alert
              message={`Transaction Hash: ${hash}`}
              type="info"
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
              icon={<Spin />}
            />
          )}
        </div>

        <Form.Item>
          <div className="py-4 flex flex-row gap-2">
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
            <Button
              size="large"
              block
              // className="bg-secondary hover:bg-opacity-50 hover:bg-secondary"
              type="default"
              onClick={() => {
                onClickNext();
              }}
            >
              Go To Transfer
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
