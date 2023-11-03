'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getUsers, searchUsers } from '@/app/lib/actions';
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react';
import { List, ListItem, ListIcon, OrderedList, Text, Box, UnorderedList } from '@chakra-ui/react';

const Search = () => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState();

  useEffect(() => {
    const getData = async () => {
      if (value !== '') {
        console.log(value);
        const users = await searchUsers(value);
        setUsers(users);
      } else {
        const users = await getUsers();
        setUsers(users);
      }
    };
    getData();
  }, [value]);

  return (
    <Box>
      <FormControl id="search-friends">
        <FormLabel htmlFor="dateOfBirth">Search for Friends</FormLabel>
        <Input
          id="search-friends"
          name="search-friends"
          type="search"
          placeholder="Enter Search"
          onChange={e => setValue(e.target.value)}
        />
        <FormHelperText>Then you can add them</FormHelperText>
      </FormControl>
      <UnorderedList>
        {users ? (
          users.map(user => {
            return (
              <ListItem key={user.id}>
                {user.name}
                {user.email}
              </ListItem>
            );
          })
        ) : (
          <Text>No results</Text>
        )}
      </UnorderedList>
    </Box>
  );
};

export default Search;
