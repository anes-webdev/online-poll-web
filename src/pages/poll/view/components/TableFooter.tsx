import Checkbox from '@mui/material/Checkbox';
import type { ChangeEvent } from 'react';
import type { Option, Poll } from '../../../../network/hooks/main/usePoll';
import { Button, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { RegisterVoteData } from '../../../../schemas/pollSchema';

// Todo: Try to write a wrapper for each cell with common styles:

type CheckBoxClickHandler = (isChecked: boolean, optionId: number) => void;

type CheckBoxProps = {
  onCheckBoxClick: CheckBoxClickHandler;
  option: Option;
};

const CheckBoxCell = ({ onCheckBoxClick, option }: CheckBoxProps) => {
  const onCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onCheckBoxClick(checked, +value);
  };
  return (
    <td className="text-center">
      <div className="poll-table-cell py-0 px-0 bg-gray-100">
        <Checkbox onChange={onCheckBoxChange} value={option.id} />
      </div>
    </td>
  );
};

type VoteNumbersRowProps = {
  options: Option[];
};

const VoteNumbersRow = ({ options }: VoteNumbersRowProps) => {
  return (
    <>
      {options.map(({ participants, id }) => {
        return (
          <td key={id} className="text-center">
            <div>{participants?.length || 0}</div>
          </td>
        );
      })}
    </>
  );
};

type SelectionRowProps = {
  options: Option[];
  onCheckBoxClick: CheckBoxClickHandler;
};

const SelectionRow = ({ options, onCheckBoxClick }: SelectionRowProps) => {
  return (
    <>
      {options.map((option) => {
        return (
          <CheckBoxCell
            key={option.id}
            option={option}
            onCheckBoxClick={onCheckBoxClick}
          />
        );
      })}
    </>
  );
};

type TableFooterProps = {
  poll: Poll;
  submitLoading: boolean;
  onSubmit: () => void;
  disabled: boolean;
};

const TableFooter = ({
  poll,
  submitLoading,
  onSubmit,
  disabled,
}: TableFooterProps) => {
  const { register, formState, setValue, watch } =
    useFormContext<RegisterVoteData>();
  const { errors } = formState;

  const onCheckBoxClick = (isChecked: boolean, optionId: number) => {
    const choices = [...watch('choices')];
    const updatedChoices = isChecked
      ? [...choices, optionId]
      : choices.filter((choiceId) => choiceId !== optionId);
    setValue('choices', updatedChoices);
  };

  return (
    <tfoot>
      <tr>
        <td>
          <div className="poll-table-cell px-0 py-1">
            <TextField
              disabled={disabled}
              {...register('name')}
              error={!!errors.name}
              className="w-full"
              label="Name"
              variant="outlined"
              size="small"
            />
          </div>
        </td>
        <SelectionRow
          options={poll.options}
          onCheckBoxClick={onCheckBoxClick}
        />
      </tr>

      <tr>
        <td>
          <form onSubmit={onSubmit}>
            <Button
              loading={submitLoading}
              type="submit"
              className="w-1/3 h-9"
              variant="contained"
            >
              Save
            </Button>
          </form>
        </td>
        <VoteNumbersRow options={poll.options} />
      </tr>
    </tfoot>
  );
};

export default TableFooter;
