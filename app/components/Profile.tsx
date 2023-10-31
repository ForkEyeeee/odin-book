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
import { useState } from 'react';

export default function Profile() {
  const [value, setValue] = useState('1');

  return (
    <>
      <FormControl id="bio">
        <FormLabel htmlFor="bio">Bio</FormLabel>
        <Textarea id="bio" name="bio" />
        <FormHelperText>Tell us about yourself</FormHelperText>
      </FormControl>
      <FormControl id="dateOfBirth">
        <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
        <Input id="dateOfBirth" name="dateOfBirth" type="date" required={false} />
        <FormHelperText>When were you born?</FormHelperText>
      </FormControl>{' '}
      <FormControl id="gender">
        <FormLabel htmlFor="gender">Gender</FormLabel>
        <RadioGroup id="gender" name="gender" onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </>
  );
}
