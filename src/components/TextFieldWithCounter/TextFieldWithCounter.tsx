import TextField, { type TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from '@mui/material';

export type TextFieldWithCounterProps = TextFieldProps & {
  maxLength: number;
};

const TextFieldWithCounter = (props: TextFieldWithCounterProps) => {
  const { value, onChange, maxLength, size } = props;

  const counterClass = size === 'small' ? 'text-xs!' : 'text-sm!';

  return (
    <TextField
      {...props}
      value={value}
      onChange={onChange}
      slotProps={{
        htmlInput: {
          maxLength,
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Typography className={counterClass} color="textMuted">
                {((value as string) || '').length}/{maxLength}
              </Typography>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default TextFieldWithCounter;
