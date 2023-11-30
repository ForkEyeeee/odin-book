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
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { Post } from '../lib/definitions';
import { handleCreatePost } from './util/handleCreatePost';

const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const [file, setFile] = useState(null);
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (post && post.success) {
      router.push('/');
    }
    onClose();
  }, [post, onClose, router]);

  const handlePostTextChange = (event: any) => {
    setPostText(event.target.value);
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const result = await handleCreatePost(postText, file);
      if (!result.success) {
        setError(result.message);
        return;
      }
      setPost(result);
      onClose();
      toast({
        title: 'Created successfully.',
        description: 'Post has been created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setError('');
      setPostText('');
    } catch (error) {
      return { message: 'Post creation failed' };
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AiOutlinePlus />}
        color="white"
        colorScheme="teal"
        fontWeight="bold"
        size={{ base: 'xs', sm: 'md' }}
        role="create-post-button"
      >
        Create Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl mb={4}>
                <Textarea
                  value={postText}
                  onChange={handlePostTextChange}
                  id="post"
                  placeholder="What's on your mind?"
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="file_input">Upload Image</FormLabel>
                <input
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />{' '}
                <Text color={'red'}>{error !== '' && error}</Text>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                  SVG, PNG, JPG or GIF.
                </p>
              </FormControl>
              <ModalFooter pr={0}>
                <Button
                  type="submit"
                  id="submit-post-btn"
                  colorScheme="green"
                  mr={3}
                  variant={'ghost'}
                >
                  Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPostText('');
                    setFile(null);
                    setError('');
                    onClose();
                  }}
                >
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
