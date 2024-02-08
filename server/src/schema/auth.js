const z = require('zod');

const authSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter username.' })
    .max(30, { message: 'Username must be less than 30 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .max(30, { message: 'Password must be less than 30 characters' }),
});

module.exports = {
  authSchema,
};
