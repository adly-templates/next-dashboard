'use client';

import React, { useCallback, useState } from 'react';
import { CheckCheck } from 'lucide-react';

import { cn } from '@/utils';

import { Spacer } from '../Spacer';
import { Text } from '../Text';

export type MultiStepManagerProps = {
  steps: {
    label: string;
    optional?: boolean;
    component: ({
      next,
      prev,
      nextStep,
    }: {
      next?: () => void;
      prev?: () => void;
      nextStep?: { label: string };
    }) => React.ReactNode;
  }[];
  initialStep?: number;
  containerProps?: React.ComponentProps<'div'>;
} & React.ComponentProps<'div'>;

export const MultiStepManager = ({
  steps,
  initialStep = 0,
  className,
  containerProps: { className: containerClassName, ...containerProps } = {},
  ...props
}: MultiStepManagerProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className={cn(className)} {...props}>
      <div className="center gap-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <div key={step.label} className={cn('flex items-center gap-2')}>
              <div className="flex flex-col center gap-2">
                <div
                  className={cn('w-6 h-6 rounded-full center bg-gray-200', {
                    'bg-primary': isActive || isCompleted,
                  })}
                >
                  <Text
                    hidden={isCompleted}
                    size="xs"
                    className={cn('text-gray-500 select-none', { 'text-white': isActive || isCompleted })}
                  >
                    {index + 1}
                  </Text>
                  {isCompleted && <CheckCheck className="text-white h-3 w-3" />}
                </div>
                <div className="flex flex-col relative">
                  <Text size="sm" className={cn('text-gray-500', { 'text-primary': isActive })}>
                    {step.label}
                  </Text>
                  {step.optional && (
                    <div className="absolute -bottom-4 inset-x-0 center">
                      <Text size="xs" className="text-gray-400">
                        (Optional)
                      </Text>
                    </div>
                  )}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn('h-px bg-gray-200 mb-6', { 'bg-primary': isCompleted })}
                  style={{ width: `calc(100px / ${steps.length})` }}
                />
              )}
            </div>
          );
        })}
      </div>
      <Spacer height={16} />
      <div className={cn('flex-1', containerClassName)} {...containerProps}>
        {steps[currentStep]?.component({ next, prev, nextStep: steps[currentStep + 1] })}
      </div>
    </div>
  );
};
