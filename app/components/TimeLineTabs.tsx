import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Post } from './Post';
import { TimeLineTabsProps } from '../lib/definitions';

export function TimeLineTabs({ forYouPosts, discoverPosts }: TimeLineTabsProps) {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>For You</Tab>
        <Tab>All Posts</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {forYouPosts.map((post, index) => (
            <Post key={post.id} post={post} index={index}></Post>
          ))}
        </TabPanel>
        <TabPanel>
          {discoverPosts.map((post, index) => (
            <Post key={post.id} post={post} index={index}></Post>
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TimeLineTabs;
