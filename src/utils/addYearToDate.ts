export const addYear = (date: string) => {
  const currentDate = new Date(Date.parse(date));
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  return `${month} ${day}, ${year}`
}