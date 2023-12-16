import NoDataFound from '../components/NoDataFound';
import { Box } from '@chakra-ui/react';
import LoadMoreForYou from '../components/LoadMoreForYou';
import TimeLineTabs from '../components/TimeLineTabs';

export default async function Page() {
  try {
    return (
      <Box>
        <TimeLineTabs />
        <LoadMoreForYou />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
