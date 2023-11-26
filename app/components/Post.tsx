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
  VStack,
  HStack,
  Center,
} from '@chakra-ui/react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { PostProps } from '../lib/definitions';
import Link from 'next/link';
import { deletePost, likePost } from '../lib/actions';
import Comment from './Comment';
import { useFormState } from 'react-dom';
import { createComment } from '../lib/actions';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollToTop from './ScrollToTop';

const initialState = { message: null, errors: {} };

export function Post({ post, index, userId }: PostProps) {
  const [state, formAction] = useFormState(createComment, initialState);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (state !== null) setInputText('');
  }, [state]);
  console.log(index);
  const isLiked = post.likes.find(element => element.authorId === userId);
  const isAuthor = post.authorId === userId;

  return (
    <Center>
      <Box
        borderWidth="1px"
        borderRadius="md"
        padding={{ base: '20px' }}
        // w={{ base: '800%' }}
        // maxW={{ base: '100%', sm: '90%' }}
        // minW={{ sm: '90%' }}
        w={{ base: 300, sm: 430, md: 700, lg: 900, xl: 1200 }}
        boxShadow="md"
        mt={index > 0 ? 10 : 0}
        className="test"
      >
        <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
          <Flex justifyContent={'space-between'}>
            <Box ml={2}>
              <Flex width="100%" gap={10} alignItems={'flex-start'}>
                <Link href={`/profile?userid=${post.authorId}&page=1`}>
                  <Avatar
                    size={{ base: 'sm', sm: 'md' }}
                    name="John Doe"
                    src={`${post.author.profilePicture}`}
                  />
                </Link>
                <VStack alignItems={'flex-start'}>
                  <Text fontWeight="bold">{post.author.name}</Text>
                  <Text color="gray.500" maxW={{ base: 150, sm: '100%' }}>
                    {post.author.email}
                  </Text>
                  <Text color="gray.500">{format(new Date(post.createdAt), 'PPpp')}</Text>
                </VStack>
              </Flex>
              <Text mt="4" mb={{ base: 3 }} minW={{ base: '200px', sm: '330px' }}>
                {post.content}
              </Text>
              {post.imageUrl !== null && (
                <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
                  <Box
                    borderRadius="md"
                    overflow="hidden"
                    position="relative"
                    width="100%"
                    height="auto"
                  >
                    <Image
                      src={post.imageUrl}
                      alt={`Post image ${post.id}`}
                      layout="responsive"
                      width={0}
                      height={0}
                      objectFit="contain"
                      unoptimized
                    />
                  </Box>
                </HStack>
              )}
            </Box>
          </Flex>
          <Flex alignItems={'flex-start'}>
            {isAuthor && (
              <IconButton
                aria-label="Delete post"
                icon={<FaTrash />}
                onClick={() => deletePost(post.id)}
                size="sm"
                _hover={{
                  bg: 'red',
                  color: 'black',
                }}
              />
            )}
          </Flex>
        </HStack>
        <Flex justifyContent={'flex-end'} mt={{ base: '10px' }}>
          <HStack spacing={0}>
            <IconButton
              aria-label="Like"
              icon={<FaHeart color={isLiked ? '#f91880' : '#71767C'} />}
              onClick={() => likePost(post.id)}
              _hover={{
                bg: 'pink.200',
              }}
              size="md"
              isRound
            />
            <Text color={'#71767C'}>{post.likes.length}</Text>
          </HStack>
        </Flex>
        <form action={formAction}>
          <VStack alignItems={'flex-end'} spacing={5}>
            <FormControl mt={5}>
              <input type="hidden" name="postId" value={post.id} />
              <Textarea
                name="comment"
                placeholder="Post your reply"
                onChange={e => setInputText(e.currentTarget.value)}
                value={inputText}
              />
            </FormControl>
            <Button
              type="submit"
              variant={'solid'}
              _hover={{
                bg: 'green',
                // color: 'black',
              }}
            >
              Submit
            </Button>
          </VStack>
        </form>
        {post.comments !== undefined && post.comments.length > 0 && (
          <Comment comments={post.comments} post={post} userId={userId} />
        )}
      </Box>
    </Center>
  );
}
