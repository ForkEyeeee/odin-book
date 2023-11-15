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
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, ChatIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { getFriends } from '../lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const [friends, setFriends] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const friends = await getFriends();
        if (friends !== null) setFriends(friends);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
                {friends &&
                  friends.map(friend => (
                    <Box key={friend.id}>
                      <Link href={`/profile/${friend.id}`}>
                        <div>
                          {friend.name}
                          {friend.email}
                        </div>
                      </Link>
                      <Button onClick={() => router.push(`/messages/${friend.id}`)}>Message</Button>
                    </Box>
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
