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
  IconButton,
  Box,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { deleteMessage, updateMessage } from '../lib/actions';
import { useFormState } from 'react-dom';

interface Props {
  justifyContent: string;
  backGround: string;
  color: string;
  content: string;
  popOverPlacement: undefined | PlacementWithLogical;
  messageId: number;
  receiverId: number;
  senderId: number;
}

const Message = ({
  justifyContent,
  backGround,
  color,
  content,
  popOverPlacement,
  messageId,
  receiverId,
  senderId,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(updateMessage, initialState);
  return (
    <Popover placement={popOverPlacement}>
      <Flex justifyContent={justifyContent} w={'100%'}>
        <PopoverTrigger>
          <Card maxW={'75%'} bg={backGround} role="message-card">
            <CardBody>
              <form action={formAction}>
                {!isEdit ? (
                  <Text fontSize={{ base: '16px', sm: '20px' }} color={color}>
                    {content}
                  </Text>
                ) : (
                  <>
                    <input type="hidden" name="receiverId" value={receiverId} />
                    <input type="hidden" name="messageId" value={messageId} />
                    <input type="hidden" name="senderId" value={senderId} />

                    <Input defaultValue={content} id="message" name="message" required />
                  </>
                )}
                {isEdit && (
                  <Box>
                    <IconButton aria-label="cancel button" onClick={() => setIsEdit(false)}>
                      <SmallCloseIcon />
                    </IconButton>
                    <Button type="submit">Submit</Button>
                  </Box>
                )}
              </form>
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Flex>

      <PopoverContent w={'fit-content'}>
        <Flex justifyContent={popOverPlacement === 'left' ? 'flex-end' : 'flex-start'}>
          <HStack spacing={5} p={1}>
            {!isEdit && (
              <>
                <IconButton aria-label="edit-button" onClick={() => setIsEdit(true)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
            <IconButton aria-label="delete button">
              <DeleteIcon color={'red'} onClick={() => deleteMessage(messageId, receiverId)} />
            </IconButton>
          </HStack>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default Message;
