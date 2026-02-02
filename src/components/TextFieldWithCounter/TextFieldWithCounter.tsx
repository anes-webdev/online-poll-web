import { useState } from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from '@mui/material';

export type TextFieldWithCounterProps = TextFieldProps & {
  maxLength: number;
};

const TextFieldWithCounter = (props: TextFieldWithCounterProps) => {
  const { value: propValue, onChange: propOnChange, maxLength, size } = props;
  const [value, setValue] = useState((propValue as string) || '');

  const handleChange = (e: any) => {
    const newValue = e.target.value;

    // prevent typing beyond maxLength
    if (newValue.length <= maxLength) {
      setValue(newValue);
      if (propOnChange) propOnChange(e);
    }
  };

  const counterClass = size === 'small' ? 'text-xs!' : 'text-sm!';

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      slotProps={{
        htmlInput: {
          maxLength,
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Typography className={counterClass} color="textMuted">
                {value.length}/{maxLength}
              </Typography>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default TextFieldWithCounter;
