'use client';
import { updateProfile } from '../lib/actions';
import { useFormState } from 'react-dom';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  VStack,
  Box,
  Text,
  Textarea,
  Input,
  Button,
  Container,
  Heading,
  Divider,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Post as PostType, Profile } from '../lib/definitions';
import ProfilePost from './ProfilePost';
import { useToast } from '@chakra-ui/react';
import parseAndFormatDate from './util/parseAndFormatDate';

interface FormProps {
  profile?: Profile;
  posts: PostType[] | undefined;
  isAuthor: boolean;
}

const initialState = { message: null, errors: {} };

export default function Profile({ profile, posts, isAuthor }: FormProps) {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.100');

  useEffect(() => {
    if (state !== null) setIsEdit(false);
  }, [state]);

  const newProfile = profile === undefined || profile === null;

  const { inputFormattedDate, formattedDate } = parseAndFormatDate(
    profile?.dateOfBirth === null ? '' : profile!.dateOfBirth.toISOString()
  );

  return (
    <Container maxW="container.md" mt={10}>
      <Box display={'flex'}>
        <VStack alignItems={'flex-start'} w={'100%'} spacing={5}>
          <Heading mb={{ base: 0, md: 4 }} fontSize={{ base: 'lg' }}>
            User Profile
          </Heading>
          <Text mb={{ base: 5 }} fontSize={{ base: 'md' }}>
            {profile !== undefined &&
              profile.user !== undefined &&
              profile.user !== null &&
              profile?.user.name}
          </Text>
        </VStack>
        {profile !== null && isAuthor ? (
          <FormControl display="flex" justifyContent={'flex-end'} mb={6}>
            <FormLabel htmlFor="email-alerts" mb="0" fontSize={{ base: 'large', md: 'xl' }}>
              Edit
            </FormLabel>
            <Switch
              size={{ base: 'md', md: 'lg' }}
              isChecked={isEdit}
              id="email-alerts"
              colorScheme="teal"
              onChange={() => setIsEdit(!isEdit)}
            />
          </FormControl>
        ) : null}
      </Box>

      <form action={formAction}>
        {!isEdit && profile !== null ? (
          <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            overflow="hidden"
            p={5}
            bg={bgColor}
            color={textColor}
            mb={10}
            mt={5}
          >
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="semibold">Bio:</Text>
                <Divider my={2} />
                <Text>{newProfile ? 'Not provided' : profile.bio}</Text>
              </Box>
              <Box>
                <Text fontWeight="semibold">Date of Birth:</Text>
                <Divider my={2} />
                <Text>
                  {profile === undefined || profile.dateOfBirth === null
                    ? 'Not provided'
                    : formattedDate}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold">Gender:</Text>
                <Divider my={2} />
                <Text>{newProfile ? 'Not provided' : profile.gender}</Text>
              </Box>
            </VStack>
          </Box>
        ) : (
          <>
            {profile !== null && (
              <Box mb={10}>
                <FormControl id="bio" mb={4}>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile === undefined || profile.bio === null ? '' : profile?.bio}
                    placeholder="Tell us about yourself"
                  />
                </FormControl>
                <FormControl id="dateOfBirth" mb={4}>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    defaultValue={newProfile ? '' : inputFormattedDate}
                  />
                </FormControl>
                <FormControl id="gender" mb={6}>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <RadioGroup
                    id="gender"
                    name="gender"
                    defaultValue={
                      profile === undefined || profile.gender === null ? '' : profile?.gender
                    }
                  >
                    <Stack direction="row">
                      <Radio defaultValue={profile?.gender ?? ''} value="Male">
                        Male
                      </Radio>
                      <Radio value="Female">Female</Radio>
                      <Radio value="Other">Other</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Flex justifyContent={'flex-end'}>
                  <Button
                    variant={'outline'}
                    colorScheme="green"
                    type="submit"
                    id="profile-submit-btn"
                    onClick={() => {
                      toast({
                        title: 'Updated successfully.',
                        description: 'Profile has been updated successfully',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      });
                    }}
                  >
                    Update Profile
                  </Button>
                </Flex>
              </Box>
            )}
          </>
        )}
      </form>
      <ProfilePost posts={posts} />
    </Container>
  );
}
