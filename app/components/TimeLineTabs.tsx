'use client';
import { Flex, Link, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

export function TimeLineTabs() {
  const pathname = usePathname();

  const tabStyle = {
    fontWeight: 'normal',
    padding: '12px 16px',
    fontSize: '15px',
    lineHeight: '20px',
    borderRadius: '9999px',
    transition: 'background-color 0.1s ease-out',
    _hover: { textDecoration: 'none', backgroundColor: '#242424' },
    color: 'white',
  };

  const activeTabStyle = {
    ...tabStyle,
    fontWeight: 'bold',
    backgroundColor: '#333333',
    _hover: { backgroundColor: '#242424' },
  };

  return (
    <>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Flex justifyContent="center" gap={4} p={3} mt={3} mb={3}>
          <Link
            href={'/for-you'}
            sx={pathname === '/for-you' ? activeTabStyle : tabStyle}
            id="for-you-tab"
          >
            For You
          </Link>
          <Link
            href={'/discover'}
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
