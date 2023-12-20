'use client';
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Avatar, IconButton, HStack, Spacer } from '@chakra-ui/react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { likeComment, deleteComment } from '../lib/actions';
import { useToast } from '@chakra-ui/react';
import { Comment, Post } from '../lib/definitions';

interface CommentItemProps {
  comment: Comment;
  post: Post;
  userId: number;
  handleDeleteComment: (
    comment: Comment
  ) => Promise<
    | ((
        commentId: number
      ) => Promise<
        | { id: number; content: string; authorId: number; postId: number; createdAt: Date }
        | { message: string }
      >)
    | undefined
  >;
}

export default function CommentItem({
  comment,
  post,
  userId,
  handleDeleteComment,
}: CommentItemProps) {
  const toast = useToast();
  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(
    comment.commentLikes.some(element => element.authorId === userId)
  );
  const [likeCount, setLikeCount] = useState(comment.commentLikes.length);

  const isAuthor = comment.author.id === userId;

  const handleLikeClick = async () => {
    try {
      await likeComment(comment.id, userId);
      setIsLiked(current => !current);
      setLikeCount(current => current + (isLiked ? -1 : 1));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to like comment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="start" mt={comment.id > 0 ? 6 : 0} width="100%">
      <Link href={`/profile?userid=${post.authorId}`}>
        <Avatar
          size="sm"
          cursor="pointer"
          bg="white"
          mt="1"
          src={comment.author.profilePicture === null ? '' : comment.author.profilePicture}
          name={`${comment.author.name}`}
        />
      </Link>
      <Box ml="3" pt="1" flexGrow={1}>
        <Text fontWeight="bold" color="white" fontSize="sm">
          {comment.author.name}
        </Text>
        <Text color="gray.400" fontSize="xs">
          {comment.createdAt.toDateString()}
        </Text>
        <Text color="gray.200" fontSize="sm" mt="1">
          {comment.content}
        </Text>
        <HStack justifyContent="space-between" width="100%" mt={5}>
          <Flex alignItems={'center'}>
            <IconButton
              aria-label="Like"
              id="comment-like-btn"
              icon={<FaHeart color={isLiked || isHovering ? '#f91880' : '#71767C'} />}
              onClick={() => handleLikeClick()}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              size="sm"
              _hover={{ transform: 'scale(1.1)' }}
              transition="transform 0.2s ease-in-out"
              variant="ghost"
              isRound
            />
            <Text id="comment-likes" color={isHovering || isLiked ? '#f91880' : '#71767C'}>
              {likeCount}
            </Text>
          </Flex>
          <Spacer />
          {isAuthor && (
            <IconButton
              aria-label="delete"
              icon={<FaTrash />}
              id="comment-delete-btn"
              onClick={() => {
                toast({
                  title: 'Deleted successfully.',
                  description: 'Comment has been deleted successfully',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
                handleDeleteComment(comment);
              }}
              _hover={{
                color: 'black',
                bg: 'red',
              }}
              size="sm"
              color="red"
            />
          )}
        </HStack>
      </Box>
    </Flex>
  );
}
