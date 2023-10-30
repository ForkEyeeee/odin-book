import { Post } from '../lib/definitions';
import { UserPost } from './UserPost';
import TimeLineTabs from './TimeLineTabs';

interface HomePageProps {
  data: Post[];
}

function HomePage({ data, otherData }: HomePageProps) {
  return (
    <div>
      <TimeLineTabs data={data} otherData={otherData} />
    </div>
  );
}

export default HomePage;
