'use client';
import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner, Flex } from '@chakra-ui/react';
import { getPosts, getPostTime } from '../lib/actions';
import { PostWithAuthor } from '../lib/definitions';
import PostList from './PostList';
import { useSession } from 'next-auth/react';
import Loading from './loading';

interface LoadMoreForYouProps {
  initialPosts: PostWithAuthor[];
  timelinePostsCount: number;
}

export default function LoadMoreForYou({ initialPosts, timelinePostsCount }: LoadMoreForYouProps) {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { ref, inView } = useInView();
  const { data: session } = useSession();

  useEffect(() => {
    setPosts(initialPosts);
    setTotalPostCount(timelinePostsCount);
    setTimeout(() => setInitialLoading(false), 1000);
  }, [initialPosts, timelinePostsCount]);

  const getNewPosts = useCallback(async () => {
    try {
      const nextPage = posts.length / 5 + 1;

      const { timelinePosts, timelinePostsCount } = (await getPosts(nextPage)) ?? [];

      if (timelinePosts === undefined) return;
      await Promise.allSettled(
        timelinePosts.map(async (post: PostWithAuthor) => {
          const time = await getPostTime(post.createdAt);
          post.postTime = time;
        })
      );

      setPosts(prevPosts => {
        const newPosts = timelinePosts.filter(
          newPost => !prevPosts.some(prevPost => prevPost.id === newPost.id)
        );
        return [...prevPosts, ...newPosts];
      });
      setTotalPostCount(timelinePostsCount);
      setIsLoading(false);
    } catch (error) {
      return { message: 'Unable to fetch posts' };
    }
  }, [posts.length]);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      getNewPosts();
    }
  }, [inView, getNewPosts]);

  return (
    <>
      {session && (
        <>
          {initialLoading ? (
            <Loading />
          ) : (
            <>
              {isLoading && posts.length === 0 ? (
                <Loading />
              ) : (
                <PostList forYouPosts={posts} userId={session?.user.id ?? null} />
              )}

              <Flex justifyContent="center" ref={ref} mt={10} mb={10}>
                {posts.length !== totalPostCount ? (
                  <Spinner
                    size={'xl'}
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                  />
                ) : null}
              </Flex>
            </>
          )}
        </>
      )}
    </>
  );
}
