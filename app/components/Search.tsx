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
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

const Search = () => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let fetchedUsers = [];
      if (value !== '') {
        fetchedUsers = await searchUsers(value);
      } else {
        fetchedUsers = await getUsers();
      }
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    getData();
  }, [value]);

  return (
    <Box p={5}>
      <FormControl id="search-friends" mb={5}>
        <FormLabel htmlFor="search-friends">Search for Friends</FormLabel>
        <Input
          id="search-friends"
          name="search-friends"
          type="search"
          placeholder="Enter Search"
          onChange={e => setValue(e.target.value)}
        />
        <FormHelperText>Then you can add them</FormHelperText>
      </FormControl>
      {isLoading ? (
        <Spinner />
      ) : (
        <List spacing={3}>
          {users.length > 0 ? (
            users.map(user => {
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
                      >
                        Add
                      </IconButton>
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
  );
};

export default Search;
