import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { UserPost } from './UserPost';
import { HomePageProps } from '../lib/definitions';

export async function TimeLineTabs({
  data,
  otherData,
  name,
  email,
  profilePicture,
}: HomePageProps) {
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
