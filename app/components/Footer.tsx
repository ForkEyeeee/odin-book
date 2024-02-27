'use client';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  IconButton,
  LinkBox,
  Icon,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiFlashlightFill } from 'react-icons/ri';
import Image from 'next/image';

const Logo = (props: any) => {
  return (
    <HStack>
      <Link href={'/discover'}>
        <Icon as={RiFlashlightFill} cursor={'pointer'} h={8} w={8} />
      </Link>
      <Text fontFamily={'monospace'} fontSize={{ base: 'sm', sm: 'xl' }}>
        Odin Book
      </Text>
    </HStack>
  );
};

export default function SmallWithLogoLeft() {
  const pathname = usePathname();
  const isMessageRoute = pathname.includes('/messages');
  return (
    <Box display={isMessageRoute ? 'none' : ''} bg={'gray.900'} color={'white'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', sm: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo />
        <Text fontFamily={'monospace'} fontSize={{ base: 'sm', sm: 'xl' }}>
          Jayden Brown
        </Text>
        <LinkBox>
          <Link href={'https://github.com/JBrown58/odin-book'} target="_blank">
            <HStack>
              <Image
                className="logo"
                width={75}
                height={75}
                alt="github logo"
                src={'/github-2.svg'}
                sizes="100vw"
                quality={100}
                priority
              />
              <IconButton
                icon={<FaGithub size="1.5em" />}
                aria-label="Github"
                variant="ghost"
                size="lg"
                _hover={{
                  bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
                }}
              />
            </HStack>
          </Link>
        </LinkBox>
      </Container>
    </Box>
  );
}
