import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

const breakPoints = {
  sizes: {
    base: '20em', // 320px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
  },
};

export const theme = extendTheme({ breakPoints });

const Providers = (props: Props) => {
  console.log('SessionProvider:', SessionProvider);
  console.log('CacheProvider:', CacheProvider);
  console.log('ChakraProvider:', ChakraProvider);
  console.log('extendTheme:', extendTheme);
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default Providers;
