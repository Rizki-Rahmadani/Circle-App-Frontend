import { Box, Button, Image, Text, Spinner, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById } from '@/features/dashboard/services/users.services';
import { UserType } from '@/types/threads.type';
import { HiArrowLeft } from 'react-icons/hi';

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
        <Text
          display={'flex'}
          alignItems="center"
          textStyle="3xl"
          fontWeight="bold"
          pb={5}
          gap={4}
        >
          <Link to={'/home'}>
            <Icon size={'2xl'}>
              <HiArrowLeft />
            </Icon>
          </Link>
          ⁖ {user?.fullname || 'Unknown User'}
        </Text>
        <Image
          width="full"
          maxHeight="36"
          rounded="md"
          src={
            user?.profile?.backgroundUrl ||
            'https://p4.wallpaperbetter.com/wallpaper/324/576/1010/green-emerald-blue-gradation-wallpaper-preview.jpg'
          }
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
