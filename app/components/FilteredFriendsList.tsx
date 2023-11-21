import { addFriend } from '@/app/lib/actions';
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

const FilteredFriendsList = ({ users, userId, isLoading }) => {
  return (
    <Box>
      <Box p={5}>
        {isLoading ? (
          <Spinner />
        ) : (
          <List spacing={3}>
            {users !== undefined ? (
              users.map(user => {
                const isFriend = user.friendsAsUser1.find(friend => friend.user2Id === userId);
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
