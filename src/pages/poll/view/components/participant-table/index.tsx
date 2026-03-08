import type { Poll } from '../../../../../api/polls/polls.types';
import { TableBody } from './components/TableBody';
import TableFooter from './components/TableFooter';
import { TableHead } from './components/TableHead';

type ParticipantTableProps = {
  poll: Poll;
  alreadyVoted: boolean;
  submitLoading: boolean;
  onSubmit: () => void;
};

export const ParticipantTable = (props: ParticipantTableProps) => {
  const { poll, alreadyVoted, submitLoading, onSubmit } = props;
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
      />
    </table>
  );
};
