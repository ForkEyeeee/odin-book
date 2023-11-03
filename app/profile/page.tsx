'use client';
import Profile from '../components/Profile';
import { useFormState } from 'react-dom';
import { updateProfile } from '../lib/actions';
import { getSession } from 'next-auth/react';
import { getProfile } from '../lib/actions';
import { useEffect, useState } from 'react';
import { ProfileProps } from '../lib/definitions';

const initialState = {
  message: null,
};

export default function Page() {
  const [state, formAction] = useFormState(updateProfile, initialState); //state is what it returns from return in the serve raction
  const [session, setSession] = useState({});
  const [profile, setProfile] = useState<ProfileProps>();
  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session === null) return;
      setSession(session);
      const profile = await getProfile(session?.user.id);
      if (profile === null) return;
      setProfile(profile);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   setFormMessage(state);
  // }, [state]);
  return (
    <>
      {profile && (
        <form action={formAction}>
          <Profile profile={profile} formState={state} />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
