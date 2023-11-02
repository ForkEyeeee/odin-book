import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';

const FriendsList = ({ friends }) => {
  return (
    <>
      <UnorderedList>
        {friends.map(friend => {
          console.log(friend);
          return (
            <ListItem key={friend.id}>
              {friend.name}
              {friend.email}
            </ListItem>
          );
        })}
      </UnorderedList>
    </>
  );
};

export default FriendsList;
