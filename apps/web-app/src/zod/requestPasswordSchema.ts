import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export type RequestPasswordFormInputs = z.infer<
  typeof requestPasswordResetSchema
>;
