import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { HiChat } from 'react-icons/hi';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ButtonLike from './Button/ButtonLike';
import ThreadOptions from './ThreadOptions';
import useUserStore from './StoreState/userStore';
import Header from './Header';
import useThreadStore from './StoreState/useThreadStore';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { ThreadType } from '@/types/threads.type';

function Post() {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  const { threads, fetchThreads, setThreads, deleteThread, updatedThread } =
    useThreadStore();

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleUpdateThread = (updatedThread: ThreadType) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    setThreads(updatedThreads);
  };

  const handleThreadDeleted = (threadId: number) => {
    deleteThread(threadId);
  };

  const handleThreadUpdated = (threadId: number, newContent: string) => {
    updatedThread(threadId, newContent);
  };

  const ThreadItem = ({ thread }: { thread: ThreadType }) => {
    const relativeTime = useRelativeTime(new Date(thread.createdAt));

    return (
      <li
        key={thread.id}
        className="border-y w-full pt-3 px-5 border-neutral-500 flex"
      >
        <Image
          borderWidth={3}
          borderColor={'blackAlpha.600'}
          src={
            thread.author?.profile?.avatarUrl ||
            `https://ui-avatars.com/api/?name=${thread.author?.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
          }
          boxSize={'50px'}
          borderRadius="full"
          fit="cover"
        />
        <div className="flex flex-col">
          <div className="flex">
            <Text pl={5} textStyle={'lg'}>
              {thread.author?.fullname}
            </Text>
            <Flex justifyContent={'space-between'} w="4xl">
              <Text textStyle={'sm'} pl={2} color={'gray.400'}>
                @{thread.author?.username} • {relativeTime}
              </Text>
              <Box>
                {currentUser?.id === thread.authorId && (
                  <div>
                    <ThreadOptions
                      threadId={thread.id}
                      authorId={thread.authorId}
                      currentUserId={currentUser?.id || 0}
                      content={thread.content}
                      onThreadDeleted={() => handleThreadDeleted(thread.id)}
                      onThreadUpdated={(newContent) =>
                        handleThreadUpdated(thread.id, newContent)
                      }
                    />
                  </div>
                )}
              </Box>
            </Flex>
          </div>
          <div onClick={() => navigate(`/status/${thread.id}`)}>
            <Text pl={5} textStyle={'lg'} color={'gray.400'}>
              {thread.content}
            </Text>
            {thread.image && (
              <div className="pt-3 pl-5 max-w-lg">
                <img src={thread.image} alt="" />
              </div>
            )}
          </div>

          <div className="flex gap-4 pl-3 pt-2 items-center">
            <ButtonLike thread={thread} onUpdate={handleUpdateThread} />
            <Button textStyle={'sm'}>
              <Icon size={'lg'}>
                <HiChat />
              </Icon>
              {thread._count.replies || 0} Replies
            </Button>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <Header />
      <ul>
        {threads.length > 0 &&
          threads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))}
      </ul>
    </>
  );
}

export default Post;
