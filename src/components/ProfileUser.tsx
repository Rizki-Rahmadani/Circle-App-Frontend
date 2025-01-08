import { Box, Button, Image, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '@/features/dashboard/services/users.services';
import { UserType } from '@/types/threads.type';

const ProfileUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem('auth-token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (id && token) {
        setLoading(true);
        try {
          const userData = await getUserById(parseInt(id), token);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [id, token]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!user) {
    return (
      <Box className="px-5 mt-6">
        <Text fontSize="xl" color="red.500">
          User not found. Please check the URL or go back to the homepage.
        </Text>
        <Button mt={4} onClick={() => navigate('/')}>
          Go to Homepage
        </Button>
      </Box>
    );
  }

  return (
    <Box className="px-5 mt-6">
      <Box position="relative">
        <Text textStyle="3xl" fontWeight="bold" pb={5}>
          ⁖ {user?.fullname || 'Unknown User'}
        </Text>
        <Image
          width="full"
          maxHeight="36"
          rounded="md"
          src="https://th.bing.com/th/id/R.477f155981dd60768f60ea6f96449b97?rik=YdTS%2f68zhyK6ww&riu=http%3a%2f%2fpapers.co%2fwallpaper%2fpapers.co-sm60-cool-pastel-blur-gradation-green-25-wallpaper.jpg&ehk=RIbtW5PPA10yMRKZ%2flnZGPXJ2xY1pSoqpz3ZOduqDE8%3d&risl=&pid=ImgRaw&r=0"
        />
        <Image
          borderWidth={3}
          borderColor={'blackAlpha.600'}
          src={
            user?.profile?.avatarUrl ||
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

      <Text textStyle="2xl" fontWeight="bold" mt="10">
        ⁖ {user?.fullname || 'Unknown User'}
      </Text>
      <Text textStyle="lg" color="whiteAlpha.600">
        @{user?.username || 'Unknown Username'}
      </Text>
      <Text textStyle="lg">{user?.profile?.bio || 'No Bio available'}</Text>
      <Box className="flex gap-5">
        <Box className="flex gap-2">
          <Text textStyle="lg" fontWeight="medium" letterSpacing="tight">
            {user?.followingCount || 0}
          </Text>
          <Text
            textStyle="lg"
            fontWeight="medium"
            letterSpacing="tight"
            color="whiteAlpha.600"
          >
            Following
          </Text>
        </Box>
        <Box className="flex gap-2">
          <Text textStyle="lg" fontWeight="medium" letterSpacing="tight">
            {user?.followersCount || 0}
          </Text>
          <Text
            textStyle="lg"
            fontWeight="medium"
            letterSpacing="tight"
            color="whiteAlpha.600"
          >
            Followers
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileUser;
