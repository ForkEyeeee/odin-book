'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getUsers, searchUsers, addFriend, removeFriend } from '@/app/lib/actions';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
  Tag,
  TagLabel,
  Avatar,
  HStack,
  VStack,
  Spinner,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import SearchBox from './SearchBox';

const FilteredFriendsList = ({ users, userId }) => {
  // const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  // const filteredFriends = searchUsers(value);
  return (
    <Box>
      <SearchBox value={value} />
      <Box p={5}>
        {isLoading ? (
          <Spinner />
        ) : (
          <List spacing={3}>
            {users.length > 0 ? (
              users.map(user => {
                const isFriend = user.friendsAsUser1.find(element => element.user2Id === userId);
                return (
                  <ListItem key={user.id}>
                    <HStack spacing={4}>
                      <Avatar name={user.name} />
                      <VStack align="start">
                        <Tag size="lg" variant="subtle" colorScheme="cyan">
                          <TagLabel>{user.name}</TagLabel>
                        </Tag>
                        <Text>{user.email}</Text>
                      </VStack>
                      <Box w={'100%'}>
                        <IconButton
                          icon={<AddIcon />}
                          color={'white'}
                          aria-label="Add friend"
                          colorScheme="green"
                          onClick={() => addFriend(user.id)}
                        ></IconButton>
                        {isFriend && <Badge colorScheme="green">Added</Badge>}
                      </Box>
                    </HStack>
                  </ListItem>
                );
              })
            ) : (
              <Text>No results</Text>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default FilteredFriendsList;
