import { Box, Button, Card, Image, Flex } from '@chakra-ui/react';
import EditProfile from './EditProfile';
import useUserStore from './StoreState/userStore';
import { useEffect } from 'react';
import { getCurrentUser } from '@/features/dashboard/services/users.services';
import useFollowStore, { FollowedUser } from './StoreState/useFollowStore';

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const token = localStorage.getItem('auth-token');
  const following = useFollowStore((state) => state.following);

  const followingCount = following.length;

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);

          // Tambahkan data followers ke store
          if (userData.followers) {
            userData.followers.forEach((follower: FollowedUser) =>
              useFollowStore.getState().addFollower(follower)
            );
          }

          // Tambahkan data following ke store jika diperlukan
          if (userData.following) {
            userData.following.forEach((followed: FollowedUser) =>
              useFollowStore.getState().followUser(followed)
            );
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [token, setUser]);

  return (
    <Card.Root maxW="sm" maxH="xs" mt={10} px={5}>
      <Box position={'relative'}>
        <Card.Title py={2}>My Profile </Card.Title>
        <Image
          width={'sm'}
          maxHeight={100}
          rounded={'md'}
          src={
            user?.backgroundUrl ||
            'https://p4.wallpaperbetter.com/wallpaper/324/576/1010/green-emerald-blue-gradation-wallpaper-preview.jpg'
          }
        />
        <Image
          borderWidth={3}
          borderColor={'blackAlpha.600'}
          src={
            user?.avatarUrl ||
            `https://ui-avatars.com/api/?name=${user?.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
          }
          boxSize={'60px'}
          borderRadius="full"
          fit="cover"
          position={'absolute'}
          bottom={-8}
          left={5}
        />
      </Box>
      <div className="flex justify-end">
        <Button
          h={6}
          mt={2}
          border={'solid'}
          borderWidth={'1px'}
          p={3}
          fontSize={'xs'}
          borderRadius={'full'}
        >
          <EditProfile />
        </Button>
      </div>

      <Box py={2}>
        <Card.Title>⁖ {user?.fullname}</Card.Title>
        <Card.Description>@{user?.username}</Card.Description>
        <Card.Description>{user?.bio}</Card.Description>
        <Flex align="center" spaceX="2">
          <Box>
            <Card.Description>{followingCount} Following</Card.Description>
          </Box>
          <Box>
            <Card.Description>
              {user?.followersCount} Followers
            </Card.Description>
          </Box>
        </Flex>
      </Box>
    </Card.Root>
  );
};

export default Profile;
