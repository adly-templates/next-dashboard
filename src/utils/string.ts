import moment from 'moment';

export const truncateString = (str: string | undefined, maxLength: number) => {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

type FormatDateOptions = {
  locale?: string;
  format?: string;
  showTime?: boolean;
};

export const formatDate = (date: string | Date, options: FormatDateOptions = {}) => {
  const { locale = 'en', format = 'DD MMMM YYYY', showTime = true } = options;
  const formattedDate = moment(date).locale(locale).format(format);
  return showTime ? `${formattedDate} , ${moment(date).locale(locale).format('hh:mm A')}` : formattedDate;
};

type FormatPriceOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  hideCurrency?: boolean;
};

export const formatPrice = (price: number | undefined, defaultPrice = 0, options: FormatPriceOptions = {}) => {
  const formattedPrice = new Intl.NumberFormat(options.locale || 'en-EG', {
    style: 'currency',
    currency: options.currency || 'EGP',
    minimumFractionDigits: options.minimumFractionDigits || 2,
    maximumFractionDigits: options.maximumFractionDigits || 2,
    numberingSystem: 'latn',
    ...options,
  })
    .format(price || defaultPrice)
    .replace('EGP', '');

  return options.hideCurrency ? formattedPrice.trim() : `${formattedPrice} EGP`;
};

export const randomId = () => {
  return Math.random().toString().substring(2, 10);
};

export const generateSku = (requestId: string) => {
  return `${requestId}-${randomId()}`;
};

export const isValidEmail = (email: string) => {
  return /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
