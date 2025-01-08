import { Button } from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { toggleLikeReply } from '@/features/dashboard/services/like.services';
import useReplyStore from '../StoreState/replyStore';
import { ReplyType } from '@/types/threads.type';

interface ButtonLikeReplyProps {
  reply: ReplyType;
}

const ButtonLikeReply: React.FC<ButtonLikeReplyProps> = ({ reply }) => {
  const { updateReplyLikeStatus } = useReplyStore();

  const handleToggleLike = async () => {
    try {
      // Panggil API toggle like
      const updatedData = await toggleLikeReply(reply.id);

      if (updatedData) {
        const { isLiked, likeCount } = updatedData;

        // Update Zustand store
        updateReplyLikeStatus(reply.id, isLiked, likeCount);
      }
    } catch (error) {
      console.error('Error toggling like on reply:', error);
    }
  };

  return (
    <Button
      color={reply.isLiked ? 'red.500' : 'whiteAlpha.900'}
      onClick={handleToggleLike}
      size="sm"
    >
      {reply.isLiked ? <HiHeart /> : <HiOutlineHeart />}
      {reply.likeCount} Like
    </Button>
  );
};

export default ButtonLikeReply;
