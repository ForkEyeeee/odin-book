import { Post } from '../lib/definitions';

interface HomePageProps {
  data: Post[];
}

function HomePage({ data }: HomePageProps) {
  return (
    <div>
      {data.map(post => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  );
}

export default HomePage;
