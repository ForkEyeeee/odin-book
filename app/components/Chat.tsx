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
  Text,
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Avatar } from '@chakra-ui/react';
import Message from './Message';
import { BsSendFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { createMessage, getMessages } from '../lib/actions';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useFormState } from 'react-dom';
import { Message as MessageType } from '../lib/definitions';

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [profilePicture, setProfilePicture] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');

  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createMessage, initialState);
  const receiverId = Number(usePathname().slice(10));

  useEffect(() => {}, [state]);

  useEffect(() => {
    const getData = async (receiverId: number) => {
      try {
        const { messages, recipient, sender } = (await getMessages(receiverId)) as any;
        setMessages(messages);
        setRecipient(recipient);
        setSender(sender);
        return;
      } catch (error) {
        return (
          <Box>
            <Text>Unable to Fetch data</Text>
          </Box>
        );
      }
    };
    getData(receiverId);
  }, [receiverId]);

  return (
    <Box flex="1" display="flex" flexDirection="column" h="100vh" p={{ xl: 5 }}>
      <HStack justifyContent={'space-between'} p={2}>
        <Link href={`/profile/${receiverId}`}>
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
            />
          </Suspense>
        ))}
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
            <input type="hidden" name="receiverId" value={receiverId} />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
}
