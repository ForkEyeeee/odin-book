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
  TagLeftIcon,
  Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { addFriend } from '@/app/lib/actions';
import Link from 'next/link';
import { useToast } from '@chakra-ui/react';
import { User } from '../lib/definitions';
import { FaPaperPlane } from 'react-icons/fa';
import { Suspense } from 'react';
import FilteredFriendsListSkeleton from '../addfriend/loading';

const FilteredFriendsList = ({
  users,
  userId,
  isLoading,
}: {
  users: User[];
  userId: number;
  isLoading: boolean;
}) => {
  const toast = useToast();

  const handleClick = async (userId: number) => {
    const isExistingFriend = await addFriend(userId);
    if (isExistingFriend) {
      toast({
        title: 'Friend request unsuccesfully sent.',
        description: 'You have already sent a friend request to this user',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Added successfully.',
        description: 'Friend has been sent',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Suspense fallback={<FilteredFriendsListSkeleton />}>
      <Box minH={'100vh'} display={'flex'} justifyContent={'center'}>
        <Box p={5} minW={{ base: '100%', sm: 450, md: 600, lg: 800, xl: 1000 }}>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <List spacing={3}>
              {users !== undefined ? (
                users.map(user => {
                  if (user.friendsAsUser2 === undefined) return;
                  const isSent = user.friendsAsUser2.find(
                    friend => friend.user1Id === userId && friend.status === 'PENDING'
                  );
                  const isFriend = user.friendsAsUser2.find(
                    friend => friend.user1Id === userId && friend.status === 'ACCEPTED'
                  );
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
                      <HStack spacing={{ base: 2, sm: 4 }}>
                        <Link href={`/profile?userid=${user.id}&page=1`}>
                          <Avatar
                            size={{ base: 'md' }}
                            src={user.profilePicture as string}
                            name={user.name}
                          />
                        </Link>
                        <VStack align="start">
                          <Tag size="lg" variant="subtle" colorScheme="cyan">
                            <TagLabel className="name-tag">{user.name}</TagLabel>
                          </Tag>
                          <Box maxW={{ base: 160, sm: '100%' }} overflow={'hidden'}>
                            <Text fontSize={{ md: 'lg' }}>{user.email}</Text>
                          </Box>
                          {isSent !== undefined ? (
                            <Badge colorScheme={'yellow'}>Pending Friend Request</Badge>
                          ) : isFriend !== undefined ? (
                            <Badge colorScheme={'green'}>Already Friends</Badge>
                          ) : (
                            <Badge colorScheme={'red'}>Not Added</Badge>
                          )}
                        </VStack>
                        <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                          <Tag
                            display={isFriend || isSent ? 'none' : 'flex'}
                            size={{ base: 'md', sm: 'lg' }}
                            variant="subtle"
                            colorScheme="green"
                            aria-label="Add friend"
                            id="add-friend-btn"
                            justifyContent={'center'}
                            cursor={'pointer'}
                            _hover={{
                              bgColor: 'green.800',
                            }}
                            px={{ base: 0, md: 3 }}
                            pl={1.7}
                            onClick={() => {
                              handleClick(user.id);
                            }}
                          >
                            <TagLeftIcon boxSize="12px" as={FaPaperPlane} />
                            <TagLabel>
                              <Text display={{ base: 'none', md: 'initial' }}>
                                Send Friend Request
                              </Text>
                            </TagLabel>
                          </Tag>
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
    </Suspense>
  );
};

export default FilteredFriendsList;
