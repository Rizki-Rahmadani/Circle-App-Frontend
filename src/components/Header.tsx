// Header.tsx
import { useState } from 'react';
import { Button, Image, Input } from '@chakra-ui/react';
import CreateThreadDialog from './CreateThreadDialog'; // Import the CreateThreadDialog component
import useUserStore from './StoreState/userStore';
import useThreadStore from './StoreState/useThreadStore';

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const addThread = useThreadStore((state) => state.addThread);

  return (
    <div className="px-5 mt-6">
      <h1 className="text-4xl font-bold pb-5">Feed</h1>
      <div className="flex gap-5 mb-5">
        <Image
          borderWidth={3}
          borderColor="blackAlpha.600"
          src={
            user?.avatarUrl ||
            `https://ui-avatars.com/api/?name=${user?.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
          }
          boxSize="50px"
          borderRadius="full"
          fit="cover"
        />
        <Input
          placeholder="What is happening?!"
          onClick={() => setIsDialogOpen(true)}
          // readOnly
          className="flex-1 text-left px-4"
          variant="outline"
        />
        <Button bg="green.500" p="5" borderRadius="full">
          Post
        </Button>
      </div>

      {/* Dialog Component */}
      <CreateThreadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)} // Close the dialog when triggered
        user={user}
        addThread={addThread}
      />
    </div>
  );
};

export default Header;
