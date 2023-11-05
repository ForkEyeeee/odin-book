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
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Profile } from '../lib/definitions';

interface FormProps {
  profile?: Profile;
}

const initialState = { message: null, errors: {} };

export default function Profile({ profile }: FormProps) {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (state !== null) setIsEdit(false);
  }, [state]);

  const newProfile = profile === undefined || profile === null;
  const dateTimeString = '2023-12-02T04:01:07.818Z';
  const dateString = dateTimeString.split('T')[0];

  return (
    <Container maxW="container.md" mt={10}>
      <Heading mb={6}>User Profile</Heading>
      <form action={formAction}>
        <FormControl display="flex" alignItems="center" mb={6}>
          <FormLabel htmlFor="email-alerts" mb="0">
            Edit Mode
          </FormLabel>
          <Switch isChecked={isEdit} id="email-alerts" onChange={() => setIsEdit(!isEdit)} />
        </FormControl>

        {!isEdit ? (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="semibold">Bio:</Text>
                <Divider my={2} />
                <Text color="gray.300">{newProfile ? 'Not provided' : profile.bio}</Text>
              </Box>
              <Box>
                <Text fontWeight="semibold">Date of Birth:</Text>
                <Divider my={2} />
                <Text color="gray.300">
                  {profile === undefined || profile.dateOfBirth === null
                    ? 'Not provided'
                    : profile.dateOfBirth.toDateString()}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold">Gender:</Text>
                <Divider my={2} />
                <Text color="gray.300">{newProfile ? 'Not provided' : profile.gender}</Text>
              </Box>
            </VStack>
          </Box>
        ) : (
          <>
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
                defaultValue={newProfile ? '' : dateString}
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
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Button variant={'outline'} type="submit">
              Update Profile
            </Button>
          </>
        )}
      </form>
    </Container>
  );
}
