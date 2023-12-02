'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Icon,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { RiFlashlightFill } from 'react-icons/ri';
import CreatePostModal from './CreatePostModal';
import SideBar from './SideBar';
import { getUnreadMessagesCount } from '../lib/actions';
import Link from 'next/link';

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const receiverId = pathname.includes('/messages')
      ? Number(searchParams.get('receiverId'))
      : null;

    const fetchData = async () => {
      const { unreadMessageCount } = await getUnreadMessagesCount(receiverId);
      setUnreadMessageCount(Number(unreadMessageCount));
    };
    fetchData();
  }, [pathname, searchParams]);

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
    });
  };

  return (
    <Box px={4} bg="gray.800" h={{ base: 65 }} position="sticky" top={0} zIndex={1}>
      <Flex h={16} alignItems="center" justifyContent={'space-between'}>
        <Link href={'/discover'}>
          <Icon as={RiFlashlightFill} cursor={'pointer'} h={8} w={8} />
        </Link>
        <Center flex="1" display={{ base: 'none' }}>
          <Heading as="h3" size={{ base: 'xs', sm: 'lg' }}>
            Social Media App
          </Heading>
        </Center>
        <HStack>
          {session ? (
            <>
              <Box position="relative">
                <CreatePostModal />
                <SideBar />
                {unreadMessageCount > 0 && (
                  <Box
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    borderRadius="full"
                    width="auto"
                    minWidth="1.5em"
                    height="1.5em"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="0.8em"
                    color="white"
                    pl={1}
                    pb={1}
                  >
                    {unreadMessageCount}
                  </Box>
                )}
              </Box>
              <Menu>
                <MenuButton
                  as={Avatar}
                  size="sm"
                  src={session.user.image as string}
                  cursor={'pointer'}
                  role="profile-button"
                />
                <MenuList>
                  <Link href={`/profile?userid=${session.user.id}`} passHref>
                    <MenuItem
                      id="profile-link"
                      _hover={{
                        bg: '#71767C',
                        transition: '0.3s',
                      }}
                    >
                      Profile
                    </MenuItem>
                  </Link>
                  <Link href="/friends" passHref>
                    <MenuItem
                      _hover={{
                        bg: '#71767C',
                        transition: '0.3s',
                      }}
                    >
                      Friends List
                    </MenuItem>
                  </Link>
                  <Link href="/addfriend" passHref>
                    <MenuItem
                      _hover={{
                        bg: '#71767C',
                        transition: '0.3s',
                      }}
                    >
                      Add Friends
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleSignOut} _hover={{ bg: '#ff0038 ', transition: '.5s' }}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
