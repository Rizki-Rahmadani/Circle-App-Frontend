import { User } from '@/types/user.type';
import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const getCurrentUser = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('API Response:', res.data);

    return {
      ...res.data,
      _count: {
        following: res.data.followingCount || 0,
        followers: res.data.followerCount || 0,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getAllUsers = async (token: string): Promise<User[]> => {
  try {
    const response: AxiosResponse = await axios.get(apiURL + 'users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('API Response:', response.data);

    return response.data.users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};

export const getUserById = async (id: number, token: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      apiURL + `users/author/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('API Response:', response.data);

    if (response.data) {
      return response.data;
    } else {
      console.warn('No user found for the given ID');
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};
