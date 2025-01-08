import { create } from 'zustand';
import { toggleLike as apiToggleLike } from '@/features/dashboard/services/like.services';

interface LikeState {
  likes: Record<number, { count: number; isLiked: boolean }>;
  toggleLike: (
    threadId: number,
    initialCount: number,
    currentStatus: boolean
  ) => Promise<void>;
  initializeLikes: (threads: any[]) => void;
}

const useLikeStore = create<LikeState>((set) => ({
  likes: {},
  toggleLike: async (threadId, initialCount, currentStatus) => {
    // Optimistically update UI
    set((state) => ({
      likes: {
        ...state.likes,
        [threadId]: {
          count: currentStatus ? initialCount - 1 : initialCount + 1,
          isLiked: !currentStatus,
        },
      },
    }));

    try {
      await apiToggleLike(threadId);
    } catch (error) {
      // Revert on error
      set((state) => ({
        likes: {
          ...state.likes,
          [threadId]: {
            count: initialCount,
            isLiked: currentStatus,
          },
        },
      }));
      console.error('Error toggling like:', error);
    }
  },
  initializeLikes: (threads) => {
    const initialLikes: Record<number, { count: number; isLiked: boolean }> =
      {};
    threads.forEach((thread) => {
      initialLikes[thread.id] = {
        count: thread._count.likes,
        isLiked: thread.isLiked,
      };
    });
    set({ likes: initialLikes });
  },
}));

export default useLikeStore;
