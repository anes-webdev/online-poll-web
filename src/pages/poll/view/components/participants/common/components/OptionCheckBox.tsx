import { Checkbox } from '@mui/material';
import { useSelectOption } from '../hooks/useSelectOption';

type OptionCheckBoxProps = {
  optionId: number;
  disabled: boolean;
};

export const OptionCheckBox = ({ optionId, disabled }: OptionCheckBoxProps) => {
  const onSelectOption = useSelectOption();
  return (
    <div className="checkbox-container">
      <Checkbox
        value={optionId}
        disabled={disabled}
        onChange={onSelectOption}
      />
    </div>
  );
};
