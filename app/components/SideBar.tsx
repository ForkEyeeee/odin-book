'use client';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  VStack,
  Text,
  Badge,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFriends } from '../lib/actions';
import { useSession } from 'next-auth/react';

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const fetchedFriends = await getFriends();
        setFriends(fetchedFriends);
      } catch (error) {
        console.error('Unable to fetch friends', error);
      }
    };
    fetchFriends();
  }, []);

  const countUnreadMessages = friend => {
    return friend.sentMessages.concat(friend.receivedMessages).filter(msg => !msg.read).length;
  };

  return (
    <>
      <IconButton
        icon={<ChatIcon />}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        size="lg"
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Friends</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {friends.map(friend => (
                <Flex key={friend.id} align="center" justify="space-between" p={3} boxShadow="base">
                  <Avatar size="md" src={friend.profilePicture} name={friend.name} mr={4} />
                  <Box flex="1">
                    <Text fontWeight="bold">{friend.name}</Text>
                    <Text fontSize="sm">{friend.email}</Text>
                    <Badge colorScheme="red">{countUnreadMessages(friend)}</Badge>
                  </Box>
                  <Button
                    colorScheme="teal"
                    onClick={() =>
                      router.push(`/messages?userId=${userId}&receiverId=${friend.id}`)
                    }
                  >
                    Message
                  </Button>
                </Flex>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
