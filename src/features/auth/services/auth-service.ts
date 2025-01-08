import {
  LoginFormProps,
  RegisterFormProps,
} from '@/types/AuthTypes/LoginFromProps';
import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const fetchLogin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(apiURL + 'auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

export const registerUser = async (data: RegisterFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(
      apiURL + 'auth/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log('result', res);
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
