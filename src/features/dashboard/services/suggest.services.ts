import { apiURL } from '@/utils/baseurl';
import axios from 'axios';

export const getSuggestedUsers = async (token: string) => {
  try {
    const res = await axios.get(apiURL + 'users/suggested', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('result', res.data);
    return res.data.users;
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
