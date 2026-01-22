import { z } from 'zod';

const TITLE_LENGTH_ERROR_MESSAGE =
  'Title must be between 3 and 20 characters long.';
const DESCRIPTION_LENGTH_ERROR_MESSAGE =
  'Description must be between 5 and 255 characters long.';

const pollSchemaCommonFields = {
  title: z
    .string()
    .nonempty('The field can not be empty')
    .min(3, TITLE_LENGTH_ERROR_MESSAGE)
    .max(20, TITLE_LENGTH_ERROR_MESSAGE),
  description: z
    .string()
    .nonempty('The field can not be empty')
    .min(5, DESCRIPTION_LENGTH_ERROR_MESSAGE)
    .max(255, DESCRIPTION_LENGTH_ERROR_MESSAGE),
};

const pollOptionsSchema = z.array(
  z.object({
    optionName: z.string(),
  }),
);

export const editPollSchema = z.object({
  ...pollSchemaCommonFields,
  options: pollOptionsSchema,
});

export const createPollSchema = z.object({
  ...pollSchemaCommonFields,
  options: pollOptionsSchema.min(2, 'At least two options are needed'),
});

export const registerVoteSchema = z.object({
  name: z
    .string()
    .max(20, 'Name field must be less than 20 characters long')
    .nonempty('The name field can not be empty'),
  choices: z.array(z.number()).min(0).nonempty('No option selected'),
});

export type CreatePollData = z.infer<typeof createPollSchema>;
export type RegisterVoteData = z.infer<typeof registerVoteSchema>;
