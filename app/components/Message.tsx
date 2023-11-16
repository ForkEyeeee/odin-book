'use client';
import {
  Flex,
  Card,
  CardBody,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FormControl,
  HStack,
  Input,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { deleteMessage } from '../lib/actions';

interface Props {
  justifyContent: string;
  backGround: string;
  color: string;
  content: string;
  popOverPlacement: undefined | PlacementWithLogical;
  isSender: boolean;
  isOpen: boolean;
}

interface Message {
  messageId: number;
  senderId: number;
  receiverId: number;
}

const Message = ({
  justifyContent,
  backGround,
  color,
  content,
  popOverPlacement,
  isSender,
  isOpen,
  messageId,
  receiverId,
  senderId,
}: Props) => {
  const [messageInfo, setMessageInfo] = useState<Message[]>([]);

  const handleClick = () => {
    const messageInfo = {
      messageId,
      receiverId,
      senderId,
    };
    setMessageInfo(messageInfo);
  };
  console.log(messageInfo);
  return (
    <Popover placement={popOverPlacement}>
      <Flex justifyContent={justifyContent} w={'100%'}>
        <PopoverTrigger>
          <Card maxW={'75%'} bg={backGround} role="message-card" onClick={() => handleClick()}>
            <CardBody pb={isOpen ? 0 : undefined}>
              <Text fontSize={{ base: '16px', sm: '20px' }} color={color}>
                {content}
              </Text>
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Flex>
      {!isSender && !isOpen && (
        <PopoverContent w={'fit-content'}>
          <Flex justifyContent={popOverPlacement === 'left' ? 'flex-end' : 'flex-start'}>
            <HStack spacing={5} p={1}>
              <EditIcon />
              <DeleteIcon color={'red'} onClick={() => deleteMessage(messageInfo)} />
            </HStack>
          </Flex>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Message;
