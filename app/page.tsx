//root page.tsx
"use client";
import { useEffect, useState } from "react";
import { getTimeline } from "./lib/actions";
import { Post } from "./lib/definitions";
import { Text } from "@chakra-ui/react";

export default function Page() {
  const [timeLinePosts, settimeLinePosts] = useState<Post[]>([]);
  useEffect(() => {
    async function getData() {
      const posts = await getTimeline();
      if (posts) {
        settimeLinePosts(posts);
      }
    }
    getData();
  }, []);
  console.log(timeLinePosts);
  return (
    <>
      {timeLinePosts.map((post) => (
        <Text key={post.id}>{post.content}</Text>
      ))}
    </>
  );
}
