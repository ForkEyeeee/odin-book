'use client';
import { Input, Textarea } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/react';

interface ProfileProps {
  profile: {
    id: number;
    bio: string;
    dateOfBirth: string;
    gender: string;
    userId: number;
  };
  formState: {
    message: string;
  };
}

export default function Profile({ profile, formState }: ProfileProps) {
  const [value, setValue] = useState('1');
  const [isEdit, setIsEdit] = useState(false);
  console.log(profile);
  useEffect(() => {
    console.log(formState);

    if (formState !== null) setIsEdit(false);
  }, [formState]);

  const newProfile = profile === undefined;

  const dateTimeString = '2023-12-02T04:01:07.818Z';
  const dateString = dateTimeString.split('T')[0];

  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Edit
        </FormLabel>
        <Switch id="email-alerts" onChange={() => setIsEdit(!isEdit)} />
      </FormControl>
      {!isEdit ? (
        <>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="semibold">Bio:</Text>
              <Text>{newProfile ? '' : profile.bio}</Text>{' '}
            </Box>
            <Box>
              <Text fontWeight="semibold">Date of Birth:</Text>
              <Text>{newProfile ? '' : profile.dateOfBirth.toString()}</Text>{' '}
            </Box>
            <Box>
              <Text fontWeight="semibold">Gender:</Text>
              <Text>{newProfile ? '' : profile.gender}</Text>{' '}
            </Box>
          </VStack>
        </>
      ) : (
        <>
          <FormControl id="bio">
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <Textarea id="bio" name="bio" defaultValue={newProfile ? '' : profile.bio} />
            <FormHelperText>Tell us about yourself</FormHelperText>
          </FormControl>
          <FormControl id="dateOfBirth">
            <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required={false}
              defaultValue={newProfile ? '' : dateString}
            />
            <FormHelperText>When were you born?</FormHelperText>
          </FormControl>{' '}
          <FormControl id="gender">
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <RadioGroup
              id="gender"
              name="gender"
              onChange={setValue}
              defaultValue={newProfile ? '' : profile.gender}
            >
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </>
      )}
    </>
  );
}
