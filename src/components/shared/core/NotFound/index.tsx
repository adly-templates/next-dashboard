import React from 'react';
import animationData from '#/assets/lotties/404.json';

import { Button, Lottie, Spacer, Text } from '@/components';
import { useLoading } from '@/contexts';
import { cn } from '@/utils';

export type NotFoundProps = {
  className?: string;
} & React.ComponentProps<'div'>;

export const NotFound = ({ className }: NotFoundProps) => {
  const { isLoading } = useLoading();
  if (isLoading) return null;

  return (
    <div className={cn('flex flex-col md:flex-row items-center justify-evenly h-screen -mt-10', className)}>
      <NotFoundText />
      <Lottie animationData={animationData} />
    </div>
  );
};

export type NotFoundTextProps = {
  className?: string;
} & React.ComponentProps<'div'>;

export const NotFoundText = ({ className }: NotFoundTextProps) => {
  return (
    <div className={cn('flex justify-center flex-col', className)}>
      <Text size="h1" bold>
        This page is not found
      </Text>
      <Spacer height={5} />
      <Text size="lg" className="text-gray-500">
        The page you are looking for does not exist
      </Text>
      <Spacer height={30} />
      <Button
        href="/"
        variant="link"
        className="w-fit border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md duration-300 transition-all"
      >
        Home Page
      </Button>
    </div>
  );
};
