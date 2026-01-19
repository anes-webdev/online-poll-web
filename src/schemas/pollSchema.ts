import { z } from 'zod';

// Todo: update these error messages:
const TITLE_LENGTH_ERROR_MESSAGE = 'Title length should be between 3 and 20';
const DESCRIPTION_LENGTH_ERROR_MESSAGE =
  'Description length should be between 5 and 255';

const pollSchemaCommonFields = {
  title: z
    .string()
    .min(3, TITLE_LENGTH_ERROR_MESSAGE)
    .max(20, TITLE_LENGTH_ERROR_MESSAGE)
    .nonempty('Can not be empty'),
  description: z
    .string()
    .min(5, DESCRIPTION_LENGTH_ERROR_MESSAGE)
    .max(20, DESCRIPTION_LENGTH_ERROR_MESSAGE)
    .nonempty('Can not be empty'),
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
  name: z.string().max(20).nonempty('Can not be empty'),
  choices: z.array(z.number()).min(0).nonempty('No option selected'),
});

export type CreatePollData = z.infer<typeof createPollSchema>;
export type RegisterVoteData = z.infer<typeof registerVoteSchema>;
