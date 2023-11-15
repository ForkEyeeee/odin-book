import Message from '../../components/Message';
import Chat from '../../components/Chat';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Chat />
    </Suspense>
  );
}
