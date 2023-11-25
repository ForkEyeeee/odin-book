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
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Avatar } from '@chakra-ui/react';
import Message from './Message';
import { BsSendFill } from 'react-icons/bs';
import { createMessage } from '../lib/actions';

import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';

interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
}

interface ChatProps {
  messages: Message[];
  recipient: string;
  sender: string;
  receiverId: number;
  profilePicture: string;
}

export default function Chat({
  messages,
  recipient,
  sender,
  receiverId,
  profilePicture,
}: ChatProps) {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createMessage, initialState);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (state !== null) setInputText('');
  }, [state]);

  return (
    <Box flex="1" display="flex" flexDirection="column" h="100vh" p={{ xl: 5 }}>
      <HStack justifyContent={'flex-start'} p={2}>
        <Link href={`/profile/${receiverId}`}>
          <Avatar size={{ base: 'sm', md: 'md' }} name="John Doe" src={`${profilePicture}`} />
        </Link>{' '}
        <Heading size={{ base: 'sm' }} color={'white'} noOfLines={1}>
          {recipient}
        </Heading>
      </HStack>
      <VStack flex="1" overflowY="scroll">
        {messages !== undefined &&
          messages.map(message => (
            <Message
              key={message.id}
              justifyContent={message.receiverId !== receiverId ? 'flex-start' : 'flex-end'}
              backGround={message.receiverId === receiverId ? 'blue' : 'white'}
              color={message.receiverId === receiverId ? 'white' : 'black'}
              popOverPlacement={message.receiverId === receiverId ? 'left' : 'right'}
              content={message.content}
              messageId={message.id}
              receiverId={message.receiverId}
              senderId={message.senderId}
              messageStatus={message.read}
            />
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
              onChange={e => setInputText(e.currentTarget.value)}
              value={inputText}
            />
            <input type="hidden" name="receiverId" value={receiverId} />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
}
