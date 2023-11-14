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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import { BsSendFill } from 'react-icons/bs';

export default function Chat() {
  const recipient = { firstName: 'John', lastName: 'Doe' };
  const messages = [
    { _id: '1', content: 'Hello there!', sender: 'user1' },
    { _id: '2', content: 'How are you?', sender: 'user2' },
  ];

  return (
    <Box flex="1" display="flex" flexDirection="column" h="100vh" p={{ xl: 5 }}>
      <HStack justifyContent={'space-between'} p={2}>
        <FontAwesomeIcon
          icon={faUserCircle as IconDefinition}
          style={{ color: '#808080' }}
          size="2x"
        />
        <Heading color={'white'} noOfLines={1} pb={5}>
          {recipient.firstName} {recipient.lastName}
        </Heading>
      </HStack>
      <VStack flex="1" overflowY="scroll">
        {messages.map(message => (
          <Message
            justifyContent="flex-start" 
            backGround="white" 
            color="black" 
            popOverPlacement="right" 
            key={message._id}
            content={message.content}
            isSender={message.sender !== 'user1'} 
          />
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
              placeholder={`Message ${recipient.firstName} ${recipient.lastName}`}
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
