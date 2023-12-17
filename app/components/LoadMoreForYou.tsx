'use client';
import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner, Center, Flex } from '@chakra-ui/react';
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
    setPosts(prevPosts => {
      const newPosts = timelinePosts.filter(
        newPost => !prevPosts.some(prevPost => prevPost.id === newPost.id)
      );
      return [...prevPosts, ...newPosts];
    });
    setPage(nextPage);
    setTotalPostCount(timelinePostsCount);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      loadMorePosts();
    }
  }, [inView, loadMorePosts]);

  const userId = session?.user.id !== null ? session?.user.id : null;

  return (
    <>
      {session && (
        <>
          <PostList forYouPosts={posts} userId={userId!!} />
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
  );
}
