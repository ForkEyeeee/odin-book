'use client';
import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner, Flex } from '@chakra-ui/react';
import { getPosts, getPostTime } from '../lib/actions';
import { PostWithAuthor } from '../lib/definitions';
import PostList from './PostList';
import { useSession } from 'next-auth/react';
import Loading from './loading';

interface LoadMoreDiscoverProps {
  initialPosts: PostWithAuthor[];
  otherTimelinePostsCount: number;
}

export default function LoadMoreDiscover({
  initialPosts,
  otherTimelinePostsCount,
}: LoadMoreDiscoverProps) {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { ref, inView } = useInView();
  const { data: session } = useSession();

  useEffect(() => {
    setPosts(initialPosts);
    setTotalPostCount(otherTimelinePostsCount);
    setTimeout(() => setInitialLoading(false), 1000);
  }, [initialPosts, otherTimelinePostsCount]);

  const getNewPosts = useCallback(async () => {
    const nextPage = posts.length / 5 + 1;

    const { otherTimeLinePosts, otherTimelinePostsCount } = (await getPosts(nextPage)) ?? [];

    if (otherTimeLinePosts === undefined) return;

    await Promise.allSettled(
      otherTimeLinePosts.map(async (post: PostWithAuthor) => {
        try {
          const test = await getPostTime(post.createdAt);
          post.postTime = test;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );
    setPosts(prevPosts => {
      const newPosts = otherTimeLinePosts.filter(
        newPost => !prevPosts.some(prevPost => prevPost.id === newPost.id)
      );
      return [...prevPosts, ...newPosts];
    });
    setTotalPostCount(otherTimelinePostsCount);
    setIsLoading(false);
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
                <PostList discoverPosts={posts} userId={session?.user.id ?? null} />
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
