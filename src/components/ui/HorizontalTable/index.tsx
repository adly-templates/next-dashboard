import React from 'react';
import { LucideIcon } from 'lucide-react';

import { Text, TextProps } from '@/components';
import { cn } from '@/utils';

export type HorizontalTableProps = {
  data: {
    icon?: LucideIcon;
    label: string;
    value: string;
  }[];
  keyContainerProps?: React.ComponentProps<'div'>;
  keyTextProps?: TextProps;
  valueContainerProps?: React.ComponentProps<'div'>;
  valueTextProps?: TextProps;
} & React.ComponentProps<'div'>;

export const HorizontalTable = ({
  data,
  className,
  keyContainerProps: { className: keyContainerClassName, ...keyContainerRest } = {},
  valueContainerProps: { className: valueContainerClassName, ...valueContainerRest } = {},
  keyTextProps: { className: keyTextClassName, ...keyTextRest } = {},
  valueTextProps: { className: valueTextClassName, ...valueTextRest } = {},
  ...props
}: HorizontalTableProps) => {
  return (
    <div
      className={cn('flex flex-col border border-gray-300 rounded-md overflow-hidden shadow-md', className)}
      {...props}
    >
      {data.map(({ icon: Icon, label, value }, index) => {
        const isLast = index === data.length - 1;
        return (
          <div key={label + index} className="flex">
            {/* key */}
            <div
              className={cn(
                'flex items-center gap-2 w-[150px] bg-gray-100/90 border-b border-r border-gray-300/70 px-4 py-2',
                isLast && 'border-b-0',
                keyContainerClassName,
              )}
              {...keyContainerRest}
            >
              {Icon && (
                <div className="w-[20px] center">
                  <Icon className="w-4 h-4 text-gray-700" />
                </div>
              )}
              <Text size="sm" className={cn('text-gray-700', keyTextClassName)} {...keyTextRest}>
                {label}
              </Text>
            </div>
            {/* value */}
            <div
              className={cn(
                'w-full px-4 py-2 border-b border-gray-200 bg-gray-100/50',
                isLast && 'border-b-0',
                valueContainerClassName,
              )}
              {...valueContainerRest}
            >
              <Text size="sm" className={cn('text-gray-900', valueTextClassName)} {...valueTextRest}>
                {value}
              </Text>
            </div>
          </div>
        );
      })}
    </div>
  );
};
