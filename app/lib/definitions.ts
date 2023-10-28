export interface Props {
  children: React.ReactNode;
}

export interface User {
  name: string;
  email: string;
  hashedPassword: string;
  profilePicture: string;
}
