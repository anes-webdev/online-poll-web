import Checkbox from '@mui/material/Checkbox';
import { Button, Tooltip } from '@mui/material';
import type { Option } from '../../../../../../../api/polls/polls.types';
import { InfoMessage } from '../../../../../../../components/InfoMessage/InfoMessage';
import { NameTextField } from '../../common/components/NameTextField';
import '../styles.css';
import { useSelectOption } from '../../common/hooks/useSelectOption';
import { ALREADY_VOTED_MESSAGE } from '../../common/constants/infoMessages';
import type { RegisterVoteData } from '../../../../../../../schemas/pollSchema';
import { useRegisterVoteForm } from '../../common/hooks/useRegisterVoteForm';
import { FormProvider } from 'react-hook-form';
import { useContext } from 'react';
import { PollViewContext } from '../../store/PollViewContext';

type CheckBoxProps = {
  option: Option;
  disabled: boolean;
};

const CheckBoxCell = ({ option, disabled }: CheckBoxProps) => {
  const onSelectOption = useSelectOption();
  const { id, name } = option;
  return (
    <td className="text-center">
      <div className="poll-table-cell py-0 px-0 bg-gray-100">
        <Tooltip title={name} placement="top">
          <Checkbox onChange={onSelectOption} value={id} disabled={disabled} />
        </Tooltip>
      </div>
    </td>
  );
};

const VoteNumbersRow = () => {
  const { poll } = useContext(PollViewContext);
  return (
    <>
      {poll!.options.map(({ participants, id }) => {
        return (
          <td key={id} className="text-center">
            <div>{participants?.length || 0}</div>
          </td>
        );
      })}
    </>
  );
};

const SelectionRow = () => {
  const { poll, alreadyVoted } = useContext(PollViewContext);
  return (
    <>
      {poll!.options.map((option) => {
        return (
          <CheckBoxCell
            key={option.id}
            option={option}
            disabled={alreadyVoted}
          />
        );
      })}
    </>
  );
};

type TableFooterProps = {
  onSubmit: (formData: RegisterVoteData) => Promise<void>;
  onSubmitError: (errors: any) => void;
};

const TableFooter = ({ onSubmit, onSubmitError }: TableFooterProps) => {
  const { submitLoading, alreadyVoted } = useContext(PollViewContext);
  const methods = useRegisterVoteForm();
  const { handleSubmit } = methods;

  return (
    <tfoot>
      <tr>
        <td>
          {alreadyVoted && (
            <InfoMessage className="my-1" text={ALREADY_VOTED_MESSAGE} />
          )}
        </td>
      </tr>
      <tr>
        <FormProvider {...methods}>
          <td>
            <div className="poll-table-cell px-0 py-1">
              <NameTextField className="w-full" disabled={alreadyVoted} />
            </div>
          </td>
          <SelectionRow />
        </FormProvider>
      </tr>
      <tr>
        <td>
          <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
            <Button
              disabled={alreadyVoted}
              loading={submitLoading}
              type="submit"
              className="w-1/3 h-9"
              variant="contained"
            >
              Save
            </Button>
          </form>
        </td>
        <VoteNumbersRow />
      </tr>
    </tfoot>
  );
};

export default TableFooter;
