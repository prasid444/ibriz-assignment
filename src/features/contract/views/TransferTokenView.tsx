import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Divider, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormStatus } from '../utils/types';

const schema = z.object({
  eth_address: z.string({
    required_error: 'Ether Address is required',
    invalid_type_error: 'Token Count should be a number',
  }),
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
  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    error: null,
    success: null,
  });

  const onSubmit = async (data: any) => {
    setFormStatus({ ...formStatus, loading: true });

    // randome error or success emulation
    const isSuccess = parseInt(`${Math.random() * 100}`) % 2;
    setTimeout(() => {
      if (isSuccess) {
        setFormStatus({
          ...formStatus,
          success: 'Tokens minted successfully!',
          error: null,
          loading: false,
        });
      } else {
        setFormStatus({
          ...formStatus,
          success: null,
          error: 'Failed Minting token',
          loading: false,
        });
      }
    }, 2000);
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
          <Input {...register('eth_address')} size="large" />
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
        {formStatus.error && <Alert message={formStatus.error} type="error" showIcon />}
        {formStatus.success && <Alert message={formStatus.success} type="success" showIcon />}
        <div className="py-4">
          <Form.Item>
            <Button
              size="large"
              block
              className="bg-primary"
              type="primary"
              htmlType="submit"
              loading={formStatus.loading}
            >
              Transfer
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
