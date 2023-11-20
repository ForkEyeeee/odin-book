import { Box, HStack, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
const Footer = () => {
  return (
    <Box
      as="footer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.700"
      px={8}
      py={4}
      color="white"
    >
      <HStack align="center" fontSize="lg" fontWeight="semibold" spacing={4}>
        <Link
          href="https://github.com/ForkEyeee"
          isExternal
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: 'underline' }}
        >
          <Text>ForkEyeee</Text>
        </Link>
        {/* <Image src="/assets/icons/github.png" alt="github-image" boxSize={8} /> */}
        <Image alt="github-image" width={20} height={20} src={'/public/github.png'} />
      </HStack>
    </Box>
  );
};

export default Footer;
