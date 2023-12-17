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
  Spinner,
  HStack,
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (post && post.success) {
      router.push('/for-you');
    }
    onClose();
  }, [post, onClose, router]);

  const handlePostTextChange = (event: any) => {
    setPostText(event.target.value);
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const resetForm = () => {
    setError('');
    setPostText('');
    setIsLoading(false);
    setFile(null);
    onClose();
  };

  const onSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const result = await handleCreatePost(postText, file);
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
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
      resetForm();
    } catch (error) {
      console.error(error);
      return { message: 'Post creation failed' };
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AiOutlinePlus />}
        color="black"
        colorScheme="green"
        fontWeight="bold"
        size={{ base: 'xs', sm: 'md' }}
        role="create-post-button"
      >
        Create Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size={{ xl: '5xl' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl mb={4} isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  value={postText}
                  onChange={handlePostTextChange}
                  id="post"
                  maxLength={200}
                  placeholder="What's on your mind?"
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
                <HStack spacing={!isLoading ? 3 : 10}>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Button
                      type="submit"
                      id="submit-post-btn"
                      _hover={{
                        bg: 'whatsapp.500 !important',
                      }}
                      ml={3}
                      backgroundColor={'whatsapp.700 !important'}
                    >
                      Submit
                    </Button>
                  )}
                </HStack>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
