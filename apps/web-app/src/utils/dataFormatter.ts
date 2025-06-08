export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric', // "2025"
    month: 'long', // "July"
    day: 'numeric', // "5"
    hour: 'numeric', // "1"
    minute: 'numeric', // "00"
    timeZoneName: 'short', // "CEST" or "GMT+2"
  }).format(date);
};
