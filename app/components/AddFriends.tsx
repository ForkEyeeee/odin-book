import { List, Input, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';

const AddFriends = ({ users }) => {
  return (
    <>
      <Input type="text" />
      <UnorderedList>
        {users.map(user => {
          return (
            <ListItem key={user.id}>
              {user.name}
              {user.email}
            </ListItem>
          );
        })}
      </UnorderedList>
    </>
  );
};

export default AddFriends;
