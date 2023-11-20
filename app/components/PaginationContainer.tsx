'use client';
import React, { useState } from 'react';
import { Container, Text, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

const PaginationContainer = ({ page, timelinePostsCount }) => {
  const postsPerPage = 5;
  const totalPageCount = Math.ceil(timelinePostsCount / postsPerPage);
  const startIndex = (page - 1) * postsPerPage + 1;
  const endIndex = Math.min(startIndex + postsPerPage - 1, timelinePostsCount);

  return (
    <Container
      display="flex"
      maxWidth="7xl"
      width="full"
      justifyContent="space-between"
      alignItems="center"
      padding={{ base: 5, sm: 10 }}
    >
      <Pagination
        page={page}
        totalPageCount={totalPageCount}
        startIndex={startIndex}
        endIndex={endIndex}
        timelinePostsCount={timelinePostsCount}
      />
    </Container>
  );
};

const Pagination = ({ page, totalPageCount, startIndex, endIndex, timelinePostsCount }) => {
  const router = useRouter();
  const [jumpPage, setJumpPage] = useState('');
  const pathname = usePathname();

  const navigateToPage = newPage => {
    const currentTab = pathname.includes('/for-you');
    if (newPage >= 1 && newPage <= totalPageCount && currentTab) {
      router.push(`/for-you/${newPage}`);
    } else if (newPage >= 1 && newPage <= totalPageCount && !currentTab) {
      router.push(`/all-posts/${newPage}`);
    }
  };

  const handleJumpInputChange = e => {
    setJumpPage(e.target.value);
  };

  const handleJump = () => {
    const pageNumber = parseInt(jumpPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPageCount) {
      navigateToPage(pageNumber);
    }
  };

  const pageButtons = Array.from({ length: totalPageCount }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPageCount || (p >= page - 2 && p <= page + 2))
    .map(p => (
      <PaginationButton key={p} onClick={() => navigateToPage(p)} isActive={p === page}>
        {p}
      </PaginationButton>
    ));

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      alignItems="center"
      width="full"
    >
      <Text fontSize="lg">{`Showing ${startIndex} to ${endIndex} of ${timelinePostsCount} results`}</Text>
      <Flex as="nav" aria-label="Pagination" alignItems="center">
        <PaginationButton isDisabled={page === 1} onClick={() => navigateToPage(page - 1)}>
          <Icon as={FaChevronLeft} />
        </PaginationButton>
        {pageButtons}
        <PaginationButton
          isDisabled={page === totalPageCount}
          onClick={() => navigateToPage(page + 1)}
        >
          <Icon as={FaChevronRight} />
        </PaginationButton>
        <input
          type="number"
          placeholder="Jump to page"
          value={jumpPage}
          onChange={handleJumpInputChange}
        />
        <button onClick={handleJump}>Go</button>
      </Flex>
    </Flex>
  );
};

const PaginationButton = ({ children, isActive, isDisabled, onClick }) => {
  const activeStyle = {
    bg: useColorModeValue('gray.300', 'gray.700'),
    _hover: { bg: useColorModeValue('gray.400', 'gray.600') },
    cursor: 'pointer',
  };
  const inactiveStyle = {
    bg: useColorModeValue('white', 'gray.800'),
    _hover: { bg: useColorModeValue('gray.100', 'gray.700') },
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  };

  return (
    <Flex
      as="button"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      height="32px"
      minWidth="32px"
      paddingX="8px"
      marginX="2px"
      fontSize="sm"
      fontWeight="medium"
      lineHeight="1.25rem"
      textAlign="center"
      boxShadow="md"
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      {...(isActive ? activeStyle : inactiveStyle)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </Flex>
  );
};

export default PaginationContainer;
