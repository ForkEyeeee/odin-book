'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

const Links = ['View Profile', 'Messages', 'Friends', 'Settings', 'Sign Out'];

const IconButton = ({ children, ...props }: { children: any }) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: 'gray.800' }}
      {...props}
    >
      {children}
    </Button>
  );
};

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="relative"
      top="0"
      bg={'gray.700'}
      width="100%"
      zIndex="1"
    >
      <Container px={4} mx="auto">
        <HStack spacing={4}>
          <Image
            alt="dev logo"
            w={'auto'}
            h={12}
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
          />
          <Input maxW="26rem" placeholder="Search..." borderColor={'gray.300'} borderRadius="5px" />
          <Spacer />
          <HStack spacing={3}>
            <IconButton>
              <PlusSquareIcon />
            </IconButton>
            <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar size="sm" src={session !== undefined ? session?.user.image!! : ''} />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue('gray.700', 'gray.100')}
                boxShadow="4px 4px 0"
              >
                <MenuItem>
                  <VStack justify="start" alignItems="left">
                    <Text size="sm" fontWeight={'bold'} mt="0 !important">
                      {session !== undefined ? session?.user.name : ''}
                    </Text>
                  </VStack>
                </MenuItem>

                <MenuDivider />
                {session &&
                  Links.map(link => (
                    <MenuItem key={link} onClick={link === 'Sign Out' ? () => signIn() : undefined}>
                      <Text fontWeight="500">{link}</Text>
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            {!session && <Button onClick={() => signIn()}>Sign In</Button>}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
