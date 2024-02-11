import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Divider, Form, Input, InputNumber } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { parseEther } from 'viem';
import { useSendTransaction } from 'wagmi';
import { z } from 'zod';

const schema = z.object({
  eth_address: z
    .string({
      invalid_type_error: 'Token Count should be a number',
    })
    .min(1, 'Ether Address is required'),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount should be a number',
    })
    .positive('Amount must be greated than 0'),
});

export const TransferTokenView = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const {
    data: hash,
    sendTransaction,
    isError,
    isPending,
    isSuccess,
    isPaused,
    error,
  } = useSendTransaction();
  const onSubmit = async (data: any) => {
    sendTransaction({ to: data?.eth_address, value: parseEther(`${data?.amount}`) });
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-primary text-2xl font-bold text-center">Transfer Token Form</h1>
      <Divider />
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Receipient's Ether Address"
          tooltip="Enter the ether address of receipient."
          required
        >
          <Controller
            control={control}
            name="eth_address"
            render={({ field }) => <Input className="w-full" size="large" {...field} />}
          />
          {errors.eth_address && (
            <p className="text-error">{errors.eth_address.message as string}</p>
          )}
        </Form.Item>
        <Form.Item label="Amount" required tooltip="Amount to be transferred">
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <InputNumber className="w-full" size="large" min={0} {...field} />
            )}
          />
          {errors.amount && <p className="text-error">{errors.amount.message as string} </p>}
        </Form.Item>
        {error && <Alert message={error.message} type="error" showIcon />}
        {/* {formStatus.success && <Alert message={formStatus.success} type="success" showIcon />} */}
        <div className="py-4">
          <Form.Item>
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
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
