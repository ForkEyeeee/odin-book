import { FormControl, Input, FormHelperText, FormLabel } from '@chakra-ui/react';
import FilteredFriendsList from './FilteredFriendsList';
import { useState } from 'react';
import { searchUsers } from '../lib/actions';
const SearchBox = () => {
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
    </>
  );
};

export default SearchBox;
