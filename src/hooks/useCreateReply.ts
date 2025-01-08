import { createReply } from '@/features/dashboard/services/reply.services';
import { useState } from 'react';

const useCreateReply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateReply = async (
    threadId: string,
    comment: string,
    imageFile?: File
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createReply(threadId, comment, imageFile);
      console.log('Reply created successfully:', result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Failed to create reply:', err);
      } else {
        setError('An unknown error occurred');
        console.error('Failed to create reply:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleCreateReply,
  };
};

export default useCreateReply;
