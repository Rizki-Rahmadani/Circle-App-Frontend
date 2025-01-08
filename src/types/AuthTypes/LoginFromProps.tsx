export type RegisterFormProps = {
  email: string;
  username: string;
  password: string;
};

export type LoginFormProps = {
  username: string;
  password: string;
};

export interface EditProfileProps {
  avatarUrl: string;
  username: string;
  fullname: string;
  bio: string;
  email: string;
}
