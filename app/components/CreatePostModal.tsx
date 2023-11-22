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
import { getFile } from '../lib/actions';

const initialState = { message: null, errors: {} };

const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <>
      <PlusSquareIcon onClick={onOpen} data-testid="open-modal-button" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton data-testid="close-modal-button" />
          <ModalBody>
            <form action={formAction}>
              <FormControl display="flex" alignItems="center" mb={6}>
                {/* <FormLabel htmlFor="post" mb="0">
                  Edit Mode
                </FormLabel> */}
                <Textarea name="post" required />
              </FormControl>
              <FormControl display="flex" alignItems="center" mb={6}>
                <FormLabel htmlFor="image-url" mb="0">
                  Image Url{' '}
                </FormLabel>
                <Input name="image-url" />
              </FormControl>
              <Button
                variant="ghost"
                type="submit"
                onClick={onClose}
                data-testid="submit-modal-button"
              >
                Submit
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </form>
            {/* <form action={getFile}>
              <label htmlFor="file">Photo</label>
              <input type="file" name="file" id="file" />
              <button type="submit" id="upload">
                Upload file
              </button>
            </form> */}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
