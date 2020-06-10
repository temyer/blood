export function formatDate(date) {
  if (!(date instanceof Date)) return null;

  let day = `${date.getDate()}`;
  let month = `${date.getMonth() + 1}`;
  const year = date.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${day}.${month}.${year}`;
}

export const x = 1;
