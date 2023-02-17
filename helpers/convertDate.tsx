const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const getConvertDate = (currentDate: string | number | Date): string => {
  let date = new Date(currentDate);
  let day = date.getDate();
  let month = monthName[date.getMonth()];
  let year = date.getFullYear();

  return `${month} ${day} ${year}`;
};
