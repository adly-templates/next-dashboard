// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToBase64 = (value: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const base64able = (value?: string) => {
  return isBase64(value) ? value : undefined;
};

export const isBase64 = (value?: string) => {
  return value && /^data:image\/(png|jpeg|jpg|gif|svg);base64,/.test(value);
};
