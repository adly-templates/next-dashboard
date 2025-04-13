import React from 'react';

import { cn } from '@/utils';

import { Spacer } from '../Spacer';
import { Text } from '../Text';

type FileType = 'jpg' | 'png' | 'jpeg';

export type FileUploaderProps = {
  name?: string;
  className?: string;
  containerClassName?: string;
  multiple?: boolean;
  label?: string;
  required?: boolean;
  accept: FileType[];
  labelClassName?: string;
  labelProps?: Omit<React.ComponentPropsWithoutRef<typeof Text>, 'className'>;
} & Omit<React.ComponentProps<'input'>, 'className' | 'accept'>;

export const FileUploader = ({
  name,
  label,
  className,
  containerClassName,
  multiple,
  required = false,
  accept,
  labelClassName,
  labelProps,
  ...props
}: FileUploaderProps) => {
  return (
    <div className={cn('w-full', containerClassName)}>
      {!!label && (
        <>
          <div className="flex items-center gap-2">
            <Text className={cn(labelClassName, 'font-[600]')} size="lg" {...labelProps}>
              {label}
            </Text>
            {required && (
              <Text className="text-red-500" size="md">
                *
              </Text>
            )}
          </div>
          <Spacer height={10} />
        </>
      )}

      <input
        className={cn(
          'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none',
          className,
        )}
        name={name}
        type="file"
        accept={accept.join(',')}
        multiple={multiple}
        required={required}
        {...props}
      />
    </div>
  );
};
