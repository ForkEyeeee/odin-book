'use client';
import React, { ReactNode } from 'react';
import {
  Container,
  Flex,
  FlexProps,
  useColorMode,
  useColorModeValue,
  Text,
  Box,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PaginationContainer = ({
  page,
  timelinePostsCount,
}: {
  page: number;
  timelinePostsCount: number;
}) => {
  const postsPerPage = 5;
  const totalPageCount = Math.ceil(timelinePostsCount / postsPerPage);
  const startIndex = (page - 1) * postsPerPage + 1;
  const endIndex = Math.min(startIndex + postsPerPage - 1, timelinePostsCount);
  return (
    <Container p={{ base: 5, sm: 8 }} pt={{ base: 3 }} borderRadius="lg">
      <Flex flexDirection={{ base: 'column' }} alignItems={'center'}>
        <Box>
          <Pagination totalPageCount={totalPageCount} />
        </Box>
        <Text
          fontSize="lg"
          mt={4}
        >{`Showing ${startIndex} to ${endIndex} of ${timelinePostsCount} results`}</Text>
      </Flex>
    </Container>
  );
};
// Ideally, only the Pagination component should be used. The PaginationContainer component is used to style the preview.
const Pagination = ({ totalPageCount }: { totalPageCount: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const navigateToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPageCount) {
      router.replace(`${pathname}?page=${newPage}`, { scroll: false });
    }
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPageCount, startPage + 4);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <Box>
        <PaginationButton key={i} isActive={currentPage === i} onClick={() => navigateToPage(i)}>
          {i}
        </PaginationButton>
      </Box>
    );
  }

  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <PaginationButton
        borderTopLeftRadius="md"
        borderBottomLeftRadius="md"
        onClick={() => navigateToPage(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        {'<'}
      </PaginationButton>
      {pageNumbers}
      <PaginationButton
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        onClick={() => navigateToPage(currentPage + 1)}
        isDisabled={currentPage === totalPageCount}
      >
        {'>'}
      </PaginationButton>
    </Flex>
  );
};

interface PaginationButtonProps extends FlexProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
}
const PaginationButton = ({ children, isDisabled, isActive, ...props }: PaginationButtonProps) => {
  const activeStyle = {
    bg: useColorModeValue('blue.500', 'blue.200'),
    color: useColorModeValue('white', 'gray.800'),
    fontWeight: 'bold',
  };

  const hoverStyle = {
    bg: useColorModeValue('gray.200', 'gray.600'),
    transform: 'scale(1.05)',
  };

  return (
    <Flex
      p={{ base: 3, sm: 3 }}
      px={{ base: 4, sm: 5, md: 8 }}
      fontSize="lg"
      lineHeight={1}
      transition="all 0.2s"
      opacity={isDisabled ? 0.6 : 1}
      _hover={isDisabled ? undefined : hoverStyle}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      border="1px solid"
      mr="-1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default PaginationContainer;
