import TableFooter from './components/TableFooter';
import { type RegisterVoteData } from '../../../../../../schemas/pollSchema';
import { memo } from 'react';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';

type ParticipantTableProps = {
  onSubmit: (formData: RegisterVoteData) => Promise<void>;
  onSubmitError: (errors: any) => void;
};

export const ParticipantTable = (props: ParticipantTableProps) => {
  const { onSubmit, onSubmitError } = props;

  return (
    <table className="mx-auto">
      <TableHead />
      <TableBody />
      <TableFooter onSubmit={onSubmit} onSubmitError={onSubmitError} />
    </table>
  );
};

export const MemoizedParticipantTable = memo(ParticipantTable);
