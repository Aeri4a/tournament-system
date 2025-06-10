import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First name has to have at least 2 characters' }),
    lastName: z
      .string()
      .min(2, { message: 'Last name has to have at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    confirmPassword: z.string().min(4, {
      message: 'Confirm password must be at least 4 characters long',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;
