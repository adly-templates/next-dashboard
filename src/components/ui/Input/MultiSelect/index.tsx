'use client';

import React, { useState } from 'react';

import { MultiSelect, Spacer, Text, TextProps } from '@/components';
import { cn } from '@/utils';

export type MultiSelectInputProps = Omit<React.ComponentProps<typeof MultiSelect>, 'onValueChange'> & {
  label?: string;
  labelProps?: TextProps;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  required?: boolean;
  showAsRequired?: boolean;
  name?: string;
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

export const MultiSelectInput = ({
  label,
  labelProps: { className: labelClassName, ...labelProps } = {},
  containerProps: { className: containerClassName, ...containerProps } = {},
  required,
  showAsRequired,
  name,
  defaultValue,
  onValueChange,
  ...props
}: MultiSelectInputProps) => {
  const [value, setValue] = useState<string[] | undefined>(defaultValue);

  return (
    <div className={cn('flex flex-col min-w-[180px] max-w-[400px]', containerClassName)} {...containerProps}>
      {!!label && (
        <>
          <div className="flex items-center gap-2">
            <Text className={cn(labelClassName, 'font-[600]')} size="md" {...labelProps}>
              {label}
            </Text>
            {(required || showAsRequired) && (
              <Text className="text-red-500" size="md">
                *
              </Text>
            )}
          </div>
          <Spacer height={10} />
        </>
      )}
      <MultiSelect
        name={name}
        defaultValue={defaultValue}
        {...props}
        onValueChange={(value) => {
          setValue(value);
          onValueChange?.(value);
        }}
      />
      <input type="hidden" name={name} value={value || ''} />
    </div>
  );
};
