'use client';
import {
  Box,
  Text,
  Flex,
  Avatar,
  Spacer,
  IconButton,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { PostProps } from '../lib/definitions';
import Link from 'next/link';
import { deletePost, likePost } from '../lib/actions';
import Comment from './Comment';
import { useFormState } from 'react-dom';
import { createComment } from '../lib/actions';
import { getFile } from '../lib/actions';
import Image from 'next/image';

const initialState = { message: null, errors: {} };

export function Post({ post, index, userId }: PostProps) {
  const [state, formAction] = useFormState(createComment, initialState);
  const isLiked = post.likes.find(element => element.authorId === userId);
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
          {post.imageUrl !== null && (
            <Image
              alt="post image"
              src={post.imageUrl}
              width={800}
              height={500}
              unoptimized={true}
              loading="lazy"
            />
          )}
          <Text color="gray.500">{post.createdAt.toDateString()}</Text>
        </Box>
        <Spacer />
      </Flex>
      <Text mt="4">{post.content}</Text>
      <Flex justifyContent="space-between" mt={{ base: '10px' }}>
        <IconButton
          aria-label="Like"
          icon={<FaHeart />}
          onClick={() => likePost(post.id)}
          color={isLiked ? 'pink' : 'initial'}
        />
        <Text>{post.likes.length}</Text>
        <IconButton
          aria-label="trash icon"
          icon={<FaTrash />}
          onClick={() => deletePost(post.id)}
        />
      </Flex>
      <Comment comments={post.comments} post={post} userId={userId} />
      <form action={formAction}>
        <FormControl>
          <FormLabel htmlFor="comment">Edit Mode</FormLabel>
          <input type="hidden" name="postId" value={post.id} />
          <Textarea name="comment" placeholder="Enter a new comment" />
        </FormControl>
        <Button type="submit" variant={'solid'}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
