import * as z from 'zod';

// TODO refactor to use one schema between client and server
export const authSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter username.' })
    .max(30, { message: 'Username must be less than 30 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .max(30, { message: 'Password must be less than 30 characters' }),
});

export type AuthSchema = z.infer<typeof authSchema>;
