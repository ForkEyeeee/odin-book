'use client';
import {
  Box,
  Input,
  VStack,
  FormControl,
  InputGroup,
  InputRightElement,
  Heading,
  HStack,
  Spinner,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Avatar } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import { BsSendFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { getMessages } from '../lib/actions';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Chat() {
  const [senderMessages, setSenderMessages] = useState([]);
  const [recipientMessages, setRecipientMessages] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  // const recipient = { firstName: 'John', lastName: 'Doe' };
  // const messages = [
  //   { _id: '1', content: 'Hello there!', sender: 'user1' },
  //   { _id: '2', content: 'How are you?', sender: 'user2' },
  // ];
  const pathname = usePathname();
  useEffect(() => {
    const getData = async () => {
      try {
        const messages = await getMessages(Number(pathname.slice(10)));
        setSenderMessages(messages?.senderMessages);
        setRecipientMessages(messages?.recipientMessages);
        setSender(messages?.sender.name);
        setRecipient(messages?.recipient.name);
        setProfilePicture(messages.recipient.profilePicture);
        console.log(messages);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [pathname]);
  return (
    <Box flex="1" display="flex" flexDirection="column" h="100vh" p={{ xl: 5 }}>
      <HStack justifyContent={'space-between'} p={2}>
        <Link href={`/profile/${pathname.slice(10)}`}>
          <Avatar size="md" name="John Doe" src={`${profilePicture}`} />
        </Link>{' '}
        <Heading color={'white'} noOfLines={1} pb={5}>
          {recipient}
        </Heading>
      </HStack>
      <VStack flex="1" overflowY="scroll">
        {senderMessages.map(message => (
          <Suspense key={message.id}>
            <Message
              justifyContent="flex-end"
              backGround="blue"
              color="white"
              popOverPlacement="left"
              content={message.content}
              // isSender={message.sender !== 'user1'}
            />
          </Suspense>
        ))}
        {recipientMessages.map(message => (
          <Suspense key={message.id}>
            <Message
              justifyContent="flex-start"
              backGround="white"
              color="black"
              popOverPlacement="left"
              content={message.content}
              // isSender={message.sender !== 'user1'}
            />
          </Suspense>
        ))}
      </VStack>
      <form>
        <FormControl pt={5}>
          <InputGroup>
            <InputRightElement>
              <button type="submit">
                <Box display={'flex'} alignItems={'center'}>
                  <BsSendFill color="black" />
                </Box>
              </button>
            </InputRightElement>
            <Input
              role="chat-input"
              type="text"
              name="message"
              // placeholder={`Message ${recipient.firstName} ${recipient.lastName}`}
              maxLength={200}
              backgroundColor={'white'}
              size={{ sm: 'lg' }}
            />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
}
