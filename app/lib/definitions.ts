export interface Props {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
  profilePicture: string;
}

export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number;
  createdAt: Date;
}
