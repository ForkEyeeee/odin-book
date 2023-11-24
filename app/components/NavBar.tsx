'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Avatar,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Center,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { RiFlashlightFill } from 'react-icons/ri';
import CreatePostModal from './CreatePostModal';
import SideBar from './SideBar';
import { getUnreadMessagesCount } from '../lib/actions';

const navLinks = [
  { name: 'Profile', action: 'profile' },
  { name: 'Friends', action: 'friends' },
  { name: 'Settings', action: 'settings' },
  { name: 'Sign Out', action: 'signout' },
];

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getData = async () => {
      const count = await getUnreadMessagesCount();
      setUnreadMessageCount(Number(count));
    };
    getData();
  }, []);

  const handleNavLinkClick = action => {
    if (action === 'profile') {
      router.push(`/profile?userid=${session.user.id}&page=1`);
    } else if (action === 'signout') {
      signOut({ redirect: false }).then(() => {
        router.push('/');
      });
    } else {
      router.push(`/${action}`);
    }
  };

  return (
    <Box px={4} bg={useColorModeValue('gray.800', 'black')}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent={{ base: 'space-between', md: 'center' }}
        mx="auto"
        position="relative"
      >
        <Icon
          as={RiFlashlightFill}
          h={8}
          w={8}
          onClick={() => router.push('/')}
          position="absolute"
          left="4"
          display={{ base: 'none', md: 'block' }}
        />

        <Center>
          {session &&
            navLinks.map((link, index) => (
              <Button key={index} mx={2} onClick={() => handleNavLinkClick(link.action)}>
                {link.name}
              </Button>
            ))}
          {session && <CreatePostModal />}
        </Center>

        <HStack position="absolute" right="4">
          {session && (
            <Box position="relative" mr={2}>
              <IconButton aria-label="unread messages" icon={<SideBar />} />
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
                >
                  {unreadMessageCount}
                </Box>
              )}
            </Box>
          )}

          {!session ? (
            <Button onClick={() => signIn()}>Sign In</Button>
          ) : (
            <Avatar size="sm" src={session.user.image} />
          )}
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          position="absolute"
          right="4"
        />
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen && (
        <Box pb={4} display={{ base: 'inherit', md: 'none' }}>
          <Center flexDirection="column">
            {session &&
              navLinks.map((link, index) => (
                <Button key={index} my={1} onClick={() => handleNavLinkClick(link.action)} w="full">
                  {link.name}
                </Button>
              ))}
            {session && <CreatePostModal />}
          </Center>
        </Box>
      )}
    </Box>
  );
}
