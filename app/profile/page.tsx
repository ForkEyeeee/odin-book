'use client';
import Profile from '../components/Profile';
import { useFormState } from 'react-dom';
import { updateProfile } from '../lib/actions';
import { getSession } from 'next-auth/react';
import { getProfile } from '../lib/actions';
import { useEffect, useState } from 'react';
import { Profile as ProfileType } from '../lib/definitions';

const initialState = {
  message: null,
};

export default function Page() {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    const getData = async () => {
      const session = await getSession();
      const userId = session?.user.id;
      const profile = await getProfile(userId);
      setProfile(profile);
    };
    getData();
  }, []);

  return (
    <>
      <form action={formAction}>
        <Profile profile={profile} formState={state} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
