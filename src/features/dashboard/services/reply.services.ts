import { apiURL } from '@/utils/baseurl';
import axios from 'axios';

export const getAllReplyThreadById = async (
  token: string,
  threadId: number
) => {
  try {
    const res = await axios.get(apiURL + `thread/reply/${threadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('result', res.data.replies);
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

export const createReply = async (
  threadId: string,
  comment: string,
  imageFile?: File
) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const formData = new FormData();
  formData.append('comment', comment);

  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const response = await axios.post(
      apiURL + `thread/reply/${threadId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
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

export const deleteReply = async (replyId: number): Promise<void> => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    await axios.delete(apiURL + `thread/reply/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Failed to delete reply'
      );
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};
