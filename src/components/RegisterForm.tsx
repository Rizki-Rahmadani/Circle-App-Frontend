import { Button, Input, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema } from './Schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormProps } from '@/types/AuthTypes/LoginFromProps';
import { registerUser } from '@/features/auth/services/auth-service';
import Swal from 'sweetalert2';

type Logo = {
  logo: string;
};

const RegisterForm: React.FC<Logo> = ({ logo }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormProps> = (data) => {
    registerUser(data)
      .then((res) => {
        console.log(res);

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
          title: 'Registered successfully',
        });

        navigate('/login');
      })
      .catch((err) => {
        console.error(err);

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
          title:
            err?.response?.data?.message ||
            'Registration failed. Please try again.',
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="">
        <h1 className="text-green-500 text-4xl font-bold">{logo}</h1>
        <h1>Create accout Circle</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <Stack gap="4" width={300}>
            <Input
              {...register('username')}
              placeholder="Username"
              variant="subtle"
            />
            {errors.username && <p>{errors.username.message}</p>}
            <Input
              {...register('email')}
              placeholder="Email"
              variant="subtle"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              {...register('password')}
              placeholder="Password"
              variant="subtle"
              type="password"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Button type="submit" className="bg-green-500" rounded={20}>
              Create
            </Button>
          </Stack>
          <p className="text-sm">
            Already have account?
            <Link to="/login" className="text-green-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
