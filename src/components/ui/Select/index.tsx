'use client';

import React from 'react';
import { SelectContentProps, SelectTriggerProps } from '@radix-ui/react-select';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Text, TextProps } from '@/components';
import { cn } from '@/utils';

export type TextSelectProps = {
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  showAsRequired?: boolean;
  required?: boolean;
  className?: string;
  triggerProps?: SelectTriggerProps;
  contentProps?: Omit<SelectContentProps, 'position'>;
  labelProps?: TextProps;
  containerProps?: React.ComponentProps<'div'>;
} & React.ComponentProps<typeof Select>;

export const TextSelect = ({
  options,
  label,
  placeholder,
  showAsRequired,
  required,
  className,
  triggerProps,
  contentProps: { className: contentClassName, ...contentProps } = {},
  labelProps: { className: labelClassName, ...labelProps } = {},
  containerProps,
  ...selectProps
}: TextSelectProps) => {
  return (
    <div className={cn('flex flex-col min-w-[180px] max-w-[400px]', className)} {...containerProps}>
      {!!label && (
        <>
          <div className="flex items-center gap-2">
            <Text size="sm" className={cn('text-gray-500', labelClassName)} {...labelProps}>
              {label}
            </Text>
            {showAsRequired && required && (
              <Text className="text-red-500" size="md">
                *
              </Text>
            )}
          </div>
          {/* <Spacer height={5} /> */}
        </>
      )}
      <Select required={required} {...selectProps} {...(!placeholder && { defaultValue: options[0]?.value })}>
        <SelectTrigger {...triggerProps}>
          <SelectValue {...(placeholder && { placeholder })} />
        </SelectTrigger>
        <SelectContent className={cn(contentClassName)} position="popper" {...contentProps}>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
