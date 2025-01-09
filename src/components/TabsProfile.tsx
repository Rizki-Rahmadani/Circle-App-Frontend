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
import { useEffect, useState } from 'react';
import { ThreadType } from '@/types/threads.type';
import { getThreadByUser } from '@/features/dashboard/services/myThread.services';
import ImageDialog from './ImageDialog';
import ButtonLike from './Button/ButtonLike';
import useThreadStore from './StoreState/useThreadStore';
import ThreadOptions from './ThreadOptions';
import { deleteThread } from '@/features/dashboard/services/thread.services';
import useUserStore from './StoreState/userStore';

const TabsProfile = () => {
  const currentUser = useUserStore((state) => state.user);
  const user = useUserStore((state) => state.user);
  const { threads, setThreads, fetchThreads, updatedThread } = useThreadStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [currentThreadId, setCurrentThreadId] = useState<number | null>(null);

  useEffect(() => {
    retrieveAllThreads();
  }, [fetchThreads]);

  const retrieveAllThreads = async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    try {
      const threads = await getThreadByUser(token);
      setThreads(threads);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  const handleImageClick = (image: string, threadId: number) => {
    setImageUrl(image);
    setCurrentThreadId(threadId);
    setIsDialogOpen(true);
  };

  const handleThreadDeleted = (threadId: number) => {
    deleteThread(threadId);
  };

  const handleThreadUpdated = (threadId: number, newContent: string) => {
    updatedThread(threadId, newContent);
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
      <main className="w-full h-full border-neutral-500">
        <Tabs.Root defaultValue={'all-post'}>
          <Tabs.List>
            <Tabs.Trigger
              value="all-post"
              w={'1/2'}
              justifyContent={'center'}
              color={'white'}
            >
              All Post
            </Tabs.Trigger>
            <Tabs.Trigger
              value="media"
              w={'1/2'}
              justifyContent={'center'}
              color={'white'}
            >
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
                    <Image
                      borderWidth={3}
                      borderColor={'blackAlpha.600'}
                      src={
                        user?.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${thread.author?.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
                      }
                      boxSize={'50px'}
                      borderRadius="full"
                      fit="cover"
                    />
                    <Flex justifyContent="space-between" w="full">
                      <div>
                        <Text pl={5} textStyle={'lg'} color={'white'}>
                          {thread.author.fullname}
                        </Text>
                        <Text textStyle={'sm'} pl={5} color={'gray.400'}>
                          @{thread.author.username}
                        </Text>
                      </div>
                      <Box>
                        {currentUser?.id === thread.authorId && (
                          <div>
                            <ThreadOptions
                              threadId={thread.id}
                              authorId={thread.authorId}
                              currentUserId={currentUser?.id || 0}
                              content={thread.content}
                              onThreadDeleted={() =>
                                handleThreadDeleted(thread.id)
                              }
                              onThreadUpdated={(newContent) =>
                                handleThreadUpdated(thread.id, newContent)
                              }
                            />
                          </div>
                        )}
                      </Box>
                    </Flex>
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
                      <Button color={'white'}>
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

export default TabsProfile;
