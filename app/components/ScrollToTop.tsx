'use client';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const toggleVisibility = () => {
    if (window.pageYOffset > 10) {
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
    <IconButton
      icon={<FaArrowUp />}
      onClick={handleScrollToTop}
      size={'lg'}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: `${pathname.includes('/messages') ? '10px' : '20px'}`,
        zIndex: 10,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
};

export default ScrollToTopButton;
