const z = require('zod');

const roomSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Please enter room name.' })
    .max(30, { message: 'Room name must be less than 30 characters' }),
  description: z
    .string()
    .max(100, { message: 'Description must be less than 100 characters' }),
});

module.exports = {
  roomSchema,
};
