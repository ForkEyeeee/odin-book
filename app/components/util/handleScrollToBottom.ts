'use client';

const handleScrollToBottom = () => {
  window.scrollTo({
    left: 0,
    top: document.documentElement.scrollHeight - document.documentElement.clientHeight,
    behavior: 'smooth',
  });
};

export default handleScrollToBottom;
