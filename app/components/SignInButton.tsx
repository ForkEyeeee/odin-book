'use client';
import { Box } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Router from 'next/router';

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Box
        backgroundColor={{
          base: 'red',
          sm: 'blue',
          md: 'pink',
          lg: 'green',
          xl: 'gray',
        }}
      >
        <p>{session.user.name}</p>
        <button
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              Router.push('/');
            });
          }}
        >
          Sign Out
        </button>
      </Box>
    );
  }

  return <button onClick={() => signIn()}>SignInButton</button>;
};

export default SignInButton;
