import { EditProfileProps } from '@/types/AuthTypes/LoginFromProps';
import { apiURL } from '@/utils/baseurl';
import axios, { AxiosResponse } from 'axios';

export const updateProfile = async (
  token: string,
  updatedData: EditProfileProps,
  avatarFile?: File,
  backgroundFile?: File
) => {
  try {
    const formData = new FormData();
    formData.append('fullname', updatedData.fullname);
    formData.append('username', updatedData.username);
    formData.append('bio', updatedData.bio);

    // Tambahkan avatar jika ada
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    if (backgroundFile) {
      formData.append('background', backgroundFile);
    }

    console.log('Form Data:', formData);

    const res: AxiosResponse = await axios.put(apiURL + 'profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Result:', res);
    console.log('API Response:', res.data);
    const data = res.data.data;
    const updatedUser = { ...data.updatedProfile, ...data.updatedUser };
    return updatedUser;
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
