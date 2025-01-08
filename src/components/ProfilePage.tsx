import { Box, Button, Image, Text } from '@chakra-ui/react';

import EditProfile from './EditProfile';
import useUserStore from './StoreState/userStore';
import useFollowStore from './StoreState/useFollowStore';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const following = useFollowStore((state) => state.following); // Get following users from the follow store

  const followingCount = following.length; // Get the count of following

  return (
    <div className="px-5 mt-6  ">
      <Box position={'relative'}>
        <Text textStyle={'3xl'} fontWeight={'bold'} pb={5}>
          ⁖{user?.fullname}
        </Text>
        <Image
          width={'5xl'}
          maxHeight={'36'}
          rounded={'md'}
          src="https://th.bing.com/th/id/R.477f155981dd60768f60ea6f96449b97?rik=YdTS%2f68zhyK6ww&riu=http%3a%2f%2fpapers.co%2fwallpaper%2fpapers.co-sm60-cool-pastel-blur-gradation-green-25-wallpaper.jpg&ehk=RIbtW5PPA10yMRKZ%2flnZGPXJ2xY1pSoqpz3ZOduqDE8%3d&risl=&pid=ImgRaw&r=0"
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
          h={10}
          mt={2}
          mr={6}
          border={'solid'}
          borderWidth={'1px'}
          px={3}
          fontSize={'sm'}
          borderRadius={'full'}
        >
          <EditProfile />
        </Button>
      </div>

      <Text textStyle={'2xl'} fontWeight={'bold'}>
        ⁖ {user?.fullname}
      </Text>
      <Text textStyle={'lg'} color={'whiteAlpha.600'}>
        @{user?.username}
      </Text>
      <Text textStyle={'lg'}>{user?.bio}</Text>
      <div className="flex gap-5">
        <div className="flex gap-2">
          <Text textStyle="lg" fontWeight="medium" letterSpacing="tight">
            {followingCount}
          </Text>
          <Text
            textStyle="lg"
            fontWeight="medium"
            letterSpacing="tight"
            color={'whiteAlpha.900'}
          >
            Following
          </Text>
        </div>
        <div className="flex gap-2">
          <Text textStyle="lg" fontWeight="medium" letterSpacing="tight">
            {user?.followersCount || 0}
          </Text>
          <Text
            textStyle="lg"
            fontWeight="medium"
            letterSpacing="tight"
            color={'whiteAlpha.900'}
          >
            Followers
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
