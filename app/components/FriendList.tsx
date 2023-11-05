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
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { acceptFriend, changeStatus, removeFriend } from '../lib/actions';
import { Friend } from '../lib/definitions';

interface FriendsListProps {
  friends?: Friend[];
}

const FriendsList = ({ friends }: FriendsListProps) => {
  console.log(friends);
  return (
    <VStack align="stretch" spacing={4}>
      <UnorderedList styleType="none">
        {friends &&
          friends.map(friend => (
            <ListItem key={friend.id} p={3} borderWidth="1px" borderRadius="lg" boxShadow="sm">
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
                  <HStack>
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      size="sm"
                      aria-label="Accept friend"
                      onClick={() => acceptFriend(friend.id)}
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      colorScheme="red"
                      size="sm"
                      aria-label="Deny friend"
                      onClick={() => changeStatus(friend.id, 'DENIED')}
                    />
                  </HStack>
                )}
                {friend.status === 'ACCEPTED' && (
                  <Button
                    leftIcon={<CloseIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => removeFriend(friend.id)}
                  >
                    Remove
                  </Button>
                )}
              </HStack>
            </ListItem>
          ))}
      </UnorderedList>
    </VStack>
  );
};

export default FriendsList;
