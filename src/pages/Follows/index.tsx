import { useEffect, useState } from 'react';
import { Flex, Image, Tabs, Text } from '@chakra-ui/react';
import {
  getFollowedUsers,
  getFollowers,
} from '@/features/dashboard/services/follow.services';
import FollowButton from '@/components/Button/FollowButton';
import useFollowStore, {
  FollowedUser,
} from '@/components/StoreState/useFollowStore';

function Follows() {
  const { following, followUser, unfollowUser } = useFollowStore();
  const [followers, setFollowers] = useState<FollowedUser[]>([]);

  useEffect(() => {
    const fetchFollowData = async () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        try {
          const { resetFollow } = useFollowStore.getState();
          resetFollow();

          const followed: FollowedUser[] = await getFollowedUsers(token);
          const followerList: FollowedUser[] = await getFollowers(token);

          followed.forEach((user: FollowedUser) => followUser(user));
          setFollowers(followerList);
        } catch (error) {
          console.error('Error fetching follow data:', error);
        }
      }
    };

    console.log('Data Following:', following);

    fetchFollowData();
  }, [followUser]);

  const handleFollowSuccess = (userId: number) => {
    const user = followers.find((u) => u.id === userId);
    if (user) followUser(user);
  };

  const handleUnfollowSuccess = (userId: number) => {
    unfollowUser(userId);
  };

  const buttonStyles = {
    height: '6',
    maxWidth: '16',
    justifyContent: 'center',
    border: 'solid',
    borderWidth: '1px',
    padding: '5px 10px',
    fontSize: 'xs',
  };

  return (
    <Flex justify={'space-between'}>
      <main className="w-full h-screen border-x border-neutral-500">
        <Tabs.Root defaultValue="follow">
          <div className="px-5 mt-6">
            <h1 className="text-4xl font-bold pb-5">Follows</h1>
          </div>
          <Tabs.List>
            <Tabs.Trigger value="follow" w={'1/2'} justifyContent={'center'}>
              Following
            </Tabs.Trigger>
            <Tabs.Trigger value="Followers" w={'1/2'} justifyContent={'center'}>
              Followers
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="follow">
            <ul>
              {following.map((user: FollowedUser) => (
                <div className="flex items-start" key={user.id}>
                  <li className="py-5 w-full">
                    <div className="flex px-5 w-full">
                      <Image
                        borderWidth={2}
                        borderColor={'whitekAlpha.100'}
                        src={
                          user.avatarUrl ||
                          `https://ui-avatars.com/api/?name=${user.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
                        }
                        boxSize={'40px'}
                        borderRadius="full"
                        fit="cover"
                      />
                      <div className="pl-5 w-full">
                        <Text textStyle="sm">{user.fullname}</Text>
                        <Text textStyle="xs" color="gray.400">
                          {user.username}
                        </Text>
                      </div>
                      <div className="flex justify-end w-24">
                        <FollowButton
                          userId={user.id}
                          isFollowing={true}
                          onFollowSuccess={handleFollowSuccess}
                          onUnfollowSuccess={handleUnfollowSuccess}
                          buttonStyles={buttonStyles}
                        />
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </Tabs.Content>

          <Tabs.Content value="Followers">
            <ul>
              {followers.map((user: FollowedUser) => {
                const isFollowing = following.some(
                  (followedUser) => followedUser.id === user.id
                );
                return (
                  <div className="flex items-start" key={user.id}>
                    <li className="py-5 w-full">
                      <div className="flex px-5 w-full">
                        <Image
                          borderWidth={2}
                          borderColor={'whitekAlpha.100'}
                          src={
                            user.avatarUrl ||
                            `https://ui-avatars.com/api/?name=${user.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
                          }
                          boxSize={'40px'}
                          borderRadius="full"
                          fit="cover"
                        />
                        <div className="pl-5 w-full">
                          <Text textStyle="sm">{user.fullname}</Text>
                          <Text textStyle="xs" color="gray.400">
                            {user.username}
                          </Text>
                        </div>
                        <div className="flex justify-end w-24">
                          <FollowButton
                            userId={user.id}
                            isFollowing={isFollowing}
                            onFollowSuccess={handleFollowSuccess}
                            onUnfollowSuccess={handleUnfollowSuccess}
                            buttonStyles={buttonStyles}
                          />
                        </div>
                      </div>
                    </li>
                  </div>
                );
              })}
            </ul>
          </Tabs.Content>
        </Tabs.Root>
      </main>
    </Flex>
  );
}

export default Follows;
