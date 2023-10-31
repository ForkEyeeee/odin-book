import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { UserPost } from './UserPost';
import { HomePageProps } from '../lib/definitions';
import prisma from '../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { UserSession } from '../lib/definitions';
import { User } from '../lib/definitions';

export async function TimeLineTabs(
  { data, otherData, name, email, profilePicture }: HomePageProps,
  user: User
) {
  console.log(name);
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>For You</Tab>
        <Tab>All Posts</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {data.map(post => (
            <UserPost
              key={post.id}
              post={post}
              name={name}
              email={email}
              profilePicture={profilePicture}
            ></UserPost>
          ))}
        </TabPanel>
        <TabPanel>
          {otherData.map(post => (
            <UserPost
              key={post.id}
              post={post}
              name={name}
              email={email}
              profilePicture={profilePicture}
            ></UserPost>
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TimeLineTabs;
