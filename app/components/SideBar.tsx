'use client';
import {
  Box,
  HStack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, ChatIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface User {
  messages: [];
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  about: string;
  phone: string;
  __v: number;
}

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box>
        <ChatIcon onClick={onOpen} data-testid="hamburger-icon" cursor={'pointer'} />
      </Box>

      <Drawer
        placement={'left'}
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: 'xs', sm: 'sm', lg: 'lg', xl: 'xl' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Users</DrawerHeader>
          {loading ? (
            <Center p={10}>
              <HStack spacing={5}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
                <Text>Loading...</Text>
              </HStack>
            </Center>
          ) : (
            <DrawerBody>
              <VStack borderStyle={'solid'} spacing={10}>
                {users &&
                  users.map(user => (
                    <SideBarItem key={user._id} url={user._id} onClose={onClose}>
                      {user.username}
                      {user.firstname}
                      {user.lastname}
                    </SideBarItem>
                  ))}
              </VStack>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
