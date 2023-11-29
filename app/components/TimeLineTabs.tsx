'use client';
import { Box, Flex, Link } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

export function TimeLineTabs() {
  const pathname = usePathname();

  const tabStyle = {
    color: 'blue.600',
    _hover: { textDecoration: 'underline', backgroundColor: 'gray.100' },
    fontWeight: 'normal',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const activeTabStyle = {
    ...tabStyle,
    fontWeight: 'bold',
    backgroundColor: 'gray.200',
    _hover: { backgroundColor: 'gray.300' },
  };

  return (
    <>
      <Flex
        justifyContent="center"
        gap={{ base: 6, md: 15, xl: 20 }}
        p={4}
        mt={{ base: 3, sm: 5, md: 0 }}
        mb={{ base: 0 }}
      >
        <Link
          href={'/for-you?page=1'}
          fontSize={{ base: 'sm:', md: 'xl' }}
          sx={pathname === '/for-you' ? activeTabStyle : tabStyle}
        >
          For You
        </Link>
        <Link
          href={'/discover?page=1'}
          fontSize={{ base: 'sm:', md: 'xl' }}
          sx={pathname === '/discover' ? activeTabStyle : tabStyle}
        >
          Discover
        </Link>
      </Flex>
    </>
  );
}

export default TimeLineTabs;
