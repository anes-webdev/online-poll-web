import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
import { palette } from '../../../../styles/palette';
import '../styles.css';

type OptionProps = {
  name: string;
  disabled: boolean;
  deleteOption: (value: string) => void;
};

const Option = ({ deleteOption, name, disabled }: OptionProps) => {
  const onDeleteButtonClick = () => {
    deleteOption(name);
  };
  return (
    <li className="poll-option-container">
      <Typography color="textSecondary" className="w-10/12">
        {name}
      </Typography>
      <IconButton onClick={onDeleteButtonClick} disabled={disabled}>
        <DeleteIcon color="action" />
      </IconButton>
    </li>
  );
};

type OptionListProps = {
  options: { name: string }[];
  error: boolean;
  deleteOption: (value: string) => void;
  disabled: boolean;
};

const OptionList = ({
  options,
  deleteOption,
  error,
  disabled,
}: OptionListProps) => {
  const optionList = options.map(({ name }, index) => {
    return (
      <Option
        key={index}
        deleteOption={deleteOption}
        name={name}
        disabled={disabled}
      />
    );
  });

  return (
    <div
      style={error ? { border: `1px solid ${palette.status.error}` } : {}}
      className={`poll-options-list-container ${disabled ? 'opacity-60' : ''}`}
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
