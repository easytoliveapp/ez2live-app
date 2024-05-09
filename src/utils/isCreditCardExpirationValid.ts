export default function isCreditCardExpirationValid(
  month: string,
  year: string,
) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (parseInt(month) < currentMonth && parseInt(year) <= currentYear) {
    return false;
  }

  return true;
}
