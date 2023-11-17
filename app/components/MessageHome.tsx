'use client';
import { Box, Text, Center } from '@chakra-ui/react';

const CenteredMessage = () => {
  return (
    <Center h="100vh">
      {' '}
      {/* Full viewport height */}
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          No User Selected
        </Text>
        <Text fontSize="md">Please open the sidebar to start messaging.</Text>
      </Box>
    </Center>
  );
};

export default CenteredMessage;
