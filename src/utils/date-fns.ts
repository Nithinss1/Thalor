// Simple date formatting utility to replace date-fns
export function format(date: Date, formatStr: string): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  if (formatStr === 'MMM d, yyyy') {
    return `${month} ${day}, ${year}`;
  }
  
  // Add more format patterns as needed
  return date.toLocaleDateString();
}