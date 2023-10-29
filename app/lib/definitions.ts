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
