import { Suspense } from 'react';
import { getMessages, getUnreadMessagesCount, setReadMessages } from '@/app/lib/actions';
import Chat from '../components/Chat';
import NoDataFound from '../components/NoDataFound';
import ChatSkeleton from './loading';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    receiverId?: string;
    page?: string;
  };
}) {
  try {
    const receiverId = Number(searchParams?.receiverId) || 0;

    const [messagesData, unReadMessagesData] = await Promise.all([
      getMessages(receiverId),
      getUnreadMessagesCount(receiverId),
    ]);

    const { messages, recipient, sender, profilePicture } = messagesData as any;
    const { unReadMessages } = unReadMessagesData;

    if (unReadMessages === undefined || unReadMessages === null) return <NoDataFound />;

    await setReadMessages(receiverId);

    return (
      <Suspense fallback={<ChatSkeleton />}>
        <Chat
          messages={messages}
          recipient={recipient}
          sender={sender}
          receiverId={receiverId}
          profilePicture={profilePicture}
          unReadMessages={unReadMessages}
        />
      </Suspense>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
