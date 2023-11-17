'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CreatePostModal from './CreatePostModal';
import SideBar from './SideBar';

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const Links = ['Profile', 'Friends', 'Settings', 'Sign Out'];

  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="relative"
      top="0"
      bg={'gray.700'}
      width="100%"
      zIndex="1"
    >
      <Container px={4} mx="auto">
        <HStack spacing={4}>
          <Image
            alt="dev logo"
            w={'auto'}
            h={12}
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            onClick={() => router.push('/')}
          />

          <Input maxW="26rem" placeholder="Search..." borderColor={'gray.300'} borderRadius="5px" />
          <Spacer />
          <HStack spacing={3}>
            <IconButton aria-label="create post">
              <CreatePostModal />
            </IconButton>
            <Menu isLazy>
              <SideBar />
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar size="sm" src={session !== undefined ? session?.user.image!! : ''} />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue('gray.700', 'gray.100')}
                boxShadow="4px 4px 0"
                bg={'gray.500'}
              >
                <MenuItem>
                  <VStack justify="start" alignItems="left">
                    <Text size="sm" fontWeight={'bold'} mt="0 !important">
                      {session !== undefined ? session?.user.name : ''}
                    </Text>
                  </VStack>
                </MenuItem>

                <MenuDivider />
                {session &&
                  Links.map(link => (
                    <MenuItem
                      key={link}
                      onClick={
                        link === 'Sign Out'
                          ? () =>
                              signOut({ redirect: false }).then(() => {
                                router.push('/');
                              })
                          : undefined
                      }
                    >
                      {link === 'Sign Out' ? (
                        'Sign Out'
                      ) : (
                        <Link href={`/${link.toLowerCase()}`}>
                          <Text fontWeight="500">{link}</Text>
                        </Link>
                      )}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            {!session && <Button onClick={() => signIn()}>Sign In</Button>}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
