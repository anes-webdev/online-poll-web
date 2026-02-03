import { z } from 'zod';
import {
  POLL_DESCRIPTION_MAX_LENGTH,
  POLL_DESCRIPTION_MIN_LENGTH,
  POLL_OPTION_MAX_LENGTH,
  POLL_TITLE_MAX_LENGTH,
  POLL_TITLE_MIN_LENGTH,
} from '../constants/poll';

const TITLE_LENGTH_ERROR_MESSAGE = `Title must be between ${POLL_TITLE_MIN_LENGTH} and ${POLL_TITLE_MAX_LENGTH} characters long.`;
const DESCRIPTION_LENGTH_ERROR_MESSAGE = `Description must be between ${POLL_DESCRIPTION_MIN_LENGTH} and ${POLL_DESCRIPTION_MAX_LENGTH} characters long.`;
const NOT_EMPTY_ERROR_MESSAGE = 'The field can not be empty';

const pollSchemaCommonFields = {
  title: z
    .string()
    .nonempty(NOT_EMPTY_ERROR_MESSAGE)
    .min(POLL_TITLE_MIN_LENGTH, TITLE_LENGTH_ERROR_MESSAGE)
    .max(POLL_TITLE_MAX_LENGTH, TITLE_LENGTH_ERROR_MESSAGE),
  description: z
    .string()
    .nonempty(NOT_EMPTY_ERROR_MESSAGE)
    .min(POLL_DESCRIPTION_MIN_LENGTH, DESCRIPTION_LENGTH_ERROR_MESSAGE)
    .max(POLL_DESCRIPTION_MAX_LENGTH, DESCRIPTION_LENGTH_ERROR_MESSAGE),
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
    .nonempty('The name field can not be empty')
    .max(
      POLL_OPTION_MAX_LENGTH,
      `Name field must be less than ${POLL_OPTION_MAX_LENGTH} characters long`,
    ),
  choices: z.array(z.number()).min(0).nonempty('No option selected'),
});

export type CreatePollData = z.infer<typeof createPollSchema>;
export type RegisterVoteData = z.infer<typeof registerVoteSchema>;
