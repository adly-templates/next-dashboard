'use client';

import React, { useState } from 'react';
import { HoverCardTrigger } from '@radix-ui/react-hover-card';
import { Info } from 'lucide-react';

import { HoverCard, HoverCardContent, Spacer, Text, TextProps } from '@/components';
import { cn } from '@/utils';

export type TextAreaProps = {
  className?: string;
  label?: string;
  altValue?: string;
  required?: boolean;
  resize?: boolean;
  lines?: number;
  maxCharacters?: number;
  labelProps?: TextProps;
  labelClassName?: string;
  containerClassName?: string;
  containerProps?: React.ComponentProps<'div'>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
} & React.ComponentProps<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      altValue,
      required,
      maxCharacters,
      lines = 1,
      resize = true,
      onChange,
      labelClassName,
      labelProps,
      containerClassName,
      containerProps,
      style,
      ...props
    },
    ref,
  ) => {
    const [charactersCount, setCharactersCount] = useState(0);
    return (
      <div className={cn('flex flex-col items-start', containerClassName)} {...containerProps}>
        {!!label && (
          <HoverCard openDelay={5} closeDelay={5}>
            <div className="flex items-center gap-2">
              <Text size="smd" className={cn('text-gray-600', labelClassName)} {...labelProps}>
                {label}
              </Text>
              {required && (
                <Text className="text-red-500" size="md">
                  *
                </Text>
              )}
              {!!altValue && (
                <HoverCardTrigger className={cn('cursor-pointer center bg-gray-200 rounded-full')}>
                  <Info className="text-xl" />
                </HoverCardTrigger>
              )}
              <HoverCardContent className="flex items-end justify-start">
                <Text size="md" className="text-gray-600">
                  {altValue}
                </Text>
              </HoverCardContent>
            </div>
            <Spacer height={5} />
          </HoverCard>
        )}
        <textarea
          onChange={(e) => {
            setCharactersCount(e.target.value.length);
            onChange?.(e);
          }}
          maxLength={maxCharacters}
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
            !resize && 'resize-none',
          )}
          style={{
            height: `${lines * 20}px`,
            ...style,
          }}
          ref={ref}
          required={required}
          {...props}
        />
        {!!maxCharacters && (
          <Text size="sm" className={cn('text-gray-500', { 'text-red-500': charactersCount >= maxCharacters })}>
            {`${maxCharacters - charactersCount} characters remaining`}
          </Text>
        )}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';

export { TextArea };
