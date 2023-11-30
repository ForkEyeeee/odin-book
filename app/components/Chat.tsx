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
  Avatar,
} from '@chakra-ui/react';
import Link from 'next/link';
import Message from './Message';
import { BsSendFill } from 'react-icons/bs';
import { createMessage } from '../lib/actions';
import { useFormState } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import { Message as MessageType } from '../lib/definitions';

interface MessageProps {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
}

interface ChatProps {
  messages: MessageProps[];
  recipient: string;
  sender: string;
  receiverId: number;
  profilePicture: string;
  unReadMessages: MessageType[];
}

export default function Chat({
  messages,
  recipient,
  sender,
  receiverId,
  profilePicture,
  unReadMessages,
}: ChatProps) {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createMessage, initialState);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (state !== null) {
      setInputText('');
    }
  }, [state]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const message = messagesEndRef.current;
    if (message === null) return;
    message.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      h={{ base: '92.5vh', xl: '93.5vh' }}
      overflowY={'scroll'}
    >
      <Box p={{ xl: 5 }} bg="inherit">
        <HStack justifyContent={'flex-start'} p={2}>
          <Link href={`/profile?userid=${receiverId}&page=1`}>
            <Avatar size={{ base: 'sm', md: 'md' }} name="John Doe" src={profilePicture} />
          </Link>
          <Heading size={{ base: 'sm' }} color={'white'} noOfLines={1}>
            {recipient}
          </Heading>
        </HStack>
      </Box>
      <VStack flex="1" py={2} px={{ base: 2, md: 5 }}>
        {messages !== undefined &&
          messages.map(message => {
            const backGround = message.receiverId === receiverId ? 'blue' : 'white';
            const isColor =
              unReadMessages &&
              unReadMessages.find(unReadMessage => unReadMessage.id === message.id) !== undefined
                ? 'red.300'
                : backGround;
            return (
              <>
                <Message
                  key={message.id}
                  justifyContent={message.receiverId !== receiverId ? 'flex-start' : 'flex-end'}
                  backGround={backGround}
                  color={message.receiverId === receiverId ? 'white' : 'black'}
                  popOverPlacement={message.receiverId === receiverId ? 'left' : 'right'}
                  content={message.content}
                  messageId={message.id}
                  receiverId={message.receiverId}
                  senderId={message.senderId}
                  messageStatus={message.read}
                  unReadMessages={unReadMessages}
                  isColor={isColor}
                />
                <Box ref={messagesEndRef} />
              </>
            );
          })}
      </VStack>
      <Box position="sticky" bottom="0" p={2} pb={0}>
        <form action={formAction}>
          <FormControl>
            <InputGroup>
              <InputRightElement>
                <IconButton aria-label="send-message" type="submit">
                  <BsSendFill color="black" />
                </IconButton>
              </InputRightElement>
              <Input
                role="chat-input"
                type="text"
                name="message"
                placeholder={`Message ${recipient}`}
                maxLength={200}
                onChange={e => setInputText(e.currentTarget.value)}
                value={inputText}
                required
                bg={'whitesmoke'}
                color={'black'}
                size={'md'}
              />
              <input type="hidden" name="receiverId" value={receiverId} />
            </InputGroup>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}
