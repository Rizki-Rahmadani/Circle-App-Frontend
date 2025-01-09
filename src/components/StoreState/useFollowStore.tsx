import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FollowedUser {
  id: number;
  avatarUrl: string;
  username: string;
  fullname: string;
}

interface FollowState {
  following: FollowedUser[];
  followers: FollowedUser[];
  followUser: (user: FollowedUser) => void;
  unfollowUser: (userId: number) => void;
  addFollower: (user: FollowedUser) => void;
  resetFollow: () => void;
}

const useFollowStore = create<FollowState>()(
  persist(
    (set) => ({
      following: [],
      followers: [],

      followUser: (user: FollowedUser) => {
        set((state) => {
          const alreadyFollowing = state.following.some(
            (followedUser) => followedUser.id === user.id
          );
          if (alreadyFollowing) return state;
          return {
            following: [...state.following, user],
          };
        });
      },

      unfollowUser: (userId: number) => {
        set((state) => ({
          following: state.following.filter((user) => user.id !== userId),
        }));
      },

      addFollower: (user: FollowedUser) => {
        set((state) => {
          const alreadyFollower = state.followers.some(
            (follower) => follower.id === user.id
          );
          if (alreadyFollower) return state;
          return {
            followers: [...state.followers, user],
          };
        });
      },

      resetFollow: () => {
        set(() => ({
          following: [],
          followers: [],
        }));
      },
    }),
    {
      name: 'follow',
      partialize: (state) => ({
        following: state.following,
        followers: state.followers,
      }),
    }
  )
);

export default useFollowStore;
