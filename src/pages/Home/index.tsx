import { Flex } from '@chakra-ui/react';
import Post from '../../components/Post';
const Home: React.FC = () => {
  return (
    <Flex justify={'space-between'}>
      <main className="w-full h-full border-x border-neutral-500">
        <Post />
      </main>
    </Flex>
  );
};

export default Home;
