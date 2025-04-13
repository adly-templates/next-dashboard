import React from 'react';

import { Text, TextProps } from '@/components';
import { cn } from '@/utils';

export type PageTitleProps = {
  children?: React.ReactNode;
} & TextProps;

export const PageTitle = ({ children, className, size = 'h3', ...props }: PageTitleProps) => {
  return (
    <div className="flex-col">
      <Text size={size} className={cn('font-[700] py-[16px]', className)} {...props}>
        {children}
      </Text>
    </div>
  );
};
