export type ThreadType = {
  id: number;
  authorId: number;
  content: string;
  createdAt: Date;
  image?: string;
  likes: { userId: number }[];
  _count: {
    likes: number; // Jumlah likes
    replies: number; // Jumlah replies
  };
  replies: [];
  updatedAt: Date;
  author: UserType;
  isLiked: boolean;
};

export type UserType = {
  id: number;
  fullname: string;
  username: string;
  profile?: {
    backgroundUrl?: string;
    avatarUrl?: string;
    bio?: string;
  };
  followersCount: number;
  followingCount: number;
};

export type ReplyType = {
  likeCount: number;
  isLiked: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
  comment: string;
  threadId: number;
  author: UserType;
  image?: string;
  _count: {
    likes: number; // Jumlah likes
    replies: number; // Jumlah replies
  };
  thread: ThreadType;
};
