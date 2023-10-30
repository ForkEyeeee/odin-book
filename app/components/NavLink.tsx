import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { Props } from '../lib/definitions';

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default NavLink;
