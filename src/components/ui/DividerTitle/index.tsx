import React from 'react';

import { cn } from '@/utils';

import { Text, TextProps } from '../Text';

type DividerTitleProps = {
  title: string;
  textProps?: TextProps;
  orientation?: 'horizontal' | 'vertical';
  type?: 'left' | 'right' | 'center';
} & React.ComponentProps<'div'>;

export const DividerTitle = ({
  title,
  className,
  textProps: { className: textClassName, ...textProps } = {},
  orientation: _orientation = 'horizontal',
  type = 'center',
  ...props
}: DividerTitleProps) => {
  // TODO: Implement vertical orientation

  const Divider = () => <div className="h-[1px] bg-gray-200 flex-1" />;

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {['right', 'center'].includes(type) && <Divider />}
      <Text bold size="lg" className={cn(textClassName)} {...textProps}>
        {title}
      </Text>
      {['left', 'center'].includes(type) && <Divider />}
    </div>
  );
};
