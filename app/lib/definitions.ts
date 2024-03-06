export interface Props {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  googleId: string;
  profileId: number | null;
  profilePicture: string | null;
  friendsAsUser1?: Friend[] | undefined;
  friendsAsUser2?: Friend[] | undefined;
  message?: string;
}

export interface PostProps {
  post: PostWithAuthor;
  index?: number;
  userId: number;
  innerRef?: (node?: Element | null | undefined) => void;
}

export interface TimeLineTabsProps {
  forYouPosts?: PostWithAuthor[];
  discoverPosts?: PostWithAuthor[];
  userId: number;
}

export interface Author {
  id: number;
  googleId: string;
  name: string;
  email: string;
  profileId: number | null;
  profilePicture: string | null;
}
export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number | null;
  createdAt: Date;
  blurURL: string | null;
  postTime?: string;
  author?: Author;
  message?: string | undefined;
  success?: boolean;
} 
export interface ErrorResponse {
  message: string;
  success?: boolean;
}

export type CreatePostResponse = Post | ErrorResponse | undefined;

export interface PostWithAuthor {
  id: number;
  content: string;
  imageUrl: string | null;
  blurURL: string | null;
  authorId: number;
  createdAt: Date;
  postTime?: string;
  author: Author;
  message?: string;
  likes: {
    id: number;
    authorId: number;
    postId: number;
    createdAt: Date;
  }[];
  comments: {
    id: number;
    content: string;
    authorId: number;
    postId: number;
    createdAt: Date;
    author: Author;
    commentLikes: CommentLike[];
  }[];
}

export interface PostProps {
  post: PostWithAuthor;
  index?: number;
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
  sentMessages?: Message[];
  receivedMessages?: Message[];
  profilePicture?: string;
  name?: string;
  email?: string;
}

export interface Profile {
  id: number;
  bio: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  userId: number | null;
  user: User | null;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string | Date;
  read: boolean;
}

export enum FriendshipStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
  BLOCKED,
}

export interface CommentLike {
  id: number;
  authorId: number;
  commentId: number;
  createdAt: Date;
  postId: number | null;
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: Date;
  author: Author;
  commentLikes: CommentLike[];
  message?: string;
}

export interface CommentProps {
  comments: Comment[];
  post: PostWithAuthor;
  userId: number;
  handleDeleteComment: (
    comment: Comment
  ) => Promise<
    | ((
        commentId: number
      ) => Promise<
        | { id: number; content: string; authorId: number; postId: number; createdAt: Date }
        | { message: string }
      >)
    | undefined
  >;
}
