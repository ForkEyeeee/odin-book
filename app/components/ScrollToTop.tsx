'use client';
import React, { useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const scrollFunction = () => {
    const scrollButton = document.getElementById('scrollButton');
    if (scrollButton) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.opacity = '1';
      } else {
        scrollButton.style.opacity = '0';
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    scrollFunction();

    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      id="scrollButton"
      icon={<FaArrowUp />}
      onClick={handleScrollToTop}
      size={'lg'}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '45px',
        right: '20px',
        zIndex: 10,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
};

export default ScrollToTopButton;
