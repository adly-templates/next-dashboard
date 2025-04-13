export const objectToUrlParams = (obj: Record<string, string>) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const joinWithUrlParams = (url: string, params: Record<string, string>) => {
  if (Object.keys(params).length === 0) return url;
  return `${url}?${objectToUrlParams(params)}`;
};

export const getUrlParams = () => {
  'use client';

  return new URLSearchParams(window.location.search);
};

export const extractUrlParam = (param: string) => {
  return getUrlParams().get(param);
};

export const extractUrlParamsAsObject = () => {
  return Object.fromEntries(getUrlParams().entries());
};

export const deleteUrlParam = (param: string) => {
  getUrlParams().delete(param);
};

export const goToUrl = (url: string, params?: Record<string, string>) => {
  'use client';
  window.location.href = joinWithUrlParams(url, params ?? {});
};

export const setUrlParam = (param: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
};
