'use client';
import { Box, Flex, Link } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

export function TimeLineTabs() {
  const pathname = usePathname();
  return (
    <>
      <Flex justifyContent="center" gap={50} p={4} mt={{ base: 3, sm: 5, md: 0 }} mb={{ base: 3 }}>
        <Link
          href={'/for-you?page=1'}
          color="blue.600"
          _hover={{ textDecoration: 'underline', bg: 'gray.100' }}
          fontWeight={pathname === '/for-you' ? 'bold' : 'initial'}
        >
          For You
        </Link>
        <Link
          href={'discover?page=1'}
          color="blue.600"
          _hover={{ textDecoration: 'underline', bg: 'gray.100' }}
          fontWeight={pathname === '/discover' ? 'bold' : 'initial'}
        >
          Discover
        </Link>
      </Flex>
    </>
  );
}

export default TimeLineTabs;
