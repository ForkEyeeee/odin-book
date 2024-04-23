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
} from '@chakra-ui/react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { PostProps, User } from '../lib/definitions';
import Link from 'next/link';
import Comment from './Comment';
import { deletePost, getUser, likePost } from '../lib/actions';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { createComment } from '../lib/actions';
import { motion } from 'framer-motion';
import Loading from '../posts/loading';
import { deleteComment } from '../lib/actions';
import { Comment as CommentType } from '../lib/definitions';

export function Post({ post, index, userId, innerRef }: PostProps) {
  const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLiked, setIsLiked] = useState(post.likes.some(element => element.authorId === userId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [postComments, setPostComments] = useState<CommentType[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setPostComments(post.comments);
  }, [post.comments]);

  const addComment = async () => {
    try {
      const createdComment = (await createComment(post.id, inputText)) as CommentType;
      const user: User = await getUser();

      if (user === undefined) return;

      const commentData = {
        content: inputText,
        authorId: userId,
        postId: post.id,
        createdAt: new Date(),
        author: {
          id: user.id,
          googleId: user.googleId,
          name: user.name,
          email: user.email,
          profileId: user.profileId,
          profilePicture: user.profilePicture,
        },
        commentLikes: [],
        id: createdComment.id,
      };
      setPostComments(prevComments => [...prevComments, commentData]);
      setInputText('');
      setIsSubmitted(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteComment = async (comment: CommentType) => {
    const deletedComment = await deleteComment(comment.id);
    if ('id' in deletedComment) {
      setPostComments(postComments.filter(comment => comment.id !== deletedComment.id));
    } else {
      return deleteComment;
    }
  };

  useEffect(() => {
    if (isSubmitted === false) {
      toast({
        position: 'top',
        title: 'Comment added.',
        description: 'Comment has been added successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    setIsSubmitted(null);
  }, [isSubmitted, toast]);

  const isAuthor = post.authorId === userId;

  const handleLikeClick = () => {
    likePost(post.id);
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

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
            w={{ base: 320, sm: 430, md: 700, lg: 900, xl: 1200 }}
            boxShadow="md"
            mt={index !== undefined && index > 0 ? 10 : 0}
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
                      <Text
                        color="gray.500"
                        fontSize={{ base: 'sm', lg: 'initial' }}
                        maxW={{ base: 150, sm: '100%' }}
                      >
                        {post.author.email}
                      </Text>
                      <Text color="gray.500" fontSize={{ base: 'sm', lg: 'initial' }}>
                        {post.postTime}
                      </Text>
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
                  onClick={handleLikeClick}
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
                  color={isLiked || isHovering ? '#f91880' : 'currentColor'}
                >
                  {likeCount}
                </Text>
              </HStack>
            </Flex>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (inputText.trim() !== '') {
                  addComment();
                }
              }}
            >
              <VStack alignItems={'flex-end'} spacing={5}>
                <FormControl mt={5}>
                  <Textarea
                    name="comment"
                    id="comment-area"
                    placeholder="Post your reply"
                    onChange={e => setInputText(e.currentTarget.value)}
                    maxLength={150}
                    value={inputText}
                    required
                  />
                </FormControl>
                <Button
                  type="submit"
                  id="comment-submit-btn"
                  _hover={{
                    bg: 'whatsapp.500 !important',
                  }}
                  ml={3}
                  size={{ base: 'sm', xl: 'md' }}
                  backgroundColor={'whatsapp.700 !important'}
                >
                  Submit
                </Button>
              </VStack>
            </form>
            {postComments !== undefined && postComments.length > 0 && (
              <Comment
                comments={postComments}
                post={post}
                userId={userId}
                handleDeleteComment={handleDeleteComment}
              />
            )}
          </Box>
        </Center>
      </Suspense>
    </motion.div>
  );
}
