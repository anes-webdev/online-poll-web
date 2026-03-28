import type { Poll } from '../../../../../../api/polls/polls.types';
import TableFooter from './components/TableFooter';
import { type RegisterVoteData } from '../../../../../../schemas/pollSchema';
import { memo } from 'react';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';

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

  return (
    <table className="mx-auto">
      <TableHead options={options} />
      <TableBody options={options} participants={participants} />
      <TableFooter
        disabled={alreadyVoted}
        poll={poll}
        submitLoading={submitLoading}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
      />
    </table>
  );
};

export const MemoizedParticipantTable = memo(ParticipantTable);
