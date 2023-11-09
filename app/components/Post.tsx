'use client';
import { Box, Text, Flex, Avatar, Spacer, IconButton, HStack } from '@chakra-ui/react';
import { FaComment, FaRetweet, FaHeart, FaShareAlt } from 'react-icons/fa';
import { PostProps } from '../lib/definitions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { likePost } from '../lib/actions';

export function Post({ post, index }: PostProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      padding="20px"
      width="100%"
      boxShadow="md"
      mt={index > 0 ? 10 : 0}
    >
      <Flex>
        <Link href={`/profile/${post.author.id}`}>
          <Avatar size="md" name="John Doe" src={`${post.author.profilePicture}`} />
        </Link>
        <Box ml="4">
          <Text fontWeight="bold">{post.author.name}</Text>
          <Text noOfLines={{ base: 1 }} color="gray.500" maxW={{ base: '200px', sm: '100%' }}>
            {post.author.email}
          </Text>
          <Text color="gray.500">{post.createdAt.toDateString()}</Text>
        </Box>
        <Spacer />
      </Flex>
      <Text mt="4">{post.content}</Text>
      <Flex justifyContent="space-between" mt={{ base: '10px' }}>
        <IconButton aria-label="Comment" icon={<FaComment />} />
        <IconButton aria-label="Retweet" icon={<FaRetweet />} />
        <IconButton
          aria-label="Like"
          icon={<FaHeart />}
          onClick={() => likePost(post.authorId, post.id, post.likes.length)}
          color={post.likes.length !== 0 ? 'pink' : 'initial'}
        />
        <IconButton aria-label="Share" icon={<FaShareAlt />} />
      </Flex>
    </Box>
  );
}
