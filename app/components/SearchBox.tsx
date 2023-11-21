'use client';
import { FormControl, Input, FormHelperText, FormLabel, Heading } from '@chakra-ui/react';
import FilteredFriendsList from './FilteredFriendsList';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchBox = ({ filteredUsers, userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback(term => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    setIsLoading(false);
  }, 300);

  return (
    <>
      <FormControl id="search-friends" mb={5}>
        <FormLabel htmlFor="search-friends">Search for Friends</FormLabel>
        <Input
          id="search-friends"
          name="search-friends"
          type="search"
          placeholder="Enter Search"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={e => {
            handleSearch(e.target.value);
            setIsLoading(true);
          }}
        />
        <FormHelperText>Then you can add them</FormHelperText>
      </FormControl>
      <FilteredFriendsList users={filteredUsers} userId={userId} isLoading={isLoading} />
    </>
  );
};

export default SearchBox;
