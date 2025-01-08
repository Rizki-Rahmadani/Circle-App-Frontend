import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username harus terdiri dari minial 3 karakter' })
    .max(20, { message: 'Username tidak boleh lebih dari 20 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z
    .string()
    .min(6, { message: 'Password harus terdiri dari minimal 6 karakter' })
    .max(20, { message: 'Password tidak boleh lebih dari 20 karakter' }),
});
