import { Box, Flex, Heading, Text, Button, Center } from '@chakra-ui/react';
import Link from 'next/link';

const NoProfile = () => {
  return (
    <Center>
      <Flex
        textAlign="center"
        marginTop="50px"
        h={'100vh'}
        flexDir={'column'}
        justifyContent={'center'}
      >
        <Heading as="h2" size="xl">
          Profile Setup Incomplete
        </Heading>
        <Text fontSize="lg">Oh no! This user hasn&apos;t set up their profile yet.</Text>
        <Link href="/" color="blue.500">
          <Text textDecoration={'underline'} color="yellow.300">
            Go back to the homepage
          </Text>
        </Link>
      </Flex>
    </Center>
  );
};

export default NoProfile;
