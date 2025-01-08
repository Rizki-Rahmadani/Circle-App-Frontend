import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import { Image, Button, Icon, Box, HStack, Text } from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';
import { ThreadType } from '@/types/threads.type';
import { Avatar } from './ui/avatar';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import ReplyComponent from './ReplyComponent';
import CreateReply from './CreateReply';
import { toggleLike } from '@/features/dashboard/services/like.services';

interface ImageDialogProps {
  threads: ThreadType[];
  threadId: number;
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onUpdate: (updatedThread: ThreadType) => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  threadId,
  threads,
  isOpen,
  onClose,
  imageUrl,
  onUpdate,
}) => {
  const thread = threads.find((t) => t.id === threadId);

  const handleToggleLike = async () => {
    if (!thread) {
      console.error('Thread is undefined');
      return;
    }

    try {
      const updatedData = await toggleLike(thread.id);
      const updatedThread = {
        ...thread,
        isLiked: updatedData.isLiked,
        _count: {
          ...thread._count,
          likes: updatedData.isLiked
            ? (thread._count?.likes ?? 0) + 1
            : (thread._count?.likes ?? 0) - 1,
        },
      };

      onUpdate(updatedThread);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <DialogRoot size={'cover'} open={isOpen} onOpenChange={onClose}>
      <DialogContent position={'relative'}>
        <DialogCloseTrigger
          borderColor="whiteAlpha.600"
          color="whiteAlpha.600"
          borderRadius="full"
        />

        <Button
          position={'absolute'}
          bg={'whiteAlpha.500'}
          right={'96'}
          top={10}
          marginRight={'96'}
        >
          <Icon>
            <LuChevronRight />
          </Icon>
        </Button>

        <DialogBody pt={8} bg={'blackAlpha.900'}>
          <Box display="flex" flexDirection="row" gap={4}>
            <Box
              flex={1}
              height={'900px'}
              position="relative"
              overflow="hidden"
            >
              <Image
                src={imageUrl}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <Box
              width="500px"
              display="flex"
              flexDirection="column"
              borderXWidth="1px"
              borderYWidth="1px"
              borderColor="gray.700"
              height={'900px'}
              pt={5}
              overflow="auto"
            >
              <Box borderBottomWidth="1px" borderColor="gray.700" px={4}>
                <Box display="flex" flexDirection="row">
                  <Avatar
                    size="sm"
                    src={thread?.author.profile?.avatarUrl || ''}
                  />
                  <Box display="flex" flexDirection="column" pl={3}>
                    <HStack mb={1} gap="2" color="white">
                      <Text fontWeight="semibold" textStyle="sm">
                        {thread?.author.fullname}
                      </Text>
                      <Text color="whiteAlpha.600" textStyle="sm">
                        @{thread?.author.username}
                      </Text>
                    </HStack>
                    <Box color="white">{thread?.content}</Box>
                  </Box>
                </Box>
                <HStack pl={12} pb={2} gap={5}>
                  <Button
                    fontWeight="normal"
                    p={0}
                    color={thread?.isLiked ? 'red.500' : 'whiteAlpha.600'}
                    onClick={handleToggleLike}
                  >
                    {thread?.isLiked ? <HiHeart /> : <HiOutlineHeart />}
                    <Text color="whiteAlpha.600">{thread?._count.likes}</Text>
                  </Button>
                  <Button fontWeight="normal" p={0} color="whiteAlpha.600">
                    <Text color="whiteAlpha.600">
                      {thread?._count.replies}
                      Replies
                    </Text>
                  </Button>
                </HStack>
              </Box>
              <Box borderBottomWidth="1px" borderColor="gray.700" px={4} py={3}>
                <CreateReply threadId={thread?.id.toString() || ''} />
              </Box>
              <Box flex={1} overflowY="auto">
                <ReplyComponent threadId={thread?.id} />
              </Box>
            </Box>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default ImageDialog;
