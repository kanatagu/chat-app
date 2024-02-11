import * as z from 'zod';

export const profileSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter username.' })
    .max(30, { message: 'Username must be less than 30 characters' }),
  image_icon: z.string().nullable(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
