'use client';
import { FormControl, Input, FormHelperText, FormLabel, Heading } from '@chakra-ui/react';
import FilteredFriendsList from './FilteredFriendsList';
import { useEffect, useState } from 'react';
import { searchUsers } from '../lib/actions';
import { User } from '../lib/definitions';

const SearchBox = ({ userId }) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    try {
      const getData = async () => {
        setIsLoading(true);
        const users = await searchUsers(value);
        setUsers(users);
        setIsLoading(false);
      };
      getData();
    } catch (error) {
      <Heading color={'red'}>Unable to find friends</Heading>;
    }
  }, [value]);
  return (
    <>
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
      <FilteredFriendsList users={users} userId={userId} isLoading={isLoading} />
    </>
  );
};

export default SearchBox;
