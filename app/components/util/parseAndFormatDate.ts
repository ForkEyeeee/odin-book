import { format } from 'date-fns';

export default function parseAndFormatDate(isoDateString: string | undefined): {
  inputFormattedDate: string;
  formattedDate: string;
} {
  if (!isoDateString) {
    return { inputFormattedDate: '', formattedDate: '' };
  }

  const parts = isoDateString.split('T')[0].split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const dateObject = new Date(year, month, day);
  const inputFormattedDate = format(dateObject, 'yyyy-MM-dd');
  const formattedDate = format(dateObject, 'MMMM do, yyyy');

  return { inputFormattedDate, formattedDate };
}
