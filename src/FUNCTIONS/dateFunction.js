export const convertTime = (date) => {
  const convertedDate = new Date(date).toLocaleDateString();
  const Time = new Date(date).toLocaleTimeString().split(" ");
  const time = Time[0];
  const dayStat = Time[1];
  const localtime = time.slice(0, time.length - 3);
  return `${convertedDate} | ${localtime} ${dayStat}`;
};
