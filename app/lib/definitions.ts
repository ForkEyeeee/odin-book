export interface Props {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
  googleId: string;
  profileId: number | null;
  profilePicture: string | null;
}

export interface PostProps {
  post: PostWithAuthor;
  index: number;
}

export interface TimeLineTabsProps {
  forYouPosts: PostWithAuthor[];
  discoverPosts: PostWithAuthor[];
}

export interface Author {
  id: number;
  googleId: string;
  name: string;
  email: string;
  hashedPassword: string;
  profileId: number | null;
  profilePicture: string | null;
}
export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number | null;
  createdAt: Date;
  author: Author;
}

export interface PostWithAuthor {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number;
  createdAt: Date;
  author: Author;
}
export interface PostProps {
  post: PostWithAuthor;
  index: number;
}

export interface UserSession {
  name: string;
  email: string;
  image: string;
  id: number;
}

export interface Friend {
  id: number;
  user1Id: number;
  user2Id: number;
  status: string;
}

export interface ProfileProps {
  id: number;
  bio: string;
  dateOfBirth: string;
  gender: string;
  userId: number;
}
