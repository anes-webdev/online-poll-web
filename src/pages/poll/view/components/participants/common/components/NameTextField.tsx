import { Controller, useFormContext } from 'react-hook-form';
import TextFieldWithCounter from '../../../../../../../components/TextFieldWithCounter/TextFieldWithCounter';
import { POLL_OPTION_MAX_LENGTH } from '../../../../../../../constants/poll';
import type { RegisterVoteData } from '../../../../../../../schemas/pollSchema';

type NameTextFieldProps = {
  disabled: boolean;
  className: string;
};

export const NameTextField = (props: NameTextFieldProps) => {
  const { disabled, className } = props;
  const { formState, control } = useFormContext<RegisterVoteData>();
  const { errors } = formState;
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <TextFieldWithCounter
          {...field}
          required
          maxLength={POLL_OPTION_MAX_LENGTH}
          disabled={disabled}
          error={!!errors.name}
          className={className}
          label="Name"
          variant="outlined"
          size="small"
        />
      )}
    />
  );
};
