import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const getThreadByUser = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'thread/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('result', res.data);
    return res.data;
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
