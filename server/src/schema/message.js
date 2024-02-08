const z = require('zod');

const messageSchema = z.object({
  message: z
    .string()
    .min(1, { message: 'Please enter a message.' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

module.exports = {
  messageSchema,
}
