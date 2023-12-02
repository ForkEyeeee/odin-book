import { Flex, Heading, Text, Button, Center } from '@chakra-ui/react';
import Link from 'next/link';

const NoTimeLine = () => {
  return (
    <Center>
      <Flex
        textAlign="center"
        marginTop="50px"
        h={'100vh'}
        flexDir={'column'}
        justifyContent={'center'}
        mt={0}
      >
        <Heading as="h2" size="xl">
          No Posts found
        </Heading>
        <Text fontSize="lg">Create posts or add some friends to see your personalized feed.</Text>
        <Link href="/discover" color="blue.500">
          <Text textDecoration={'underline'} color="yellow.300">
            Go to Discover
          </Text>
        </Link>
      </Flex>
    </Center>
  );
};

export default NoTimeLine;
