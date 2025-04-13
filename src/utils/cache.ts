export const noCacheFetchPolicy = {
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-first',
} as const;
