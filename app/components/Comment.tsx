'use client';
import { Box, Text, Flex, Avatar, Spacer, IconButton, VStack } from '@chakra-ui/react';
import { FaRegCommentDots, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import Link from 'next/link';

export default function Comment({ comments }) {
  if (comments === undefined || comments.length === 0) return null;

  return (
    <VStack spacing={4} align="stretch" bg="#15202B" p={4} borderRadius={5} mt={5}>
      {comments.map((comment, index) => (
        <Flex key={comment.id} align="start" mt={index > 0 ? 6 : 0}>
          <Link href={`/profile/${'test'}`}>
            <Avatar
              size="sm"
              // name={comment.author.name}
              // src={`${comment.author.profilePicture}`}
              cursor="pointer"
              bg="white"
              mt="1"
            />
          </Link>
          <Box ml="3" pt="1">
            <Text fontWeight="bold" color="white" fontSize="sm">
              EAW {/* comment.author.name */}
            </Text>
            <Text color="gray.400" fontSize="xs">
              {comment.createdAt.toDateString()}
            </Text>
            <Text color="gray.200" fontSize="sm" mt="1">
              {comment.content}
            </Text>
            <Flex mt="2" color="gray.400" fontSize="sm">
              <IconButton
                aria-label="Reply"
                variant="ghost"
                icon={<FaRegCommentDots />}
                size="sm"
              />
              <IconButton aria-label="Like" variant="ghost" icon={<FaRegHeart />} size="sm" />
              <IconButton
                aria-label="Share"
                variant="ghost"
                icon={<FaRegShareSquare />}
                size="sm"
              />
              <Spacer />
            </Flex>
          </Box>
        </Flex>
      ))}
    </VStack>
  );
}
