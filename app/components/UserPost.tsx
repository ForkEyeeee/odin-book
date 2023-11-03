import { Box, Text, Flex, Avatar, Spacer, IconButton, HStack } from '@chakra-ui/react';
import { UserPostProps } from '../lib/definitions';

export async function UserPost({ post, name, email, profilePicture, userId }: UserPostProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" padding="20px" width="500px" boxShadow="md">
      <Flex>
        <Avatar
          size="md"
          name="John Doe"
          src={`${post.authorId === userId ? profilePicture : null}`}
        />
        <Box ml="4">
          <Text fontWeight="bold">{name}</Text>
          <Text color="gray.500"> {email}</Text>
        </Box>
        <Spacer />
        <Text color="gray.500">2m ago</Text>
      </Flex>
      <Text mt="4">{post.content}</Text>
      {/* <HStack spacing={4} mt={4}>
        <IconButton aria-label="Comment" icon={<ChatIcon />} />
        <IconButton aria-label="Retweet" icon={<RepeatIcon />} />
          <IconButton aria-label="Like" icon={<StarIcon />} />
          <IconButton aria-label="Share" icon={<ArrowForwardIcon />} />
      </HStack> */}
    </Box>
  );
}