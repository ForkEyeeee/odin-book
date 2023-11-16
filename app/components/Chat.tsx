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
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Avatar } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import { BsSendFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { createMessage, getMessages } from '../lib/actions';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useFormState } from 'react-dom';

export default function Chat() {
  const [senderMessages, setSenderMessages] = useState([]);
  const [recipientMessages, setRecipientMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  // const recipient = { firstName: 'John', lastName: 'Doe' };
  // const messages = [
  //   { _id: '1', content: 'Hello there!', sender: 'user1' },
  //   { _id: '2', content: 'How are you?', sender: 'user2' },
  // ];

  const pathname = usePathname();
  const initialState = { message: null, errors: {}, receiverId: Number(pathname.slice(10)) };
  const [state, formAction] = useFormState(createMessage, initialState);
  const receiverId = Number(pathname.slice(10));
  useEffect(() => {
    const getData = async () => {
      try {
        const messages = await getMessages(Number(pathname.slice(10)));
        // setSenderMessages(messages?.senderMessages);
        // setRecipientMessages(messages?.recipientMessages);
        setSender(messages?.sender.name);
        setRecipient(messages?.recipient.name);
        setProfilePicture(messages.recipient.profilePicture);
        setMessages(messages.messages);
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
        {messages.map(message => (
          <Suspense key={message.id}>
            <Message
              justifyContent={message.receiverId !== receiverId ? 'flex-start' : 'flex-end'}
              backGround={message.receiverId === receiverId ? 'blue' : 'white'}
              color={message.receiverId === receiverId ? 'white' : 'black'}
              popOverPlacement={message.receiverId === receiverId ? 'left' : 'right'}
              content={message.content}
              messageId={message.id}
              receiverId={message.receiverId}
              senderId={message.senderId}
              // isSender={message.sender !== 'user1'}
            />
          </Suspense>
        ))}
        {/* {recipientMessages.map(message => (
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
        ))} */}
      </VStack>
      <form action={formAction}>
        <FormControl pt={5}>
          <InputGroup>
            <InputRightElement>
              <IconButton aria-label="send-message" type="submit">
                <BsSendFill color="white" />
              </IconButton>
            </InputRightElement>
            <Input
              role="chat-input"
              type="text"
              name="message"
              placeholder={`Message ${recipient}`}
              maxLength={200}
              size={{ sm: 'lg' }}
            />
            <input type="hidden" name="receiverId" value={Number(pathname.slice(10))} />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
}
