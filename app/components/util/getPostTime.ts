import { format, formatDistanceToNowStrict } from 'date-fns';

const getPostTime = (time: Date) => {
  const postDate = new Date(time);
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const timeDifference = now.getTime() - postDate.getTime();
  const displayDate =
    timeDifference > oneDayInMs
      ? format(postDate, "MMM d, yyyy, h:mm:ss a 'UTC'")
      : formatDistanceToNowStrict(postDate, { addSuffix: true });
  return displayDate;
};

export default getPostTime;
