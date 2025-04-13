'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button, ButtonProps } from '@/components';

export type BackButtonProps = {
  href?: string;
} & ButtonProps;

export const BackButton = ({ ...props }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      icon="arrow-forward"
      className="rounded-full center size-8 text-sm text-black bg-gray-300"
      onClick={() => router.back()}
      {...props}
    />
  );
};
