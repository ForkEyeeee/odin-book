'use client';
import {
  Flex,
  Card,
  CardBody,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  HStack,
  Input,
  Button,
  IconButton,
  Box,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { deleteMessage, updateMessage } from '../lib/actions';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';

interface Props {
  justifyContent: string;
  color: string;
  content: string;
  popOverPlacement:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
  messageId: number;
  receiverId: number;
  isRead: boolean;
  backGround: string;
}

const Message = ({
  justifyContent,
  color,
  content,
  popOverPlacement,
  messageId,
  receiverId,
  isRead,
  backGround,
}: Props) => {
  const initialState = { message: null, errors: {} };
  const [isEdit, setIsEdit] = useState(false);
  const [state, formAction] = useFormState(updateMessage, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const toast = useToast();
  const isAuthor = Number(searchParams.get('userId')) !== receiverId;

  useEffect(() => {
    if (state !== null) {
      setIsLoading(false);
      setIsEdit(false);
    }
  }, [state]);

  return (
    <Popover placement={popOverPlacement}>
      <Flex justifyContent={justifyContent} w={'100%'}>
        <PopoverTrigger>
          <Card
            maxW={'75%'}
            backgroundColor={backGround}
            role="message-card"
            boxShadow="md"
            borderRadius="lg"
            overflow={'hidden'}
            className={justifyContent === 'flex-start' ? 'receiver-card' : 'sender-card'}
            borderColor={isRead ? 'orange' : 'initial'}
            borderWidth={isRead ? 'thick' : 'initial'}
            borderStyle={isRead ? 'solid' : 'initial'}
          >
            <CardBody
              backgroundColor={isEdit ? 'gray.500' : backGround}
              borderRadius={isEdit ? 'lg' : 'initial'}
            >
              <form onSubmit={() => setIsLoading(true)} action={formAction}>
                {!isEdit ? (
                  <Text fontSize={{ base: '16px', sm: '20px' }} color={color}>
                    {content}
                  </Text>
                ) : (
                  <Box>
                    <Input
                      defaultValue={content}
                      id="card-input"
                      name="message"
                      required
                      size="md"
                      mb={4}
                      bg={'white'}
                      color={'black'}
                    />
                    <Flex justifyContent="flex-end" alignItems={'center'}>
                      <Button
                        type="button"
                        aria-label="cancel button"
                        onClick={() => setIsEdit(false)}
                        leftIcon={<CloseIcon />}
                        mr={3}
                        colorScheme="red"
                        variant={'solid'}
                      >
                        Cancel
                      </Button>
                      <input type="hidden" name="receiverId" value={receiverId} />
                      <input type="hidden" name="messageId" value={messageId} />
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <Button
                          type="submit"
                          colorScheme="green"
                          variant={'ghost'}
                          id="card-save-btn"
                          onClick={() => {
                            toast({
                              position: 'top',
                              title: 'Message updated.',
                              description: 'Message has been updated successfully',
                              status: 'success',
                              duration: 2000,
                              isClosable: true,
                            });
                          }}
                        >
                          Save
                        </Button>
                      )}
                    </Flex>
                  </Box>
                )}
              </form>
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Flex>
      {!isEdit && isAuthor && (
        <PopoverContent w={'fit-content'} boxShadow="md" borderRadius="lg">
          <Flex justifyContent={popOverPlacement === 'left' ? 'flex-end' : 'flex-start'}>
            <HStack spacing={5} p={1}>
              <IconButton
                id="edit-btn"
                aria-label="edit-button"
                onClick={() => setIsEdit(true)}
                icon={<EditIcon />}
                variant="ghost"
              />
              <IconButton
                aria-label="delete button"
                id="delete-btn"
                icon={<DeleteIcon color={'red'} />}
                variant="ghost"
                onClick={() => {
                  toast({
                    position: 'top',
                    title: 'Message deleted.',
                    description: 'Message has been deleted successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  });
                  deleteMessage(messageId, receiverId);
                }}
              />
            </HStack>
          </Flex>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Message;
