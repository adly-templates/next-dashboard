import Cookies from 'js-cookie';

const getExpireDate = () => new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

export const getToken = () => Cookies.get('token');
export const setToken = (token: string) =>
  Cookies.set('token', token, {
    expires: getExpireDate(),
  });
export const removeToken = () => Cookies.remove('token');
