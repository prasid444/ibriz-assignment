import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Divider, Form, InputNumber } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormStatus } from '../utils/types';

const schema = z.object({
  token_count: z
    .number({
      required_error: 'Token Count Field is required',
      invalid_type_error: 'Token Count should be a number',
    })
    .int('Token Count must be an integer')
    .positive('Token Count must be greated than 0'),
});

export const MintTokenView = () => {
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
      <h1 className="text-primary text-2xl font-bold text-center">Welcome To Mint Token Form</h1>
      <Divider />
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Token to Mint" required>
          <Controller
            control={control}
            name="token_count"
            render={({ field }) => (
              <InputNumber className="w-full" size="large" min={0} {...field} />
            )}
          />
          {errors.token_count && (
            <Alert message={errors.token_count.message as string} type="error" showIcon />
          )}
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
              Mint Tokens
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
