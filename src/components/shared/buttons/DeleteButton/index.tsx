import React from 'react';

import { Button, ButtonProps } from '@/components';

export type DeleteButtonProps = ButtonProps;

export const DeleteButton = ({ ...props }: DeleteButtonProps) => {
  return (
    <Button
      icon="trash"
      variant="outline"
      className="border aspect-square bg-white border-gray-200"
      iconProps={{ className: 'text-red-500 text-lg' }}
      {...props}
    />
  );
};
