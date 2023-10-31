import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { UserPost } from './UserPost';
import { HomePageProps } from '../lib/definitions';

const TimeLineTabs = ({ data, otherData }: HomePageProps) => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>For You</Tab>
        <Tab>All Posts</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {data.map(post => (
            <UserPost key={post.id} post={post}></UserPost>
          ))}
        </TabPanel>
        <TabPanel>
          {otherData.map(post => (
            <UserPost key={post.id} post={post}></UserPost>
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TimeLineTabs;
