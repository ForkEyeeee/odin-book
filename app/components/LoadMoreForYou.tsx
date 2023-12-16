'use client';
import { useEffect, useState, useCallback, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner, Center } from '@chakra-ui/react';
import { getPosts, getPostTime } from '../lib/actions';
import { PostWithAuthor } from '../lib/definitions';
import PostList from './PostList';
import { useSession } from 'next-auth/react';

export default function LoadMoreForYou() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [page, setPage] = useState(0);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const { data: session } = useSession();

  const loadMorePosts = useCallback(async () => {
    const nextPage = page + 1;
    const { timelinePosts, timelinePostsCount } = (await getPosts(nextPage)) ?? [];

    if (timelinePosts === undefined) return;

    await Promise.allSettled(
      timelinePosts.map(async (post: PostWithAuthor) => {
        try {
          const test = await getPostTime(post.createdAt);
          post.postTime = test;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );
    setPosts((prevPosts: PostWithAuthor[]) => [...prevPosts, ...timelinePosts]);
    setPage(nextPage);
    setTotalPostCount(timelinePostsCount);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (posts.length >= totalPostCount && posts.length > 0) return;
    if (inView) {
      setIsLoading(true);
      loadMorePosts();
    }
  }, [inView, loadMorePosts, posts.length, totalPostCount]);

  const userId = session?.user.id !== null ? session?.user.id : null;

  if (isLoading && posts.length === 0)
    return (
      <Center h={'100vh'}>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <>
      {session && (
        <div>
          <PostList forYouPosts={posts} userId={userId!!} />
          <div
            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
            ref={ref}
          >
            {isLoading ? <Spinner /> : null}
          </div>
        </div>
      )}
    </>
  );
}
