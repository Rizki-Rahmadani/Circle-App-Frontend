import { useEffect, useMemo } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import useReplyStore from './StoreState/replyStore';
import ButtonLikeReply from './Button/ButtonLikeReply';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import DeleteReply from './DeleteReply';

interface ReplyComponentProps {
  threadId: number | undefined;
  threadAuthorId: number;
}

function ReplyComponent({ threadId, threadAuthorId }: ReplyComponentProps) {
  const { replies, isLoading, error, fetchReplies } = useReplyStore();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Hitung waktu relatif untuk semua balasan menggunakan useMemo
  const relativeTimes = useMemo(
    () => replies.map((reply) => useRelativeTime(new Date(reply.createdAt))),
    [replies]
  );

  useEffect(() => {
    if (threadId) {
      fetchReplies(threadId);
    }
  }, [threadId, fetchReplies]);

  if (isLoading) {
    return <Text>Loading replies...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  if (!replies.length) {
    return <Text>No replies found</Text>;
  }

  return (
    <ul>
      {replies.map((reply, index) => (
        <li
          key={reply.id}
          className="border-y w-full pt-3 px-5 border-neutral-500 flex"
        >
          <Image
            borderWidth={3}
            borderColor={'blackAlpha.600'}
            src={
              reply.author?.profile?.avatarUrl ||
              `https://ui-avatars.com/api/?name=${reply.author?.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
            }
            boxSize={'50px'}
            borderRadius="full"
            fit="cover"
          />
          <div>
            <div className="flex flex-col">
              <div className="flex">
                <Text pl={5} textStyle={'lg'}>
                  {reply.author?.fullname || 'Unknown'}
                </Text>
                <Flex justifyContent="space-between" w="4xl">
                  <Box>
                    <Text textStyle={'sm'} pl={2} color={'gray.400'}>
                      @{reply.author?.username || 'Anonymous'} •{' '}
                      {relativeTimes[index]}
                    </Text>
                  </Box>
                  <Box>
                    <DeleteReply
                      replyId={reply.id}
                      currentUserId={currentUser.id} // ID pengguna yang sedang login
                      authorId={reply.author.id} // ID pembuat reply
                      threadAuthorId={threadAuthorId!} // ID pemilik thread
                      onReplyDeleted={() => fetchReplies(threadId!)} // Refresh daftar reply setelah delete
                    />
                  </Box>
                </Flex>
              </div>
              <Text pl={5} textStyle={'lg'} color={'gray.400'}>
                {reply.comment || 'No comment'}
              </Text>
              {reply.image && (
                <div className="pt-3 pl-5 max-w-lg">
                  <img src={reply.image} alt="Reply" />
                </div>
              )}
            </div>
            <div className="flex gap-4 pl-3 pt-2">
              <ButtonLikeReply reply={reply}></ButtonLikeReply>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReplyComponent;
