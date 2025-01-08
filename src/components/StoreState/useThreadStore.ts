import { create } from 'zustand';
import { ThreadType } from '@/types/threads.type';
import {
  getAllThread,
  updateThread as apiUpdateThread,
} from '@/features/dashboard/services/thread.services';

interface ThreadStore {
  threads: ThreadType[];
  setThreads: (threads: ThreadType[]) => void;
  addThread: (thread: ThreadType) => void;
  updatedThread: (
    threadId: number,
    newContent: string,
    newImage?: File
  ) => Promise<void>;
  deleteThread: (threadId: number) => void;
  fetchThreads: () => Promise<void>;
}

const useThreadStore = create<ThreadStore>((set) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
  addThread: (thread) =>
    set((state) => ({ threads: [thread, ...state.threads] })),
  updatedThread: async (threadId, newContent, newImage) => {
    await apiUpdateThread(threadId, newContent, newImage);
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              content: newContent,
              image: newImage ? URL.createObjectURL(newImage) : t.image,
            }
          : t
      ),
    }));
  },
  deleteThread: (threadId) =>
    set((state) => ({
      threads: state.threads.filter((t) => t.id !== threadId),
    })),
  fetchThreads: async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }
    try {
      const threads = await getAllThread(token);
      set({ threads });
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  },
}));

export default useThreadStore;
