import { getAllReplyThreadById } from '@/features/dashboard/services/reply.services';
import { ReplyType } from '@/types/threads.type';
import { create } from 'zustand';

interface ReplyStore {
  replies: ReplyType[];
  isLoading: boolean;
  error: string | null;
  addReply: (reply: ReplyType) => void;
  setReplies: (replies: ReplyType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearReplies: () => void;
  fetchReplies: (threadId: number) => Promise<void>;
  updateReplyLikeStatus: (
    replyId: number,
    isLiked: any,
    likeCount: any
  ) => void;
}

const useReplyStore = create<ReplyStore>((set) => ({
  replies: [],
  isLoading: false,
  error: null,
  addReply: (reply) =>
    set((state) => ({
      replies: [reply, ...state.replies],
    })),
  setReplies: (replies) => set({ replies }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearReplies: () => set({ replies: [] }),
  fetchReplies: async (threadId: number) => {
    set({ isLoading: true, error: null });
    const token = localStorage.getItem('auth-token');

    if (!token) {
      set({ error: 'User not authenticated', isLoading: false });
      return;
    }

    try {
      const response = await getAllReplyThreadById(token, threadId);
      set({ replies: response.replies || [], isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch replies',
        isLoading: false,
      });
    }
  },
  updateReplyLikeStatus: (replyId: number, isLiked: any, likeCount: any) =>
    set((state) => ({
      replies: state.replies.map((reply) =>
        reply.id === replyId ? { ...reply, isLiked, likeCount } : reply
      ),
    })),
}));

export default useReplyStore;
