import * as z from 'zod';

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, { message: 'Please enter a message' })
    .max(1000, { message: 'Message must be less than 30 characters' }),
});

export type MessageSchemaType = z.infer<typeof messageSchema>;
