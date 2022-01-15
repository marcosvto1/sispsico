
export function formatDate(date: Date) {
  const dateString = date.getDate()  + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + ' ' +
  date.getHours() + ':' + date.getMinutes();
  return dateString;

}
