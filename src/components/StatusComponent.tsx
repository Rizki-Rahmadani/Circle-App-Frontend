import { Button, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiChat } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import ImageDialog from '@/components/ImageDialog';
import { Avatar } from './ui/avatar';
import { getThreadById } from '@/features/dashboard/services/thread.services';
import { ThreadType } from '@/types/threads.type';
import CreateReply from '@/components/CreateReply';
import useReplyStore from './StoreState/replyStore';
import ReplyComponent from './ReplyComponent';
import ButtonLike from './Button/ButtonLike';

function StatusComponent() {
  const { id } = useParams<{ id: string }>();
  const [threads, setThreads] = useState<ThreadType[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [currentThreadId, setCurrentThreadId] = useState<number | null>(null);
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
    const updatedThreads = threads?.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    setThreads(updatedThreads || []);
  };

  const handleImageClick = (image: string, threadId: number) => {
    setImageUrl(image);
    setCurrentThreadId(threadId);
    setIsDialogOpen(true);
  };

  if (!threads || threads.length === 0) {
    return <Text>Thread not found</Text>;
  }

  return (
    <div>
      {threads.map((thread, index) => (
        <div key={index}>
          <div className="flex flex-col px-5 gap-4">
            <div className="flex">
              <Avatar
                src={thread.author?.profile?.avatarUrl || 'default-avatar-url'}
              />
              <div>
                <Text pl={5} textStyle={'lg'}>
                  {thread.author?.fullname || 'Unknown Author'}
                </Text>
                <Text textStyle={'sm'} pl={5} color={'gray.400'}>
                  @{thread.author?.username || 'Unknown Username'}
                </Text>
              </div>
            </div>
            <div>
              <Text textStyle={'lg'} color={'gray.400'}>
                {thread.content || 'No content available'}
              </Text>
              <div
                className="pt-3 max-w-lg"
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(thread.image || '', thread.id)}
              >
                {thread.image && !isDialogOpen && (
                  <img src={thread.image} alt="Thread" />
                )}
              </div>
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
          </div>
          <CreateReply threadId={thread.id.toString()} />
          <ReplyComponent
            threadId={thread.id}
            threadAuthorId={thread.author?.id}
          />
        </div>
      ))}
      {isDialogOpen && currentThreadId !== null && (
        <ImageDialog
          threads={threads}
          threadId={currentThreadId}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          imageUrl={imageUrl}
          onUpdate={handleUpdateThread}
        />
      )}
    </div>
  );
}

export default StatusComponent;
