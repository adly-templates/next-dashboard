import React from 'react';

import { Button, ButtonProps } from '@/components';

export type CloseButtonProps = ButtonProps;

export const CloseButton = ({ variant = 'destructive', ...props }: CloseButtonProps) => {
  return (
    <Button
      icon="close"
      variant={variant}
      className="border-none aspect-square center"
      iconProps={{ className: 'text-white text-lg mt-[1px]' }}
      {...props}
    />
  );
};
