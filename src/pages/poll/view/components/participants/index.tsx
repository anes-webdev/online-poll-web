import type { Poll } from '../../../../../api/polls/polls.types';
import '../../styles.css';
import type { RegisterVoteData } from '../../../../../schemas/pollSchema';
import { memo, useState, useTransition } from 'react';
import { usePollLink } from '../../../../../hooks/usePollLink';
import { registerVote } from '../../../../../api/polls/polls.api';
import { useParams } from 'react-router';
import { useStoreVotes } from '../../../../../hooks/useStoreVotes';
import { useAlert } from '../../../../../hooks/useAlert';
import Visibility from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import { PollViewContext } from './store/PollViewContext';
import ParticipantList from './participant-list';
import ParticipantTable from './participant-table';
import { extractResponseError } from '../../../../../utils/extractResponseError';

type ParticipantsProps = { poll: Poll };
export const Participants = (props: ParticipantsProps) => {
  const { poll } = props;

  const alert = useAlert();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollId: string }>();
  const [isPending, startTransition] = useTransition();
  const pollId = params.pollId as string;
  const { prevVotes, addVote } = useStoreVotes();
  const alreadyVoted = prevVotes.includes(pollId);
  const [isListView, setIsListView] = useState(true);
  const toggleParticipantsView = () => {
    startTransition(() => {
      setIsListView((prev) => !prev);
    });
  };
  const [submitLoading, setSubmitLoading] = useState(false);

  const checkNameUniqueness = (name: string) => {
    return {
      isUnique: !poll?.participants.some(
        ({ name: participantName }) =>
          participantName.toLowerCase() === name.toLowerCase().trim(),
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
      await registerVote({ participantName: name, optionIds: choices });
      showPollLink(pollId, 'The vote successfully registered');
      addVote(pollId);
    } catch (error: any) {
      alert(extractResponseError(error), 'error');
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

  const participantsProps = {
    onSubmit: onSaveButtonClick,
    onSubmitError: onSubmitError,
  };
  return (
    <>
      <div className="flex justify-end mt-6">
        <Button
          size="small"
          onClick={toggleParticipantsView}
          endIcon={<Visibility color="inherit" />}
          loading={isPending}
        >
          {isListView ? 'Table View' : 'List View'}
        </Button>
      </div>
      <PollViewContext.Provider value={{ poll, alreadyVoted, submitLoading }}>
        <div className="participants-container">
          {isListView ? (
            <ParticipantList {...participantsProps} />
          ) : (
            <ParticipantTable {...participantsProps} />
          )}
        </div>
      </PollViewContext.Provider>
    </>
  );
};

export const MemoizedParticipants = memo(Participants);
