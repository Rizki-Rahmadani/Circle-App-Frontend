import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export async function toggleLike(threadId: number) {
  const token = localStorage.getItem('auth-token');

  try {
    const response: AxiosResponse = await axios.post(
      apiURL + 'thread/like',
      { threadId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
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
}

export async function getLikeStatus(threadId: number) {
  const token = localStorage.getItem('auth-token');

  try {
    const response: AxiosResponse = await axios.get(
      apiURL + `thread/like/status/${threadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.isLiked;
  } catch (error) {
    console.error('Error fetching like status:', error);
    throw error;
  }
}

export async function toggleLikeReply(replyId: number) {
  try {
    const response: AxiosResponse = await axios.post(
      apiURL + 'thread/like/reply',
      { replyId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Mengembalikan status like terbaru jika berhasil
    if (response.status === 200) {
      const { message, likeCount, isLiked } = response.data;
      console.log(message);
      return { likeCount, isLiked };
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
}
