import { z } from 'zod';

export const createTournamentSchema = z
  .object({
    name: z.string().min(3, {
      message: 'Tournament name must be at least 3 characters long.',
    }),
    location: z
      .string({ message: 'Please enter a valid Google Maps URL.' })
      .min(5, { message: 'Please enter a valid Google Maps URL.' }),
    time: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
      message: 'Please enter a valid date and time.',
    }),
    maxParticipants: z
      .number()
      .int()
      .max(128)
      .positive({ message: 'Maximum participants must be a positive number.' }),
    deadline: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
      message: 'Please enter a valid registration deadline.',
    }),
    sponsorLogos: z.string().optional(),
  })
  .refine((data) => new Date(data.time) > new Date(data.deadline), {
    message: 'Tournament date must be after the registration deadline.',
    path: ['time'],
  });

export type TournamentFormData = z.infer<typeof createTournamentSchema>;
