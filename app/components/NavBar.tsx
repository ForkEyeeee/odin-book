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
import { getUnreadMessagesCount } from '../lib/actions';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const Links = ['Profile', 'Friends', 'Settings', 'Sign Out'];
  const [unreadMessageCount, setUnreeadMessageCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const unreadMessageCount = await getUnreadMessagesCount();
      setUnreeadMessageCount(Number(unreadMessageCount));
    };
    getData();
  }, []);

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
              <Text>{unreadMessageCount}</Text>
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
                    <>
                      {link === 'Profile' && (
                        <MenuItem
                          key={link}
                          onClick={() => {
                            console.log(`Navigating to profile of user ${session.user.id}`);
                            router.push(`/profile?userid=${session.user.id}&page=1`);
                          }}
                        >
                          <Text fontWeight="500">{link}</Text>
                        </MenuItem>
                      )}
                      {link === 'Sign Out' ? (
                        <MenuItem
                          key={link}
                          onClick={() => {
                            signOut({ redirect: false }).then(() => {
                              console.log('Signing out and redirecting to home');
                              router.push('/');
                            });
                          }}
                        >
                          <Text fontWeight="500">{link}</Text>
                        </MenuItem>
                      ) : (
                        link !== 'Profile' && (
                          <MenuItem>
                            <Link href={`/${link.toLowerCase()}`}>
                              <Text fontWeight="500">{link}</Text>
                            </Link>
                          </MenuItem>
                        )
                      )}
                    </>
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
