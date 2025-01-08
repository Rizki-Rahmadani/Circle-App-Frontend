import { Box, Button, Icon, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiChat } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { getThreadById } from '@/features/dashboard/services/thread.services';
import { ThreadType } from '@/types/threads.type';
import CreateReply from '@/components/CreateReply';
import useReplyStore from './StoreState/replyStore';
import ButtonLike from './Button/ButtonLike';

function StatusImageDialog() {
  const { id } = useParams<{ id: string }>();
  const [threads, setThreads] = useState<ThreadType[] | null>(null);
  const navigate = useNavigate();
  const { replies } = useReplyStore();

  useEffect(() => {
    if (id) {
      retrieveThreadById(id);
    }
  }, [id]);

  const retrieveThreadById = async (id: string) => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    try {
      const threadData = await getThreadById(token, id);
      console.log('Thread Data:', threadData);

      if (Array.isArray(threadData)) {
        setThreads(threadData);
      } else {
        setThreads([threadData]);
      }
    } catch (error) {
      console.error('Error fetching thread:', error);
    }
  };

  const handleUpdateThread = (updatedThread: ThreadType) => {
    if (!threads) return;
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    setThreads(updatedThreads);
  };

  if (!threads || threads.length === 0) {
    return <Text>Thread not found</Text>;
  }

  return (
    <div>
      {threads.map((thread, index) => (
        <div key={index}>
          <Box
            className="flex flex-col pt-2 px-5 gap-4 border-neutral-500"
            borderBottomWidth="1px"
          >
            <div
              className="flex"
              onClick={() => navigate(`/profile/${thread.author.id}`)}
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
              <div>
                <Text pl={5} textStyle={'lg'}>
                  {thread.author?.fullname || 'Unknown Author'}
                </Text>
                <Text textStyle={'xs'} pl={5} color={'gray.400'}>
                  @{thread.author?.username || 'Unknown Username'}
                </Text>
              </div>
            </div>
            <div>
              <Text textStyle={'sm'} color={'gray.400'}>
                {thread.content || 'No content available'}
              </Text>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <ButtonLike thread={thread} onUpdate={handleUpdateThread} />
              </div>
              <div>
                <Button>
                  <Icon size={'lg'}>
                    <HiChat />
                  </Icon>
                  {replies.length || 0} Replies
                </Button>
              </div>
            </div>
          </Box>
          <CreateReply threadId={thread.id.toString()} />
        </div>
      ))}
    </div>
  );
}

export default StatusImageDialog;
