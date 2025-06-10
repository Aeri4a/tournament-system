import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    newPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    confirmNewPassword: z.string().min(4, {
      message: 'Confirm password must be at least 4 characters long',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  });

export type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;
