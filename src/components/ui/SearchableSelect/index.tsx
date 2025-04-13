import * as React from 'react';
import { Check, ChevronsUpDown, SearchIcon, XIcon } from 'lucide-react';

import {
  Button,
  ButtonProps,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Spacer,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
} from '@/components';
import { cn } from '@/utils';

export type SearchableSelectProps = {
  label?: string;
  name?: string;
  required?: boolean;
  showAsRequired?: boolean;
  labelProps?: TextProps;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  emptyMessage?: string;
  inputProps?: TextInputProps;
  triggerProps?: React.ComponentProps<typeof PopoverTrigger>;
  triggerButtonProps?: ButtonProps;
  contentProps?: React.ComponentProps<typeof PopoverContent>;
} & React.ComponentProps<typeof Popover>;

export function SearchableSelect({
  options,
  placeholder,
  onChange,
  label,
  name,
  required,
  showAsRequired,
  labelProps: { className: labelClassName, ...labelProps } = {},
  emptyMessage = 'No items found.',
  triggerProps: { className: triggerClassName, ...triggerProps } = {},
  triggerButtonProps: { className: triggerButtonClassName, ...triggerButtonProps } = {},
  contentProps: { className: contentClassName, ...contentProps } = {},
  inputProps: {
    className: inputClassName,
    containerClassName: inputContainerClassName,
    onChange: inputOnChange,
    ...inputProps
  } = {},
  ...props
}: SearchableSelectProps) {
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleSelect = React.useCallback(
    (value: string) => {
      setValue(value);
      setOpen(false);
      onChange?.(value);
    },
    [onChange, setValue, setOpen],
  );

  return (
    <div className="flex flex-col">
      {!!label && (
        <>
          <div className="flex items-center gap-2">
            <Text size="smd" className={cn('text-gray-600', labelClassName)} {...labelProps}>
              {label}
            </Text>
            {(required || showAsRequired) && (
              <Text className="text-red-500" size="md">
                *
              </Text>
            )}
          </div>
          {!!name && <Input name={name} type="hidden" value={value} required={required} />}
          <Spacer height={5} />
        </>
      )}
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild className={cn(triggerClassName)} {...triggerProps}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="lg"
            className={cn('w-[300px] px-2 flex justify-start test relative', triggerButtonClassName)}
            {...triggerButtonProps}
          >
            {value && (
              <div
                className="absolute -right-1 -top-1 z-50 cursor-pointer bg-red-500 rounded-full"
                onClick={() => setValue('')}
              >
                <XIcon className="h-2 w-2 text-white" />
              </div>
            )}
            <ChevronsUpDown className="ml-0 h-4 w-4 shrink-0 opacity-50" />
            {value ? (
              options.find((option) => option.value === value)?.label
            ) : (
              <Text size="sm" className="text-gray-400">
                {placeholder}
              </Text>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-[300px] p-0', contentClassName)} {...contentProps}>
          <Command>
            <div className="p-1">
              <div className="flex items-center">
                <SearchIcon className="h-4 w-4 mx-2 mr-3 opacity-50" />
                <TextInput
                  containerClassName={cn('w-full', inputContainerClassName)}
                  className={cn(
                    'p-1 py-2 w-full h-full outline-none active:border-none focus:border-none focus:ring-gray-200',
                    inputClassName,
                  )}
                  onChange={(e) => {
                    setFilteredOptions(
                      options.filter((option) => option.label.toLowerCase().includes(e.target.value.toLowerCase())),
                    );
                    inputOnChange?.(e);
                  }}
                  {...inputProps}
                />
              </div>
              <Spacer height={4} />
              <Separator className="opacity-50" />
            </div>
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    className="flex justify-between"
                  >
                    {option.label}
                    <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
