import * as React from 'react';

import { TextArea } from '@/components';
import { cn } from '@/utils';

type ChatInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(({ className, ...props }, ref) => (
  <TextArea
    autoComplete="off"
    ref={ref}
    name="message"
    className={cn(
      'max-h-12 px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none',
      className,
    )}
    {...props}
  />
));
ChatInput.displayName = 'ChatInput';

export { ChatInput };
