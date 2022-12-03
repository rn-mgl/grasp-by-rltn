export const convertTime = (date) => {
  const converted = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return converted;
};
