import NoDataFound from '../components/NoDataFound';
import { Box } from '@chakra-ui/react';
import LoadMoreDiscover from '../components/LoadMoreDiscover';
import TimeLineTabs from '../components/TimeLineTabs';

export default async function Page() {
  try {
    return (
      <Box>
        <TimeLineTabs />
        <LoadMoreDiscover />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
