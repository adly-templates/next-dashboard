'use client';

import React from 'react';

import { cn } from '@/utils';

import { Loader } from '../Loader';

type FormDataEntryValue = string | File;

export type FormProps = {
  children: React.ReactNode;
  action?: string;
  className?: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  onFinish?: (values: FormValues) => void;
  multipart?: boolean;
  loading?: boolean;
} & React.HTMLAttributes<HTMLFormElement>;

export type FormValues = Record<string, unknown>;

export const Form = ({ children, action, className, method, onFinish, multipart, loading, ...rest }: FormProps) => {
  return (
    <form
      action={action}
      className={cn('relative', className)}
      method={method}
      encType={multipart ? 'multipart/form-data' : 'application/x-www-form-urlencoded'}
      onSubmit={(e) => {
        e.preventDefault();
        onFinish?.(getFormValues(new FormData(e.target as HTMLFormElement)));
      }}
      {...rest}
    >
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </form>
  );
};

export const getFormValues = (formData: FormData) =>
  handleNestedObjects(
    Array.from(formData.entries()).reduce((acc: Record<string, FormDataEntryValue>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {}),
  );

export const getFormValuesById = (id: string): FormValues | null => {
  const formData = new FormData(document.getElementById(id) as HTMLFormElement);
  return handleNestedObjects(
    Array.from(formData.entries()).reduce((acc: Record<string, FormDataEntryValue>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {}),
  );
};

const handleNestedObjects = (values: Record<string, FormDataEntryValue>) => {
  const result: Record<string, unknown> = {};

  Object.entries(values).forEach(([key, value]) => {
    const parts = key.split('.');
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const nextPart = parts[i + 1];
      const isNextPartArrayIndex = !isNaN(Number(nextPart));

      if (isLast) {
        // Set the final value
        current[part] = value;
      } else {
        // If next part is a number, we need an array
        if (isNextPartArrayIndex) {
          if (!Array.isArray(current[part])) {
            current[part] = [];
          }
          current = current[part] as Record<string, unknown>;
        } else {
          // Create object if it doesn't exist
          if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {};
          }
          current = current[part] as Record<string, unknown>;
        }
      }
    }
  });

  return result;
};
