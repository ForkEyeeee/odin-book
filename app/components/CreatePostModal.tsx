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
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useFormState } from 'react-dom';
import { createPost } from '../lib/actions';

const initialState = { message: null, errors: {} };

const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <>
      <PlusSquareIcon onClick={onOpen} data-testid="open-modal-button" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form action={formAction}>
          <ModalContent>
            <ModalHeader>Create a Post</ModalHeader>
            <ModalCloseButton data-testid="close-modal-button" />
            <ModalBody>
              <FormControl display="flex" alignItems="center" mb={6}>
                {/* <FormLabel htmlFor="post" mb="0">
                  Edit Mode
                </FormLabel> */}
                <Textarea name="post" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="ghost"
                type="submit"
                onClick={onClose}
                data-testid="submit-modal-button"
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreatePostModal;
