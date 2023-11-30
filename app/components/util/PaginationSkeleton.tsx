import { Box, Skeleton, Flex, Container } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Container p={{ base: 5, sm: 8 }} pt={{ base: 3 }} borderRadius="lg">
      <Flex flexDirection={{ base: 'column' }} alignItems={'center'}>
        <Box>
          <Skeleton height="20px" width="200px" />
        </Box>
        <Skeleton height="20px" width="300px" mt="4" />
      </Flex>
    </Container>
  );
};

export default Loading;
