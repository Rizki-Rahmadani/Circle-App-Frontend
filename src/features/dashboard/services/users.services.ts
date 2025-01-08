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
    const response: AxiosResponse = await axios.get(apiURL + '/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authentication
      },
    });

    console.log('API Response:', response.data); // Log the entire response

    // Adjust this line based on the actual structure of the response
    return response.data.users; // If the users are in response.data.users, change this to response.data.users
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const getUserById = async (id: number, token: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      apiURL + `/users/author/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('API Response:', response.data);

    // Check if users array exists and has at least one user
    if (response.data) {
      return response.data;
    } else {
      console.warn('No user found for the given ID');
      return null; // Return null if no user is found
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

export const updateUser = async (
  userId: number,
  userData: { username?: string; fullname?: string; email?: string }
) => {
  try {
    const response = await axios.put(apiURL + `users/${userId}`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`, // Jika menggunakan token untuk autentikasi
      },
    });
    return response.data;
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
