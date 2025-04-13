import React from 'react';
import { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { textStyles } from './styles';

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';

export type TextProps<T extends TextElement = 'p'> = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  bold?: boolean;
  uppercase?: boolean;
  as?: T;
  dir?: 'rtl' | 'ltr';
  font?: 'roboto';
  hidden?: boolean;
} & Omit<React.ComponentPropsWithRef<T>, 'className'> &
  VariantProps<typeof textStyles>;

export const Text = <T extends TextElement = 'p'>({
  className,
  children,
  size = 'md',
  uppercase,
  bold = false,
  color,
  as,
  style,
  dir,
  font = 'roboto',
  hidden,
  ...rest
}: TextProps<T>) => {
  if (hidden) return null;
  const obj = {
    className: cn(textStyles({ size }), 'text-black', { ['uppercase']: uppercase }, { 'font-bold': bold }, className),
    dir,
    style: {
      fontFamily: font,
      color,
      ...style,
    },
    ...rest,
  };
  const Tag = (as || 'p') as React.ElementType;
  return <Tag {...obj}>{children}</Tag>;
};
