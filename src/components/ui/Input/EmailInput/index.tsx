import React from 'react';

import { cn } from '@/utils';

import { TextInput, TextInputProps } from '../TextInput';

type Props = {
  className?: string;
} & Omit<TextInputProps, 'type'>;

export const EmailInput = ({ className, name = 'email', ...props }: Props) => {
  return (
    <TextInput
      className={cn(className)}
      type="email"
      name={name}
      label="البريد الإلكتروني"
      placeholder="user@dentaleem.com"
      {...props}
    />
  );
};
