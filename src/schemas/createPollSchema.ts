import { z } from 'zod';

// Todo: update these error messages:
const TITLE_LENGTH_ERROR_MESSAGE = 'Title length should be between 3 and 20';
const DESCRIPTION_LENGTH_ERROR_MESSAGE =
  'Description length should be between 5 and 255';

export const createPollSchema = z.object({
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
  options: z
    .array(
      z.object({
        optionName: z.string(),
      }),
    )
    .min(2, 'At least two options are needed'),
});

export type CreatePollData = z.infer<typeof createPollSchema>;
