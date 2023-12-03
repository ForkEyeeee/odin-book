'use client';
import React, { ReactNode, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

const config = {
  sizes: {
    base: '20em', // 320px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
  },
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

export const theme = extendTheme({ config });

const ColorModeSetter = ({ children }: any) => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode !== 'dark') {
      setColorMode('dark');
    }
  }, [colorMode, setColorMode]);

  return <>{children}</>;
};

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <ColorModeSetter>{children}</ColorModeSetter>
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default Providers;
