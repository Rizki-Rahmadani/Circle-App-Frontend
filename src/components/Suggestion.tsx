import { Button, Card, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getSuggestedUsers } from '@/features/dashboard/services/suggest.services';
import useFollowStore from '@/components/StoreState/useFollowStore';
import { toggleFollow } from '@/features/dashboard/services/follow.services';
import { useNavigate } from 'react-router-dom';

interface SuggestedUser {
  id: number;
  fullname: string;
  profile: {
    avatarUrl: string;
  };
  username: string;
  followersCount: number;
}

const Suggested = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  const following = useFollowStore((state) => state.following);
  const followUser = useFollowStore((state) => state.followUser);
  const [listSuggestion, setListSuggestion] = useState<SuggestedUser[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<SuggestedUser[]>([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        if (token) {
          const users = await getSuggestedUsers(token);
          const filteredUsers = users.filter(
            (user: SuggestedUser) =>
              !following.some((followedUser) => followedUser.id === user.id)
          );
          setListSuggestion(filteredUsers);
          setDisplayedUsers(filteredUsers.slice(0, 4));
        } else {
          console.error('No authentication token found');
        }
      } catch (error) {
        console.error('Failed to fetch suggested users:', error);
      }
    };

    fetchSuggestedUsers();
  }, [token, following]);

  const handleFollow = async (user: SuggestedUser) => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      await toggleFollow(user.id, token);
      followUser({
        id: user.id,
        avatarUrl: user.profile?.avatarUrl,
        username: user.username,
        fullname: user.fullname,
      });

      setListSuggestion((prev) =>
        prev.filter((suggest) => suggest.id !== user.id)
      );

      if (listSuggestion.length > 0) {
        setDisplayedUsers((prev) => [...prev.slice(1), listSuggestion[0]]);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <Card.Root maxW="sm" maxH="xs" mt={5} py={5}>
      <Card.Title pl={5} fontWeight={'bolder'} color={'whiteAlpha.700'}>
        Suggested for you
      </Card.Title>
      <ul>
        {displayedUsers.map((suggest) => {
          return (
            <li key={suggest.id}>
              <div className="flex flex-row items-center m-5">
                <Image
                  borderWidth={2}
                  borderColor={'whitekAlpha.100'}
                  src={
                    suggest.profile?.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${suggest.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
                  }
                  boxSize={'40px'}
                  borderRadius="full"
                  fit="cover"
                />
                <div
                  className="px-5 w-52 mr-2 flex flex-col"
                  onClick={() => navigate(`/profile/${suggest.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Title textStyle={'sm'} color={'whiteAlpha.700'}>
                    {suggest.fullname}
                  </Card.Title>
                  <Card.Title textStyle={'xs'} color={'whiteAlpha.700'}>
                    @{suggest.username}
                  </Card.Title>
                </div>
                <div className="flex justify-end w-24">
                  <Button
                    h={'8'}
                    maxW={20}
                    justifyContent={'center'}
                    border={'solid'}
                    borderWidth={'1px'}
                    borderColor={'whiteAlpha.700'}
                    color={'white'}
                    px={3}
                    fontSize={'xs'}
                    borderRadius={'full'}
                    onClick={() => handleFollow(suggest)}
                  >
                    Follow
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card.Root>
  );
};

export default Suggested;
