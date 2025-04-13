'use client';

import React, { useCallback, useState } from 'react';

import { Button, ButtonProps } from '@/components';
import { cn } from '@/utils';

import { Text } from '../Text';

export type GroupedButtonProps = {
  title?: string;
  buttons: (ButtonProps & { id: string })[];
  currentActiveButton?: string;
  defaultActiveButton?: string;
  onButtonChange?: (id: string) => void;
} & React.ComponentProps<'div'>;

export const GroupedButton = ({
  buttons,
  title,
  className,
  currentActiveButton,
  defaultActiveButton,
  onButtonChange,
  ...props
}: GroupedButtonProps) => {
  const [activeButton, setActiveButton] = useState<ButtonProps | undefined>(
    defaultActiveButton
      ? buttons.find((button) => button.id === defaultActiveButton)
      : buttons.length > 0
        ? buttons[0]
        : undefined,
  );

  const active = currentActiveButton ? buttons.find((button) => button.id === currentActiveButton) : activeButton;

  const handleButtonChange = useCallback(
    (id: string) => {
      setActiveButton(buttons.find((button) => button.id === id));
      onButtonChange?.(id);
    },
    [buttons, onButtonChange],
  );

  return (
    <div className="flex flex-col gap-1">
      {!!title && (
        <Text size="sm" className="text-gray-400">
          {title}
        </Text>
      )}
      <div
        className={cn('flex items-center justify-center gap-2 border border-gray-200 rounded-md p-1', className)}
        {...props}
      >
        {buttons.map((button, index) => {
          const { className, onClick, ...rest } = button;
          const isActive = active?.id === button.id;
          return (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                'bg-transparent hover:text-gray-500 text-black',
                isActive && 'bg-primary text-white hover:text-gray-200',
                className,
              )}
              onClick={(e) => {
                handleButtonChange(button.id);
                onClick?.(e);
              }}
              {...rest}
            />
          );
        })}
      </div>
    </div>
  );
};
