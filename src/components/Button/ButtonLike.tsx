import { Button } from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { toggleLike } from '@/features/dashboard/services/like.services';
import { ThreadType } from '@/types/threads.type';

interface ButtonLikeProps {
  thread: ThreadType;
  onUpdate: (updatedThread: ThreadType) => void;
}

const ButtonLike: React.FC<ButtonLikeProps> = ({ thread, onUpdate }) => {
  const handleToggleLike = async () => {
    try {
      const updatedData = await toggleLike(thread.id);
      const updatedThread = {
        ...thread,
        isLiked: updatedData.isLiked,
        _count: {
          ...thread._count,
          likes: updatedData.isLiked
            ? thread._count.likes + 1
            : thread._count.likes - 1,
        },
      };
      onUpdate(updatedThread);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Button
      color={thread.isLiked ? 'red.500' : 'whiteAlpha.900'}
      onClick={handleToggleLike}
    >
      {thread.isLiked ? <HiHeart /> : <HiOutlineHeart />}
      {thread._count.likes} Like
    </Button>
  );
};

export default ButtonLike;
