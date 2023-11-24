import { Box, Flex, Heading, Text, Button, AbsoluteCenter, Center } from '@chakra-ui/react';
import Link from 'next/link';

const NoDataFound = () => {
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
          Could not fetch data
        </Heading>
        <Text fontSize="lg">It seems there is no data available at the moment.</Text>
        <Link href="/" color="blue.500">
          <Text textDecoration={'underline'} color="yellow.300">
            Go back to the homepage
          </Text>
        </Link>
      </Flex>
    </Center>
  );
};

export default NoDataFound;
