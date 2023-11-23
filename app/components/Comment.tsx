'use client';
import { Box, Text, Flex, Avatar, Spacer, IconButton, VStack, HStack } from '@chakra-ui/react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { likeComment, deleteComment } from '../lib/actions';
import { DeleteIcon } from '@chakra-ui/icons';
import { CommentProps } from '../lib/definitions';

export default function Comment({ comments, post, userId }: CommentProps) {
  return (
    <VStack spacing={4} align="stretch" p={4} borderRadius={5}>
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
                src={comment.author.profilePicture === null ? '' : comment.author.profilePicture}
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
              <HStack justifyContent="space-between" minW={{ base: '100%' }}>
                <Flex alignItems={'center'}>
                  <IconButton
                    aria-label="Like"
                    icon={<FaHeart color={userLikedComment ? '#f91880' : '#71767C'} />}
                    onClick={() => likeComment(comment.id, post.id)}
                    size="sm"
                    _hover={{
                      bg: 'pink.200',
                    }}
                    isRound
                  />
                  <Text color={'#71767C'}>{comment.commentLikes.length}</Text>
                </Flex>
                <IconButton
                  aria-label="delete"
                  icon={<FaTrash />}
                  onClick={() => deleteComment(comment.id)}
                  size="sm"
                  color={'red'}
                />
              </HStack>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
}
