'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useFormState } from 'react-dom';
import { createPost } from '../lib/actions';
import { AiOutlinePlus } from 'react-icons/ai';

const initialState = { message: null, errors: {} };

const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AiOutlinePlus />}
        color="white"
        colorScheme="teal"
        fontWeight="bold"
      >
        Create Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form action={formAction}>
              <FormControl mb={4}>
                <Textarea name="post" placeholder="What's on your mind?" required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="image-url">Image URL</FormLabel>
                <Input name="image-url" placeholder="http://example.com/image.jpg" />
              </FormControl>
              <ModalFooter pr={0}>
                <Button type="submit" colorScheme="green" mr={3} variant={'ghost'}>
                  Submit
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
