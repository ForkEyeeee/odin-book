'use client';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { PostProps } from '../lib/definitions';

export default function ProfilePost({ posts }: PostProps) {
  return (
    <>
      {posts !== undefined &&
        posts.map(post => (
          <Box
            key={post.id}
            borderWidth="1px"
            borderRadius="md"
            padding="20px"
            width="100%"
            boxShadow="md"
            mt="10"
          >
            <Link href={`/posts/${post.id}`} passHref>
              {post.content}
            </Link>
          </Box>
        ))}
    </>
  );
}
