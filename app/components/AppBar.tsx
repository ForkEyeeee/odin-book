import React from "react";
import SignInButton from "./SignInButton";
import UserPostPage from "../UserPost/page";
import Link from "next/link";

const AppBar = () => {
  return (
    <header className="flex justify-between">
      <Link href={"/"}>Home page</Link>
      <Link href={"/UserPost"}>User Post Page</Link>
      <SignInButton />
    </header>
  );
};

export default AppBar;
