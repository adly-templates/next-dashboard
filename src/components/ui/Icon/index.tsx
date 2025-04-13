import React from 'react';
import * as icons from 'lucide-react';

export type LIconName = keyof typeof icons;

export type IconProps = {
  name: LIconName;
} & Omit<React.ComponentProps<typeof icons.Bell>, 'name' | '$$typeof' | 'ref'>;

export const LIcon = ({ name, ...rest }: IconProps) => {
  const Icon = icons[name] as React.ElementType;
  return <Icon {...rest} />;
};
