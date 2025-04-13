import React from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger, Icon, Text, TextProps } from '@/components';
import { cn } from '@/utils';

export * from './InfoBoxList';

export type InfoBoxProps = {
  label: string;
  value: string | number | boolean | undefined | null;
  altValue?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  centerLabel?: boolean;
  labelProps?: TextProps;
  valueProps?: TextProps;
  hideIfEmpty?: boolean;
  defaultValue?: string;
} & React.ComponentProps<'div'>;

export const InfoBox = ({
  label,
  value,
  altValue,
  orientation = 'vertical',
  className,
  centerLabel = true,
  hideIfEmpty = false,
  defaultValue = '-',
  labelProps: { className: labelClassName, ...labelProps } = {},
  valueProps: { className: valueClassName, ...valueProps } = {},
  ...props
}: InfoBoxProps) => {
  if (hideIfEmpty && !value) return null;
  const hoverable = !!altValue;
  return (
    <HoverCard openDelay={5} closeDelay={5}>
      <div
        className={cn('flex flex-col gap-2 group relative', orientation === 'horizontal' && 'flex-row', className)}
        {...props}
      >
        <HoverCardTrigger className={cn(hoverable && 'cursor-pointer')}>
          <Text
            size="sm"
            className={cn('font-[400] text-muted-foreground', { 'flex justify-start': !centerLabel }, labelClassName)}
            {...labelProps}
          >
            {label}
            {hoverable && <Icon name="information-circle" className="text-xl mx-2" />}
          </Text>
        </HoverCardTrigger>
        <Text size="md" bold className={cn('text-foreground', valueClassName)} {...valueProps}>
          {value || defaultValue}
        </Text>
      </div>
      {altValue && (
        <HoverCardContent className="flex items-end justify-start">
          <Text size="sm" className="text-gray-600">
            {altValue}
          </Text>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};
