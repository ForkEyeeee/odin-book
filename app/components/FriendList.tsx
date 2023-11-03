import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';

const FriendsList = ({ friends, users }) => {
  console.log(friends);
  return (
    <>
      <UnorderedList>
        {friends.map(
          friend =>
            (friend.status === 'PENDING' || friend.status === 'ACCEPTED') && (
              <ListItem key={friend.id}>
                {friend.name}
                {friend.email}
                {friend.status}
                {users.map(user => (
                  <ListItem key={user.id}>
                    {user.name}
                    {user.email}
                    {user.status}
                  </ListItem>
                ))}
              </ListItem>
            )
        )}
      </UnorderedList>
    </>
  );
};

export default FriendsList;
