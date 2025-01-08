export type User = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  bio?: string;
  isFollowing: boolean;
  followingCount: number;
  followersCount: number;
  _count: {
    following: number;
    followers: number;
  };
};
