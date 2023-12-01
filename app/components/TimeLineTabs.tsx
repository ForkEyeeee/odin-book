'use client';
import { Flex, Link } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

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
      <Suspense fallback={<p>TEST</p>}>
        <Flex
          justifyContent="center"
          gap={{ base: 6, md: 15, xl: 20 }}
          p={4}
          mt={{ base: 3, sm: 5, md: 0 }}
          mb={{ base: 0 }}
        >
          <Link
            href={'/for-you'}
            fontSize={{ base: 'sm:', md: 'xl' }}
            sx={pathname === '/for-you' ? activeTabStyle : tabStyle}
            id="for-you-tab"
          >
            For You
          </Link>
          <Link
            href={'/discover'}
            fontSize={{ base: 'sm:', md: 'xl' }}
            sx={pathname === '/discover' ? activeTabStyle : tabStyle}
            id="discover-tab"
          >
            Discover
          </Link>
        </Flex>
      </Suspense>
    </>
  );
}

export default TimeLineTabs;
