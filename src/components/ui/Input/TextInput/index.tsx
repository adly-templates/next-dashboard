import React from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger, Icon, Text } from '@/components';
import { cn } from '@/utils';

export type TextInputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  label?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  altValue?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  dir?: 'ltr' | 'rtl';
  labelClassName?: string;
  labelProps?: Omit<React.ComponentPropsWithoutRef<typeof Text>, 'className'>;
  disabled?: boolean;
  hidden?: boolean;
  showAsRequired?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

export const TextInput = ({
  type = 'text',
  label,
  className,
  containerClassName,
  required = false,
  altValue,
  error,
  labelClassName = className,
  labelProps,
  disabled,
  hidden,
  showAsRequired = required,
  ...rest
}: TextInputProps) => {
  return (
    <div className={cn('flex flex-col items-start', hidden && 'hidden', containerClassName)}>
      {!!label && (
        <HoverCard openDelay={5} closeDelay={5}>
          <div className="flex items-center gap-2">
            <Text size="sm" className={cn('text-gray-500', labelClassName)} {...labelProps}>
              {label}
            </Text>
            {showAsRequired && required && (
              <Text className="text-red-500" size="md">
                *
              </Text>
            )}
            {!!altValue && (
              <HoverCardTrigger className={cn('cursor-pointer center bg-gray-200 rounded-full')}>
                <Icon name="information-circle-outline" className="text-xl" />
              </HoverCardTrigger>
            )}
            <HoverCardContent className="flex items-end justify-start">
              <Text size="md" className="text-gray-600">
                {altValue}
              </Text>
            </HoverCardContent>
          </div>
          {/* <Spacer height={5} /> */}
        </HoverCard>
      )}
      <input
        type={type}
        // dir="auto"
        className={cn(
          'bg-gray-50 border border-gray-300 text-gray-900 text-md placeholder:text-gray-400/60 placeholder:font-cairo rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
          className,
          { 'bg-gray-200 cursor-not-allowed': disabled },
        )}
        disabled={disabled}
        required={required}
        hidden={hidden}
        {...rest}
      />
      {!!error && <Text className="text-red-500 text-sm">{error}</Text>}
    </div>
  );
};
