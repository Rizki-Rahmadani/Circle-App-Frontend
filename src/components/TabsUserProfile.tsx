import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { HiChat } from 'react-icons/hi';
import { Avatar } from './ui/avatar';
import { useEffect, useState } from 'react';
import { ThreadType } from '@/types/threads.type';
import ImageDialog from './ImageDialog';
import { getAllThreadByAuthorId } from '@/features/dashboard/services/thread.services';
import { useParams } from 'react-router-dom';
import ButtonLike from './Button/ButtonLike';

const TabsUserProfile = () => {
  const { id } = useParams();
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const token = localStorage.getItem('auth-token');
  const [currentThreadId, setCurrentThreadId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserThreadsById = async () => {
      if (token && id) {
        try {
          const userThreadsById = await getAllThreadByAuthorId(
            token,
            parseInt(id)
          );
          console.log('User Threads:', userThreadsById);
          if (Array.isArray(userThreadsById)) {
            setThreads(userThreadsById);
          } else if (
            userThreadsById &&
            userThreadsById.threads &&
            Array.isArray(userThreadsById.threads)
          ) {
            setThreads(userThreadsById.threads);
          } else {
            setThreads([]);
          }
        } catch (error) {
          console.error('Error fetching user threads by ID:', error);
          setThreads([]);
        }
      }
    };

    fetchUserThreadsById();
  }, [id, token, setThreads]);

  const handleImageClick = (image: string, threadId: number) => {
    setImageUrl(image);
    setCurrentThreadId(threadId);
    setIsDialogOpen(true);
  };

  const handleUpdateThread = (updatedThread: ThreadType) => {
    if (!threads) return;
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    setThreads(updatedThreads);
  };

  return (
    <Flex justify={'space-between'}>
      <main className="w-full border-neutral-500">
        <Tabs.Root defaultValue={'all-post'}>
          <Tabs.List>
            <Tabs.Trigger value="all-post" w={'1/2'} justifyContent={'center'}>
              All Post
            </Tabs.Trigger>
            <Tabs.Trigger value="media" w={'1/2'} justifyContent={'center'}>
              Media
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="all-post">
            {threads.map((thread, index) => (
              <Box
                borderBottomWidth={'thin'}
                borderColor={'whiteAlpha.500'}
                key={index}
                pt={'5'}
              >
                <div className="flex flex-col px-5 gap-4">
                  <div className="flex">
                    <Avatar src={thread.author.profile?.avatarUrl} />
                    <div>
                      <Text pl={5} textStyle={'lg'}>
                        {thread.author.fullname}
                      </Text>
                      <Text textStyle={'sm'} pl={5} color={'gray.400'}>
                        @{thread.author.username}
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text textStyle={'lg'} pl={5} color={'gray.400'}>
                      {thread.content}
                    </Text>
                    {thread.image && (
                      <div className="pt-3 pl-5 max-w-lg">
                        <img
                          src={thread.image}
                          alt=""
                          onClick={() =>
                            handleImageClick(thread.image || '', thread.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm pl-5">
                    <div className="flex items-center gap-1">
                      <ButtonLike
                        thread={thread}
                        onUpdate={handleUpdateThread}
                      />
                    </div>
                    <div>
                      <Button>
                        <Icon size={'lg'}>
                          <HiChat />
                        </Icon>
                        {thread._count.replies} Replies
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
            ))}
          </Tabs.Content>

          <Tabs.Content value="media" display={'flex'}>
            <SimpleGrid
              pt={4}
              px={4}
              columns={{ base: 2, md: 3, lg: 3 }}
              gap={3}
            >
              {threads.map((thread, index) => (
                <Box
                  key={index}
                  width="100%"
                  height="200px"
                  position="relative"
                  overflow="hidden"
                  mb={4}
                >
                  {thread.image && (
                    <Image
                      src={thread.image}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      objectPosition="center"
                      onClick={() =>
                        handleImageClick(thread.image || '', thread.id)
                      }
                    />
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </Tabs.Content>
        </Tabs.Root>
      </main>

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
    </Flex>
  );
};

export default TabsUserProfile;
