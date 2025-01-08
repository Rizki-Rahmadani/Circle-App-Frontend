import ProfileUser from '@/components/ProfileUser';
import TabsUserProfile from '@/components/TabsUserProfile';
import { Flex } from '@chakra-ui/react';

function UserProfile() {
  return (
    <Flex justify={'space-between'}>
      <main className="w-full h-full border-x border-y border-neutral-500">
        <ProfileUser />
        <TabsUserProfile />
      </main>
    </Flex>
  );
}

export default UserProfile;
