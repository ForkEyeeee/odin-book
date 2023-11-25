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
  HStack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Post as PostType, Profile } from '../lib/definitions';
import { getSession } from 'next-auth/react';
import ProfilePost from './ProfilePost';
import { useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';

interface FormProps {
  profile?: Profile;
  posts: PostType[];
}

const initialState = { message: null, errors: {} };

export default function Profile({ profile, posts }: FormProps) {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [session, setSession] = useState('');
  const searchParams = useSearchParams();
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.100');
  useEffect(() => {
    if (state !== null) setIsEdit(false);
  }, [state]);

  useEffect(() => {
    const getData = async () => {
      const session = await getSession();
      if (session.user.id === profile?.userId) setIsUser(true);
      setSession(session?.user.name);
    };
    getData();
  }, [profile]);

  const newProfile = profile === undefined || profile === null;
  const dateTimeString = profile?.dateOfBirth;
  const formattedDate = profile?.dateOfBirth
    ? formatISO(profile.dateOfBirth, { representation: 'date' })
    : '';
  console.log(posts);
  return (
    <Container maxW="container.md" mt={10}>
      <Box display={'flex'}>
        <VStack alignItems={'flex-start'} w={'100%'} spacing={5}>
          <Heading mb={{ base: 0, md: 4 }} fontSize={{ base: 'lg' }}>
            User Profile
          </Heading>
          <Text mb={{ base: 5 }} fontSize={{ base: 'md' }}>
            {session}
          </Text>
        </VStack>
        {profile !== null && isUser ? (
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
                    : profile.dateOfBirth.toDateString()}
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
                    defaultValue={newProfile ? '' : formattedDate}
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
                  <Button variant={'outline'} colorScheme="green" type="submit">
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
