export interface ISideBarProps {
  user: {
    name: string;
    email: string;
    imageUrl?: string;
  };
  children?: React.ReactNode;
}