'use client';
import {
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  Button,
  Flex,
  Text,
  AbsoluteCenter,
  Center,
  Heading,
} from '@chakra-ui/react';
import FilteredFriendsList from './FilteredFriendsList';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { User } from '../lib/definitions';

interface SearchBoxProps {
  filteredUsers: User[];
  userId: number;
}

const SearchBox = ({ filteredUsers, userId }: SearchBoxProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get('query');
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
      <Flex justifyContent={'flex-end'} mt={2}>
        <Link href={'/friends'}>
          <Button
            leftIcon={<ArrowBackIcon color={'red.300'} />}
            colorScheme="red"
            variant="solid"
            color={'white'}
            size={'md'}
          >
            Back to Friends List
          </Button>
        </Link>
      </Flex>
      <Flex justifyContent={'center'}>
        <FormControl
          id="search-friends"
          mb={5}
          mt={5}
          px={3}
          maxW={{ sm: 500, md: 600, lg: 800, xl: 1000 }}
        >
          <FormLabel htmlFor="search-friends" fontWeight={'medium'}>
            Search for Friends
          </FormLabel>
          <Input
            id="search-friends"
            name="search-friends"
            type="search"
            placeholder="Enter Name"
            defaultValue={searchParams.get('query')?.toString()}
            onChange={e => {
              handleSearch(e.target.value);
              setIsLoading(true);
            }}
          />
          <FormHelperText>Then you can add them</FormHelperText>
        </FormControl>
      </Flex>
      {filteredUsers !== undefined && query !== null ? (
        <Flex h={'100vh'} justifyContent={'center'}>
          <Heading fontSize={'xl'}>No users found! 😢</Heading>
        </Flex>
      ) : (
        <FilteredFriendsList users={filteredUsers} userId={userId} isLoading={isLoading} />
      )}
    </>
  );
};

export default SearchBox;
