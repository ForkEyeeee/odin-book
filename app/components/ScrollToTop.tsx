// components/ScrollToTopButton.js
'use client';
import { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 3200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <IconButton
        icon={<FaArrowUp />}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="tooltip"
        size={{ base: 'xs', md: 'sm', xl: 'lg' }}
        backgroundColor="white"
        rounded="full"
      />
    )
  );
};

export default ScrollToTopButton;
