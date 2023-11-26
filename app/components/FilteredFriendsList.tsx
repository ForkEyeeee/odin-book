import {
  List,
  ListItem,
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
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { addFriend } from '@/app/lib/actions';
import Link from 'next/link';
import { useToast } from '@chakra-ui/react';

const FilteredFriendsList = ({ users, userId, isLoading }) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box className="teees" display={'flex'} justifyContent={'center'}>
      <Box p={5} minW={{ base: '100%', sm: 450, md: 600, lg: 800, xl: 1000 }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <List spacing={3}>
            {users !== undefined ? (
              users.map(user => {
                const isFriend = user.friendsAsUser1.find(friend => friend.user2Id === userId);
                return (
                  <ListItem
                    key={user.id}
                    mb={5}
                    p={3}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="sm"
                    borderColor="gray.200"
                  >
                    <HStack spacing={4}>
                      <Link href={`/profile?userid=${user.id}&page=1`}>
                        <Avatar name={user.name} />
                      </Link>
                      <VStack align="start">
                        <Tag size={{ base: 'md' }} variant="subtle" colorScheme="cyan">
                          <TagLabel>{user.name}</TagLabel>
                        </Tag>
                        <Box maxW={{ base: 160 }} overflow={'hidden'}>
                          <Text noOfLines={1}>{user.email}</Text>
                        </Box>
                        {isFriend && <Badge colorScheme="green">Added</Badge>}
                      </VStack>
                      <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                        <IconButton
                          icon={<AddIcon />}
                          color={'green.300'}
                          aria-label="Add friend"
                          colorScheme="green"
                          pr={5}
                          onClick={() => {
                            toast({
                              title: 'Added successfully.',
                              description: 'Friend has been added successfully',
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            });
                            addFriend(user.id);
                            router.push('/friends');
                          }}
                        ></IconButton>
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
