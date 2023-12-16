'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@chakra-ui/react';
import { getPosts, getPostTime } from '../lib/actions';
// import { Beers } from '@/components/beers';
import { Post, PostWithAuthor } from '../lib/definitions';
import PostList from './PostList';
import { useSession } from 'next-auth/react';

export default function LoadMore() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [page, setPage] = useState(0);
  const { ref, inView } = useInView();
  const { data: session } = useSession();
  const userId = session?.user.id !== null ? session?.user.id : null;

  const loadMorePosts = async () => {
    // Once the page 8 is reached repeat the process all over again.
    console.log('running');
    const nextPage = page + 1;
    const newPosts = (await getPosts(nextPage)).timelinePosts ?? [];
    await Promise.allSettled(
      newPosts.map(async (post: PostWithAuthor) => {
        try {
          const test = await getPostTime(post.createdAt);
          post.postTime = test;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );
    console.log(newPosts);
    setPosts((prevPosts: PostWithAuthor[]) => [...prevPosts, ...newPosts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  console.log(posts);
  return (
    <>
      {session && (
        <div>
          <PostList forYouPosts={posts} userId={userId!!} />
          <div
            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
            ref={ref}
          >
            {posts.length !== 0 ? <Spinner /> : null}
          </div>
        </div>
      )}
      <div>TEST</div>
    </>
  );
}
