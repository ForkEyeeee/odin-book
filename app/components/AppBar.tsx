"use client";
import React from "react";
import SignInButton from "./SignInButton";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Links = ["Friends", "Messages", "Post"];

function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();
  const pathSegment = usePathname();
  return (
    <>
      <Box bg={useColorModeValue("gray.900", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href={"/"}>
              <Box>Logo</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {session.status === "authenticated" ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={session.data?.user?.image as undefined | string}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem color={"black"}>
                    <Link href={"/"}>Profile</Link>

                    {/* <Button onClick={() => signOut()}>Logout</Button> */}
                  </MenuItem>
                  <MenuItem color={"black"}>
                    <Link href={"/"}>Friends</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem color={"black"}>
                    <Link href={`${pathSegment}api/auth/signout`}>Logout</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <button onClick={() => signIn()}>Sign In</button>
            )}
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}

// const AppBar = () => {
//   return (
//     <header className="flex justify-between">
//       <Link href={"/"}>Home page</Link>
//       <Link href={"/UserPost"}>User Post Page</Link>
//       <SignInButton />
//     </header>
//   );
// };

export default AppBar;
