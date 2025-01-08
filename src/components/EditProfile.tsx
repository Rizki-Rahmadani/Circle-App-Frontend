import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  Stack,
  Textarea,
  Flex,
  Portal,
} from '@chakra-ui/react';
import { HiMiniPhoto } from 'react-icons/hi2';
import Swal from 'sweetalert2';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUserStore from './StoreState/userStore';
import { EditProfileProps } from '@/types/AuthTypes/LoginFromProps';
import { updateProfile } from '@/features/dashboard/services/profile.services';

const EditProfileDialog: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog open state
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const { register, handleSubmit, reset } = useForm<EditProfileProps>();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        fullname: user.fullname || '',
        bio: user.bio || '',
      });
    }
  }, [user, reset]);

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAvatarFile(file);
    }
  };

  // Handle background file selection
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setBackgroundFile(file);
    }
  };

  // Form submit handler
  const onSubmit: SubmitHandler<EditProfileProps> = async (data) => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('User is not authenticated');

      // Tampilkan dialog loading
      Swal.fire({
        title: 'Uploading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Panggil API untuk memperbarui profil dengan avatar dan background
      const updatedUser = await updateProfile(
        token,
        data,
        avatarFile || undefined,
        backgroundFile || undefined
      );

      setUser(updatedUser);

      // Tampilkan notifikasi dengan Swal
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your profile has been updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Close the dialog after success
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update profile!',
      });
    }
  };

  return (
    <>
      {isDialogOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="blackAlpha.600"
          zIndex={5}
          onClick={() => setIsDialogOpen(false)} // Close when clicked outside
        />
      )}

      {isDialogOpen && (
        <Portal>
          <Box
            position="fixed"
            top="30%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="black"
            p={5}
            borderRadius="md"
            boxShadow="md"
            width="100%"
            height="100%"
            maxHeight="450px"
            maxWidth="500px"
            zIndex={5}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                {/* Background Image */}
                <Box position="relative" mb={4}>
                  <Image
                    width={'lg'}
                    height={100}
                    objectFit="cover"
                    rounded={'md'}
                    src={
                      backgroundFile
                        ? URL.createObjectURL(backgroundFile)
                        : user?.backgroundUrl ||
                          'https://p4.wallpaperbetter.com/wallpaper/324/576/1010/green-emerald-blue-gradation-wallpaper-preview.jpg'
                    }
                    alt="Background"
                  />
                  <Button
                    position="absolute"
                    top={5}
                    right={200}
                    size={'2xl'}
                    color="white"
                    onClick={() => {
                      const fileInput = document.getElementById(
                        'background-upload'
                      ) as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    <HiMiniPhoto />
                  </Button>
                  <input
                    type="file"
                    id="background-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleBackgroundChange}
                  />

                  {/* Avatar Image */}
                  <Image
                    src={
                      avatarFile
                        ? URL.createObjectURL(avatarFile)
                        : user?.avatarUrl || 'https://via.placeholder.com/150'
                    }
                    boxSize="80px"
                    borderRadius="full"
                    borderWidth={2}
                    borderColor="gray.500"
                    alt="Avatar"
                    position="absolute"
                    top={16}
                    left={5}
                  />
                  <Button
                    position="absolute"
                    top={20}
                    left={10}
                    color="white"
                    onClick={() => {
                      const fileInput = document.getElementById(
                        'avatar-upload'
                      ) as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    <HiMiniPhoto />
                  </Button>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </Box>

                {/* Form Fields */}
                <Flex direction="column" gap={3} mt="10">
                  <Input
                    {...register('username', {
                      required: 'Username is required',
                    })}
                    placeholder="Username"
                    bg="gray.800"
                    borderColor="green.500"
                    _hover={{ borderColor: 'green.500' }}
                  />
                  <Input
                    {...register('fullname')}
                    placeholder="Full Name"
                    bg="gray.800"
                    borderColor="green.500"
                    _hover={{ borderColor: 'green.500' }}
                  />
                  <Textarea
                    {...register('bio')}
                    placeholder="Bio"
                    bg="gray.800"
                    borderColor="green.500"
                    _hover={{ borderColor: 'green.500' }}
                  />
                </Flex>
              </Stack>

              <Flex justify="space-between" mt="10">
                <Button
                  variant="outline"
                  p="5"
                  bg="red.500"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="outline" p="5" bg="green.500" type="submit">
                  Save
                </Button>
              </Flex>
            </form>
          </Box>
        </Portal>
      )}

      {/* Button to trigger the dialog */}
      <Button onClick={() => setIsDialogOpen(true)} variant="outline">
        Edit Profile
      </Button>
    </>
  );
};

export default EditProfileDialog;
