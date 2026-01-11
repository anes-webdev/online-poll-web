import DeleteIcon from '@mui/icons-material/Delete';
import type { Option } from '..';
import { Typography } from '@mui/material';
import { palette } from '../../../../theme/palette';

type OptionProps = {
  optionName: string;
  deleteOption: (value: string) => void;
};

const Option = ({ deleteOption, optionName }: OptionProps) => {
  const onDeleteButtonClick = () => {
    deleteOption(optionName);
  };
  return (
    <li className="poll-option-container border-border-default">
      <Typography color="textSecondary" className="w-10/12">
        {optionName}
      </Typography>
      <button type="button" onClick={onDeleteButtonClick}>
        <DeleteIcon color="action" />
      </button>
    </li>
  );
};

type OptionListProps = {
  options: Option[];
  error: boolean;
  deleteOption: (value: string) => void;
};

const OptionList = ({ options, deleteOption, error }: OptionListProps) => {
  const optionList = options.map(({ optionName }, index) => {
    return (
      <Option key={index} deleteOption={deleteOption} optionName={optionName} />
    );
  });

  return (
    <div
      style={error ? { border: `1px solid ${palette.status.error}` } : {}}
      className="poll-options-list-container border-border-default"
    >
      {options.length === 0 && (
        <Typography
          color={error ? 'error' : 'textMuted'}
          className="text-center my-1!"
        >
          No option added!
        </Typography>
      )}
      <ul className="flex flex-col">{optionList}</ul>
    </div>
  );
};
export default OptionList;
