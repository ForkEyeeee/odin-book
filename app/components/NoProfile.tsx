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
        <Text fontSize="lg">
          Your profile isn't fully set up yet. Please complete your profile to get started.
        </Text>
        <Link href="/profile-setup" passHref>
          <Button mt={4} colorScheme="blue">
            Set Up Profile
          </Button>
        </Link>
      </Flex>
    </Center>
  );
};

export default NoProfile;
