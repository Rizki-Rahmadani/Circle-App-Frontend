import { Button, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/components/StoreState/userStore';
import { LoginFormProps } from '@/types/AuthTypes/LoginFromProps';
import { fetchLogin } from '@/features/auth/services/auth-service';
import Swal from 'sweetalert2';
import useLikeStore from '@/store/useLikeStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [logo] = useState<string>('circle');
  const { setUser } = useUserStore();
  const { initializeLikes } = useLikeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmit = async (data: LoginFormProps) => {
    try {
      const res = await fetchLogin(data);

      if (res.token) {
        const user = {
          id: res.user.id,
          email: res.user.email,
          username: res.user.username,
          fullname: res.user.fullname,
          bio: res.user.profile?.bio || '',
          avatarUrl: res.user.profile?.avatarUrl || '',
          isFollowing: false,
          followingCount: 0,
          followersCount: 0,
          _count: {
            following: 0,
            followers: 0,
          },
        };

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('auth-token', res.token);

        // Initialize likes from initial threads
        if (res.threads) {
          initializeLikes(res.threads);
        }

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        navigate('/');
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: 'Login Failed',
      });
    }
  };

  // Render komponen login
  return (
    <div className="flex flex-col pt-20 items-center py-10 bg-black w-full h-screen">
      <div>
        <h1 className="text-green-500 text-4xl font-bold">{logo}</h1>
        <h1 className="text-white">Login to Circle</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <Stack gap="4" width={300}>
            <Input
              {...register('username', { required: 'Username wajid diisi' })}
              placeholder="username"
              variant="subtle"
            />
            {errors.username && (
              <p className="text-red-500">*{errors.username.message}</p>
            )}
            <Input
              {...register('password', { required: 'Password wajib diisi' })}
              placeholder="Password"
              variant="subtle"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500">*{errors.password.message}</p>
            )}
            <Link
              to="/forgot-password"
              className="flex justify-end text-sm text-white"
            >
              Forgot password?
            </Link>
            <Button type="submit" className="bg-green-500" rounded={20}>
              Login
            </Button>
          </Stack>
          <p className="text-sm text-white">
            Don't have an account yet?
            <Link className="text-green-500" to="/register">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
