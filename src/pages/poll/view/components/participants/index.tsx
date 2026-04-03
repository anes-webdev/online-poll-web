import type { Poll } from '../../../../../api/polls/polls.types';
import '../../styles.css';
import type { RegisterVoteData } from '../../../../../schemas/pollSchema';
import { memo, useState } from 'react';
import { usePollLink } from '../../../../../hooks/usePollLink';
import { registerVote } from '../../../../../api/polls/polls.api';
import { useParams } from 'react-router';
import { useStoreVotes } from '../../../../../hooks/useStoreVotes';
import { DEFAULT_ERROR } from '../../../../../constants/errorMessages';
import { useAlert } from '../../../../../hooks/useAlert';
import Visibility from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import { PollViewContext } from './store/PollViewContext';
import ParticipantList from './participant-list';
import ParticipantTable from './participant-table';

type ParticipantsProps = { poll: Poll };
// Todo: When I open and close the chart, this component re-renders, should I memoize such a large component like this?
export const Participants = (props: ParticipantsProps) => {
  const { poll } = props;

  const alert = useAlert();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const { prevVotes, addVote } = useStoreVotes();
  const alreadyVoted = prevVotes.includes(pollSlug);
  // Handle default view in mobile device here:
  const [isListView, setIsListView] = useState(true);
  const toggleParticipantsView = () => setIsListView((prev) => !prev);
  const [submitLoading, setSubmitLoading] = useState(false);

  const checkNameUniqueness = (name: string) => {
    return {
      isUnique: !poll?.participants.some(
        ({ name: participantName }) =>
          participantName.toLowerCase() === name.toLowerCase(),
      ),
    };
  };

  // Todo: Is it possible to store this method into context?
  // Todo: Is it common to store functions in global state?
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
