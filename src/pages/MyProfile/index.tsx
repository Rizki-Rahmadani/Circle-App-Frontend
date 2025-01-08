import ProfilePage from '@/components/ProfilePage';
import TabsProfile from '@/components/TabsProfile';
import { Flex } from '@chakra-ui/react';

function Profile() {
  return (
    <Flex justify={'space-between'}>
      <main className="w-full h-full border border-neutral-500">
        <ProfilePage />
        <TabsProfile />
      </main>
    </Flex>
  );
}

export default Profile;
