'use client';
import Profile from '../components/Profile';
import { useFormStatus, useFormState } from 'react-dom';
import { updateProfile } from '../lib/actions';

const initialState = {
  message: null,
};

export default function Page() {
  const [state, formAction] = useFormState(updateProfile, initialState); //state is what it returns from return in the serve raction

  return (
    <form action={formAction}>
      <Profile />
      <button type="submit">Submit</button>
    </form>
  );
}
