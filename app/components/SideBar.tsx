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
import Link from 'next/link';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getFriendsSideBar } from '../lib/actions';
import { useSession } from 'next-auth/react';
import { Friend } from '../lib/definitions';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friends, setFriends] = useState<Friend[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const countUnreadMessages = (friend: Friend) => {
    const sentMessages = friend.sentMessages || [];
    const receivedMessages = friend.receivedMessages || [];
    return sentMessages.concat(receivedMessages).filter(msg => !msg.read).length;
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        let fetchedFriends = (await getFriendsSideBar()) as Friend[];
        fetchedFriends = fetchedFriends.sort(
          (a, b) => countUnreadMessages(b) - countUnreadMessages(a)
        );
        setFriends(fetchedFriends);
      } catch (error) {
        console.error('Unable to fetch friends', error);
      }
    };
    fetchFriends();
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname, searchParams]);

  return (
    <>
      <ChatIcon onClick={onOpen} aria-label="open menu" />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <Flex justifyContent={'space-between'}>
            <DrawerHeader borderBottomWidth="1px">Friends</DrawerHeader>
            <IconButton
              aria-label="close button"
              color="white"
              colorScheme="red"
              icon={<CloseIcon />}
              onClick={onClose}
            />
          </Flex>
          <DrawerBody>
            <VStack spacing={4} mt={5} align="stretch">
              {friends.map(friend => {
                const unreadCount = countUnreadMessages(friend);
                return (
                  <Flex
                    key={friend.id}
                    align="center"
                    justify="space-between"
                    alignItems={'flex-start'}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="sm"
                    borderColor="gray.200"
                    mb={5}
                    p={3}
                  >
                    <Link href={`/profile?userid=${friend.id}&page=1`}>
                      <Avatar size="md" src={friend.profilePicture} name={friend.name} mr={4} />
                    </Link>
                    <Box flex="1">
                      <Flex alignItems="stretch" flexDir={{ base: 'column' }} gap={5}>
                        <Box>
                          <Text
                            fontSize={{ base: 'initial', lg: 'lg' }}
                            maxW={{ base: 180, sm: 350 }}
                            fontWeight="bold"
                          >
                            {friend.name}
                          </Text>
                          <Text
                            fontSize={{ base: 'sm', lg: 'md' }}
                            maxW={{ base: 180, sm: 300, lg: 350 }}
                          >
                            {friend.email}
                          </Text>
                          <Badge colorScheme={unreadCount > 0 ? 'red' : 'green'}>
                            {unreadCount > 0 ? `${unreadCount} Unread` : 'No New Messages'}
                          </Badge>
                        </Box>
                        <Flex justifyContent={'flex-end'}>
                          <Link href={`/messages?userId=${userId}&receiverId=${friend.id}`}>
                            <Button
                              color={'white'}
                              colorScheme="whatsapp"
                              variant={'solid'}
                              as={Button}
                            >
                              Message
                            </Button>
                          </Link>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
