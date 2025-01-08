import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const getAllThread = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'thread', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('result', res);
    return res.data.threads;
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

export const getThreadById = async (token: string, id: string) => {
  try {
    const res = await axios.get(apiURL + `thread/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('result', res);
    return res.data.thread;
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

export const createThread = async (content: string, imageFile?: File) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const formData = new FormData();
  formData.append('content', content);

  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const response = await axios.post(apiURL + 'thread', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Failed to create thread'
      );
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};

export const getAllThreadByAuthorId = async (
  token: string,
  authorId: number
) => {
  try {
    const res = await axios.get(apiURL + `thread/author/${authorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Fetching threads for authorId:', authorId);

    console.log('result', res);
    return res.data.threads;
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

export const deleteThread = async (threadId: number) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await axios.delete(apiURL + `thread/${threadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Failed to delete thread'
      );
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};

export const updateThread = async (
  threadId: number,
  content: string,
  imageFile?: File
) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const formData = new FormData();
  formData.append('content', content);

  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const response = await axios.put(apiURL + `thread/${threadId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating thread:', error);
    throw error;
  }
};
