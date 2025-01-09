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
          h={10}
          mt={2}
          mr={6}
          border={'solid'}
          borderWidth={'1px'}
          px={3}
          fontSize={'sm'}
          borderRadius={'full'}
          color={'white'}
        >
          <EditProfile />
        </Button>
      </div>

      <Text textStyle={'2xl'} fontWeight={'bold'} color={'white'}>
        ⁖ {user?.fullname}
      </Text>
      <Text textStyle={'lg'} color={'white'}>
        @{user?.username}
      </Text>
      <Text textStyle={'lg'} color={'white'}>
        {user?.bio}
      </Text>
      <div className="flex gap-5">
        <div className="flex gap-2">
          <Text
            textStyle="lg"
            fontWeight="medium"
            letterSpacing="tight"
            color={'white'}
          >
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
          <Text
            textStyle="lg"
            fontWeight="medium"
            letterSpacing="tight"
            color={'white'}
          >
            {user?.followersCount}
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
