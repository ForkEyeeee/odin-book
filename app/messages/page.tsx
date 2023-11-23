import { Suspense } from 'react';
import { getMessages } from '@/app/lib/actions';
import Chat from '../components/Chat';
import { getUserId } from '@/app/lib/actions';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  try {
    const receiverId = Number(searchParams?.receiverId) || 0;
    const { messages, recipient, sender, profilePicture } = (await getMessages(receiverId)) as any;

    return (
      <Suspense fallback={<p>Loading feed...</p>}>
        <Chat
          messages={messages}
          recipient={recipient}
          sender={sender}
          receiverId={receiverId}
          profilePicture={profilePicture}
        />
      </Suspense>
    );
  } catch (error) {
    return <div>Failed to Fetch Messages.</div>;
  }
}
