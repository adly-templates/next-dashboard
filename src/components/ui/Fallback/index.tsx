import React from 'react';

export type FallbackProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  disabled?: boolean;
} & React.ComponentProps<'div'>;

// Fallback component to show a fallback component if the children is null
export const Fallback = ({ children, fallback, disabled, ...props }: FallbackProps) => {
  if (disabled) return children;

  return (
    <div className="fallback-if-empty" {...props}>
      {children}
      <div className="fallback-helper">{fallback}</div>
    </div>
  );
};
