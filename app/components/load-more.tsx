'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner, Box, Center, AbsoluteCenter, Flex } from '@chakra-ui/react';
import { getPosts, getPostTime } from '../lib/actions';
import { PostWithAuthor } from '../lib/definitions';
import PostList from './PostList';
import { useSession } from 'next-auth/react';

export default function LoadMore() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { ref, inView } = useInView();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const userId = session?.user.id !== null ? session?.user.id : null;

  const loadMorePosts = async () => {
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
    setTotalPages(timelinePostsCount);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      loadMorePosts();
    }
  }, [inView]);

  if (isLoading)
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    );

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
            {posts.length !== totalPages ? <Spinner /> : null}
          </div>
        </div>
      )}
    </>
  );
}
