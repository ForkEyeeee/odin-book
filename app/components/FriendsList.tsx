'use client';
import {
  ListItem,
  UnorderedList,
  Button,
  Box,
  Text,
  VStack,
  Badge,
  Avatar,
  HStack,
  IconButton,
  Flex,
  Center,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { changeStatus } from '../lib/actions';
import { Friend } from '../lib/definitions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useToast } from '@chakra-ui/react';

interface FriendsListProps {
  friends?: Friend[];
}

const initialState = { message: null, errors: {} };

export default function FriendsList({ friends }: FriendsListProps) {
  const [state, formAction] = useFormState(changeStatus, initialState);
  const { data: session } = useSession();
  const userId = session?.user.id;
  const toast = useToast();

  return (
    <Center mt={0} h={'100vh'} alignItems={'flex-start'}>
      <Flex flexDir={{ base: 'column' }} alignItems={'flex-end'}>
        <Flex justifyContent="flex-end" mt={4} mb={3}>
          <Link href={'/friends/addfriend'}>
            <Button
              leftIcon={<AddIcon color={'green.300'} />}
              colorScheme="green"
              variant="solid"
              color={'white'}
              size={'md'}
            >
              Add Friend
            </Button>
          </Link>
        </Flex>
        <form action={formAction}>
          <VStack align="stretch" spacing={4}>
            <UnorderedList styleType="none" ml={0}>
              {friends &&
                friends.map((friend, index) => (
                  <ListItem
                    key={friend.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="sm"
                    mt={index > 0 ? '15px' : 0}
                    minW={{ base: '100%', sm: 380, md: 600, lg: 800, xl: 1000 }}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Link href={`/profile?userid=${friend.id}&page=1`}>
                        <Avatar
                          name={friend.name}
                          src={friend.profilePicture !== null ? friend.profilePicture : ''}
                        />{' '}
                      </Link>
                      <Box flex="1" ml={3}>
                        <Text fontWeight="bold">{friend.name}</Text>
                        <Text fontSize="sm">{friend.email}</Text>
                        {friend.status === 'PENDING' && (
                          <Badge colorScheme="yellow">{friend.status}</Badge>
                        )}
                      </Box>
                      {friend.status === 'PENDING' && friend.user1Id !== userId && (
                        <HStack spacing={{ base: 0, sm: 'auto' }}>
                          <IconButton
                            icon={<CheckIcon />}
                            colorScheme="green"
                            color={'white'}
                            size={{ base: 'xs', sm: 'sm' }}
                            aria-label="Accept friend"
                            onClick={() => {
                              toast({
                                title: 'Accepted successfully.',
                                description: 'Friend has been accepted successfully',
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                              });
                              changeStatus(friend.id, 'accept');
                            }}
                          />
                          <IconButton
                            icon={<CloseIcon />}
                            colorScheme="red"
                            color={'white'}
                            size={{ base: 'xs', sm: 'sm' }}
                            aria-label="Deny friend"
                            onClick={() => {
                              toast({
                                title: 'Denied successfully.',
                                description: 'Friend has been denied successfully',
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                              });
                              changeStatus(friend.id, 'remove');
                            }}
                          />
                        </HStack>
                      )}
                      {friend.status === 'ACCEPTED' && (
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          color={'red'}
                          aria-label="Remove friend"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: 'Deleted successfully.',
                              description: 'Friend has been deleted successfully',
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            });
                            changeStatus(friend.id, 'remove');
                          }}
                        />
                      )}
                    </HStack>
                  </ListItem>
                ))}
            </UnorderedList>
          </VStack>
        </form>
      </Flex>
    </Center>
  );
}
