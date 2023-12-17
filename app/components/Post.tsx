'use client';
import {
  Box,
  Text,
  Flex,
  Avatar,
  IconButton,
  Textarea,
  FormControl,
  Button,
  VStack,
  HStack,
  Center,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { PostProps } from '../lib/definitions';
import Link from 'next/link';
import { deletePost, likePost } from '../lib/actions';
import Comment from './Comment';
import { useFormState } from 'react-dom';
import { createComment } from '../lib/actions';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import PostSpinner from '../for-you/loading';
import Loading from '../posts/loading';

const initialState = { message: null, errors: {} };

export function Post({ post, index, userId, innerRef }: PostProps) {
  const [state, formAction] = useFormState(createComment, initialState);
  const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
  const [inputText, setInputText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (state !== null) {
      setInputText('');
      setIsSubmitted(false);
    }
  }, [state]);

  useEffect(() => {
    if (isSubmitted === false) {
      toast({
        position: 'top',
        title: 'Message sent.',
        description: 'Message has been sent successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    setIsSubmitted(null);
  }, [isSubmitted, toast]);

  const isLiked = post.likes.find(element => element.authorId === userId);
  const isAuthor = post.authorId === userId;

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Suspense fallback={<Loading />}>
        <Center ref={innerRef}>
          <Box
            bg={'black'}
            borderWidth="1px"
            borderRadius="md"
            borderColor={'whitesmoke'}
            padding={{ base: '20px' }}
            w={{ base: 300, sm: 430, md: 700, lg: 900, xl: 1200 }}
            boxShadow="md"
            mt={index !== undefined && index > 0 ? 10 : 0}
            className="test"
          >
            <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
              <Flex justifyContent={'space-between'}>
                <Box ml={2}>
                  <Flex width="100%" gap={10} alignItems={'flex-start'}>
                    <Link href={`/profile?userid=${post.authorId}`}>
                      <Avatar
                        size={{ base: 'sm', sm: 'md' }}
                        name="John Doe"
                        src={`${post.author.profilePicture}`}
                        colorScheme="green"
                        loading="eager"
                      />
                    </Link>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight="bold">{post.author.name}</Text>
                      <Text color="gray.500" maxW={{ base: 150, sm: '100%' }}>
                        {post.author.email}
                      </Text>
                      <Text color="gray.500">{post.postTime}</Text>
                    </VStack>
                  </Flex>
                  <Text
                    mt="4"
                    mb={{ base: 3 }}
                    minW={{ base: '200px', sm: '330px' }}
                    overflowWrap={'anywhere'}
                  >
                    {post.content}
                  </Text>
                  {post.imageUrl !== null && post.imageUrl !== '' && (
                    <HStack
                      alignItems={'flex-start'}
                      key={post.id}
                      justifyContent={'space-between'}
                    >
                      <Box position={'relative'} borderRadius="md" overflow="hidden">
                        <Image
                          src={`${post.imageUrl}`}
                          alt={`Post image ${post.id}`}
                          height={300}
                          width={550}
                          quality={100}
                          placeholder={post.blurURL !== null ? 'blur' : 'empty'}
                          blurDataURL={post.blurURL !== null ? post.blurURL : ''}
                          priority
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
                    id="delete-post-btn"
                    color={'red'}
                    onClick={() => {
                      toast({
                        title: 'Deleted successfully.',
                        description: 'Post has been deleted successfully',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      });
                      deletePost(post.id, post.imageUrl!!);
                    }}
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
                  id="post-like-btn"
                  icon={<FaHeart color={isLiked || isHovering ? '#f91880' : 'currentColor'} />}
                  onClick={() => likePost(post.id)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  size={{ base: 'sm', xl: 'md' }}
                  variant="ghost"
                  _hover={{
                    transform: 'scale(1.25)',
                  }}
                  isRound
                  transition="transform 0.2s ease-in-out"
                />
                <Text
                  fontSize={{ base: 'sm', xl: 'md' }}
                  id="post-likes"
                  color={isHovering ? '#f91880' : 'currentColor'}
                  transition="color 0.2s ease-in-out"
                >
                  {post.likes.length}
                </Text>
              </HStack>
            </Flex>
            <form onSubmit={() => setIsSubmitted(true)} action={formAction}>
              <VStack alignItems={'flex-end'} spacing={5}>
                <FormControl mt={5}>
                  <input type="hidden" name="postId" value={post.id} />
                  <Textarea
                    name="comment"
                    id="comment-area"
                    placeholder="Post your reply"
                    onChange={e => setInputText(e.currentTarget.value)}
                    value={inputText}
                    required
                  />
                </FormControl>
                <Button
                  type="submit"
                  id="comment-submit-btn"
                  variant={'solid'}
                  _hover={{
                    bg: 'green',
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
      </Suspense>
    </motion.div>
  );
}
