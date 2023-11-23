'use client';
import { Box, Text, Flex, Avatar, Spacer, IconButton, VStack } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import { likeComment, deleteComment } from '../lib/actions';
import { DeleteIcon } from '@chakra-ui/icons';
import { CommentProps } from '../lib/definitions';

export default function Comment({ comments, post, userId }: CommentProps) {
  return (
    <VStack spacing={4} align="stretch" p={4} borderRadius={5} mt={5}>
      {comments.map(comment => {
        const userLikedComment = comment.commentLikes.some(like => like.authorId === userId);

        return (
          <Flex key={comment.id} align="start" mt={comment.id > 0 ? 6 : 0}>
            <Link href={`/profile/${post.authorId}`}>
              <Avatar
                size="sm"
                cursor="pointer"
                bg="white"
                mt="1"
                src={post.author.profilePicture === null ? '' : post.author.profilePicture}
              />
            </Link>
            <Box ml="3" pt="1">
              <Text fontWeight="bold" color="white" fontSize="sm">
                {comment.author.name}
              </Text>
              <Text color="gray.400" fontSize="xs">
                {comment.createdAt.toDateString()}
              </Text>
              <Text color="gray.200" fontSize="sm" mt="1">
                {comment.content}
              </Text>
              <Flex mt="2" color="gray.400" fontSize="sm">
                <IconButton
                  aria-label="Like"
                  variant="ghost"
                  icon={<FaRegHeart />}
                  onClick={() => likeComment(comment.id, post.id)}
                  size="sm"
                  color={userLikedComment ? 'pink' : 'white'}
                />
                <IconButton
                  aria-label="delete"
                  icon={<DeleteIcon />}
                  onClick={() => deleteComment(comment.id)}
                />
                <Text>{comment.commentLikes.length}</Text>
                <Spacer />
              </Flex>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
}
