import axios from 'axios';
import { apiURL } from '@/utils/baseurl';

export const toggleFollow = async (followingId: number, token: string) => {
  try {
    const res = await axios.post(
      apiURL + '/users/follow', // Endpoint API
      { targetUserId: followingId }, // Body request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token autentikasi
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', res.data);
    return res.data; // Data dari response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};

export const getFollowedUsers = async (token: string) => {
  try {
    const res = await axios.get(apiURL + '/users/following', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching followed users:', error);
    throw error;
  }
};

export const getFollowers = async (token: string) => {
  try {
    const res = await axios.get(apiURL + '/users/followers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};
