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
import { useRouter } from 'next/navigation';
import { getFriends } from '../lib/actions';
import { useSession } from 'next-auth/react';
import { Friend } from '../lib/definitions';

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friends, setFriends] = useState<Friend[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const fetchedFriends = (await getFriends()) as Friend[];
        setFriends(fetchedFriends);
      } catch (error) {
        return { message: 'Unable to fetch friends' };
      }
    };
    fetchFriends();
  }, []);

  const countUnreadMessages = (friend: Friend) => {
    const sentMessages = friend.sentMessages || [];
    const receivedMessages = friend.receivedMessages || [];

    return sentMessages.concat(receivedMessages).filter(msg => !msg.read).length;
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
            <VStack spacing={4} align="stretch">
              {friends.map(friend => {
                const isRead = countUnreadMessages(friend);
                return (
                  <Flex
                    key={friend.id}
                    align="center"
                    justify="space-between"
                    className="aaa"
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
                          <Text fontSize={{ base: 'initial', lg: 'xl' }} fontWeight="bold">
                            {friend.name}
                          </Text>
                          <Text fontSize={{ base: 'sm', lg: 'xl' }}>{friend.email}</Text>
                          <Badge colorScheme={isRead ? 'red' : 'green'}>
                            {isRead ? `${isRead} Unread` : 'No New Messages'}
                          </Badge>
                        </Box>
                        <Flex justifyContent={'flex-end'}>
                          <Button
                            color={'white'}
                            colorScheme="whatsapp"
                            variant={'solid'}
                            onClick={() => {
                              router.push(`/messages?userId=${userId}&receiverId=${friend.id}`);
                              onClose();
                            }}
                          >
                            Message
                          </Button>
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
