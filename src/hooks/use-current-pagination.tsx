'use client';

import { useSearchParams } from 'next/navigation';

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 20;

export const useCurrentPagination = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const per = Number(searchParams.get('per')) || DEFAULT_ITEMS_PER_PAGE;
  return { page, per };
};
