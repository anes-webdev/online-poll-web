import { FormProvider, useForm } from 'react-hook-form';
import type { Poll } from '../../../../../../api/polls/polls.types';
import TableFooter from './components/TableFooter';
import {
  registerVoteSchema,
  type RegisterVoteData,
} from '../../../../../../schemas/pollSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAlert } from '../../../../../../hooks/useAlert';
import { memo, useState } from 'react';
import { registerVote } from '../../../../../../api/polls/polls.api';
import { usePollLink } from '../../../../../../hooks/usePollLink';
import { useStoreVotes } from '../../../../../../hooks/useStoreVotes';
import { useParams } from 'react-router';
import { DEFAULT_ERROR } from '../../../../../../constants/errorMessages';
import { MemoizedTableHead } from './components/TableHead';
import { MemoizedTableBody } from './components/TableBody';

type ParticipantTableProps = {
  poll: Poll;
};

export const ParticipantTable = (props: ParticipantTableProps) => {
  const { poll } = props;
  const { options, participants } = poll;

  const alert = useAlert();
  const { showPollLink } = usePollLink();
  const { prevVotes, addVote } = useStoreVotes();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const alreadyVoted = prevVotes.includes(pollSlug);
  const [submitLoading, setSubmitLoading] = useState(false);

  const methods = useForm<RegisterVoteData>({
    resolver: zodResolver(registerVoteSchema),
    defaultValues: {
      name: '',
      choices: [],
    },
  });

  const { handleSubmit } = methods;

  const checkNameUniqueness = (name: string) => {
    return {
      isUnique: !poll?.participants.some(
        ({ name: participantName }) =>
          participantName.toLowerCase() === name.toLowerCase(),
      ),
    };
  };

  const onSaveButtonClick = async (formData: RegisterVoteData) => {
    const { name, choices } = formData;
    if (!checkNameUniqueness(name).isUnique) {
      alert(
        'Someone has already voted with this name. Please enter a different name.',
        'error',
      );
      return;
    }
    setSubmitLoading(true);
    try {
      await registerVote(choices.toString(), { name });
      showPollLink(pollSlug, 'The vote successfully registered');
      addVote(pollSlug);
    } catch (error: any) {
      alert(error.response.message || DEFAULT_ERROR, 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const onSubmitError = (errors: any) => {
    for (const key in errors) {
      const errorMessage = errors[key]?.message;
      if (errorMessage) {
        alert(errorMessage, 'error');
        break;
      }
    }
  };

  return (
    <table className="mx-auto">
      <MemoizedTableHead options={options} />
      <MemoizedTableBody options={options} participants={participants} />
      <FormProvider {...methods}>
        <TableFooter
          disabled={alreadyVoted}
          poll={poll}
          submitLoading={submitLoading}
          onSubmit={handleSubmit(onSaveButtonClick, onSubmitError)}
        />
      </FormProvider>
    </table>
  );
};

export const MemoizedParticipantTable = memo(ParticipantTable);
