'use client';
import { IconButton } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      icon={<FaArrowUp />}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="tooltip"
      size="lg"
      backgroundColor="white"
      rounded="full"
    />
  );
};

export default ScrollToTopButton;
