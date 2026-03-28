import Checkbox from '@mui/material/Checkbox';
import { Button, Tooltip } from '@mui/material';
import type { Option, Poll } from '../../../../../../../api/polls/polls.types';
import { InfoMessage } from '../../../../../../../components/InfoMessage/InfoMessage';
import { NameTextField } from '../../common/components/NameTextField';
import '../styles.css';
import { useSelectOption } from '../../common/hooks/useSelectOption';
import { ALREADY_VOTED_MESSAGE } from '../../common/constants/infoMessages';
import type { RegisterVoteData } from '../../../../../../../schemas/pollSchema';
import { useRegisterVoteForm } from '../../common/hooks/useRegisterVoteForm';
import { FormProvider } from 'react-hook-form';

type CheckBoxProps = {
  option: Option;
  disabled: boolean;
};

const CheckBoxCell = ({ option, disabled }: CheckBoxProps) => {
  const onSelectOption = useSelectOption();
  const { id, optionName } = option;
  return (
    <td className="text-center">
      <div className="poll-table-cell py-0 px-0 bg-gray-100">
        <Tooltip title={optionName} placement="top">
          <Checkbox onChange={onSelectOption} value={id} disabled={disabled} />
        </Tooltip>
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
  disabled: boolean;
};

const SelectionRow = ({ options, disabled }: SelectionRowProps) => {
  return (
    <>
      {options.map((option) => {
        return (
          <CheckBoxCell key={option.id} option={option} disabled={disabled} />
        );
      })}
    </>
  );
};

type TableFooterProps = {
  poll: Poll;
  submitLoading: boolean;
  onSubmit: (formData: RegisterVoteData) => Promise<void>;
  onSubmitError: (errors: any) => void;
  disabled: boolean;
};

const TableFooter = ({
  poll,
  submitLoading,
  onSubmit,
  onSubmitError,
  disabled,
}: TableFooterProps) => {
  const methods = useRegisterVoteForm();
  const { handleSubmit } = methods;
  return (
    <tfoot>
      <tr>
        <td>
          {disabled && (
            <InfoMessage className="my-1" text={ALREADY_VOTED_MESSAGE} />
          )}
        </td>
      </tr>
      <tr>
        <FormProvider {...methods}>
          <td>
            <div className="poll-table-cell px-0 py-1">
              <NameTextField className="w-full" disabled={disabled} />
            </div>
          </td>
          <SelectionRow disabled={disabled} options={poll.options} />
        </FormProvider>
      </tr>
      <tr>
        <td>
          <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
            <Button
              disabled={disabled}
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
