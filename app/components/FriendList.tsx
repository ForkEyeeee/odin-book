'use client';
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';
import { acceptFriend, changeStatus } from '../lib/actions';

const FriendsList = ({ friends }) => {
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
                <button onClick={() => acceptFriend(friend.id)}>Accept</button>
              </ListItem>
            )
        )}
        {/* {users.map(user => (
          <ListItem key={user.id}>
        
          </ListItem>
        ))} */}
      </UnorderedList>
    </>
  );
};

export default FriendsList;
