import React, { useEffect, useState } from 'react';
import { User } from '@/types/user.type';
import { getAllUsers } from '../features/dashboard/services/users.services';
import useFollowStore, {
  FollowedUser,
} from '@/components/StoreState/useFollowStore';
import FollowButton from '@/components/Button/FollowButton';
import { Link } from 'react-router-dom';
import { Avatar } from './ui/avatar';

const SearchFollowers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User[]>([]);
  const following = useFollowStore((state) => state.following);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) return;

      try {
        const users = await getAllUsers(token);
        if (Array.isArray(users)) {
          const usersWithFollowStatus = users.map((user) => ({
            ...user,
            isFollowing: following.some(
              (followedUser) => followedUser.id === user.id
            ),
          }));
          setUser(usersWithFollowStatus);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [following]);

  const filteredUsers = Array.isArray(user)
    ? user.filter(
        (u) =>
          (u.fullname &&
            u.fullname.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (u.username &&
            u.username.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleFollowSuccess = (
    userId: number,
    avatarUrl: string,
    username: string,
    fullname: string
  ) => {
    const followedUser: FollowedUser = {
      id: userId,
      avatarUrl,
      username,
      fullname,
    };
    useFollowStore.getState().followUser(followedUser);
  };

  const handleUnfollowSuccess = (
    userId: number,
    _avatarUrl: string,
    _username: string,
    _fullname: string
  ) => {
    useFollowStore.getState().unfollowUser(userId);
  };

  return (
    <div style={{ padding: '20px', width: 'full', margin: 'auto' }}>
      <h1>Search Followers</h1>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search your friend..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {searchQuery === '' ? (
          <p style={{ textAlign: 'center', color: '#888' }}>
            Start typing to search...
          </p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#ccc',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              >
                <Avatar
                  name={item.fullname}
                  src={item.avatarUrl || 'default-avatar-url'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Link to={`/profile/${item.id}`}>
                  <strong className="text-white">{item.fullname}</strong>
                  <p style={{ margin: 0, color: '#888' }}>@{item.username}</p>
                </Link>
              </div>
              <FollowButton
                userId={item.id}
                isFollowing={item.isFollowing}
                onFollowSuccess={() =>
                  handleFollowSuccess(
                    item.id,
                    item.avatarUrl || '',
                    item.username,
                    item.fullname
                  )
                }
                onUnfollowSuccess={() =>
                  handleUnfollowSuccess(
                    item.id,
                    item.avatarUrl || '',
                    item.username,
                    item.fullname
                  )
                }
                buttonStyles={{
                  height: '8',
                  maxWidth: '20',
                  justifyContent: 'center',
                  border: 'solid',
                  borderWidth: '1px',
                  padding: '5px 10px',
                  fontSize: 'sm',
                  borderRadius: 'full',
                }}
              />
            </li>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchFollowers;
