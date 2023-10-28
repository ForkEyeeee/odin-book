"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const breakPoints = {
  sizes: {
    base: "20em", // 320px
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
  },
};

export const theme = extendTheme({ breakPoints });

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default Providers;
