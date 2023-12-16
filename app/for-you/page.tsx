import NoDataFound from '../components/NoDataFound';
import { Box } from '@chakra-ui/react';
import LoadMore from '../components/load-more';

export default async function Page() {
  try {
    return (
      <Box h={'100vh'}>
        <LoadMore />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
