import { FormProvider } from 'react-hook-form';
import type { Poll } from '../../../../../../api/polls/polls.types';
import TableFooter from './components/TableFooter';
import { type RegisterVoteData } from '../../../../../../schemas/pollSchema';
import { memo } from 'react';
import { MemoizedTableHead } from './components/TableHead';
import { MemoizedTableBody } from './components/TableBody';
import { useRegisterVoteForm } from '../common/hooks/useRegisterVoteForm';

type ParticipantTableProps = {
  poll: Poll;
  alreadyVoted: boolean;
  submitLoading: boolean;
  onSubmit: (formData: RegisterVoteData) => Promise<void>;
  onSubmitError: (errors: any) => void;
};

export const ParticipantTable = (props: ParticipantTableProps) => {
  const { poll, alreadyVoted, onSubmit, onSubmitError, submitLoading } = props;
  const { options, participants } = poll;

  const methods = useRegisterVoteForm();
  const { handleSubmit } = methods;

  return (
    <table className="mx-auto">
      <MemoizedTableHead options={options} />
      <MemoizedTableBody options={options} participants={participants} />
      <FormProvider {...methods}>
        <TableFooter
          disabled={alreadyVoted}
          poll={poll}
          submitLoading={submitLoading}
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
        />
      </FormProvider>
    </table>
  );
};

export const MemoizedParticipantTable = memo(ParticipantTable);
