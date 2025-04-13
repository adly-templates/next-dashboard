import React from 'react';

import { cn } from '@/utils';

import { TextInput } from '../TextInput';

type Props = {
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof TextInput>, 'type'>;

export const PasswordInput = ({
  className,
  label = 'كلمة المرور',
  name = 'password',
  placeholder = '********',
  ...props
}: Props) => {
  return (
    <TextInput
      className={cn(className)}
      type="password"
      label={label}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
};
