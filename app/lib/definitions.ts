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

export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number;
  createdAt: Date;
}

export interface HomePageProps {
  data: Post[];
  otherData: Post[];
  name: string;
  email: string;
  profilePicture: string;
}

export interface UserPostProps {
  post: Post;
  name: string;
  email: string;
  profilePicture: string;
}

export interface UserSession {
  name: string;
  email: string;
  image: string;
  id: number;
}
