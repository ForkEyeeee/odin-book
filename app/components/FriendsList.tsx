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
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { changeStatus } from '../lib/actions';
import { Friend } from '../lib/definitions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface FriendsListProps {
  friends?: Friend[];
}

const initialState = { message: null, errors: {} };

export default function FriendsList({ friends }: FriendsListProps) {
  const [state, formAction] = useFormState(changeStatus, initialState);
  const { data: session } = useSession();
  const userId = session?.user.id;
  return (
    <>
      <Flex justifyContent="flex-end" mt={4}>
        <Button rightIcon={<AddIcon />} colorScheme="green" variant="solid" color={'white'}>
          <Link href={'/friends/addfriend'}>Add Friends</Link>
        </Button>
      </Flex>{' '}
      <form action={formAction}>
        <VStack align="stretch" spacing={4}>
          <UnorderedList styleType="none" ml={0} padding="20px">
            {friends &&
              friends.map((friend, index) => (
                <ListItem
                  key={friend.id}
                  p={3}
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="sm"
                  mt={index > 0 ? '15px' : 0}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <Avatar
                      name={friend.name}
                      src={friend.profilePicture !== null ? friend.profilePicture : ''}
                    />
                    <Box flex="1" ml={3}>
                      <Text fontWeight="bold">{friend.name}</Text>
                      <Text fontSize="sm">{friend.email}</Text>
                      {friend.status === 'PENDING' && (
                        <Badge colorScheme="yellow">{friend.status}</Badge>
                      )}
                    </Box>
                    {friend.status === 'PENDING' && (
                      <HStack spacing={{ base: 0, sm: 'auto' }}>
                        <IconButton
                          icon={<CheckIcon />}
                          colorScheme="green"
                          color={'white'}
                          size={{ base: 'xs', sm: 'sm' }}
                          aria-label="Accept friend"
                          onClick={() => changeStatus(friend.id, 'accept')}
                        />
                        <IconButton
                          icon={<CloseIcon />}
                          colorScheme="red"
                          color={'white'}
                          size={{ base: 'xs', sm: 'sm' }}
                          aria-label="Deny friend"
                          onClick={() => changeStatus(friend.id, 'remove')}
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
    </>
  );
}
