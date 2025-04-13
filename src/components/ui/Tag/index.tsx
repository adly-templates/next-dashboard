import React from 'react';

import { Text, TextProps } from '@/components';
import { cn } from '@/utils';

export type TagType = 'info' | 'success' | 'warning' | 'error';

export type TagProps = {
  className?: string;
  status: React.ReactNode | string | number | undefined;
  type: TagType;
  size?: TextProps['size'];
} & React.ComponentProps<'div'>;

const statusColors: Record<TagType, string> = {
  info: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

export const Tag = ({ status, type = 'success', className, size = 'sm', ...props }: TagProps) => {
  if (!status) return null;
  return (
    <div
      className={cn('rounded-full px-2 py-1 text-xs min-w-[100px] center', statusColors[type], className)}
      {...props}
    >
      {['string', 'number'].includes(typeof status) ? (
        <Text color="white" size={size}>
          {status}
        </Text>
      ) : (
        status
      )}
    </div>
  );
};
