import type { Poll } from '../../../../../api/polls/polls.types';
import { ParticipantList } from './participant-list';
import { ParticipantTable } from './participant-table';
import '../../styles.css';
import type { RegisterVoteData } from '../../../../../schemas/pollSchema';
import { useState } from 'react';
import { usePollLink } from '../../../../../hooks/usePollLink';
import { registerVote } from '../../../../../api/polls/polls.api';
import { useParams } from 'react-router';
import { useStoreVotes } from '../../../../../hooks/useStoreVotes';
import { DEFAULT_ERROR } from '../../../../../constants/errorMessages';
import { useAlert } from '../../../../../hooks/useAlert';

type ParticipantsProps = { isListView: boolean; poll: Poll };

export const Participants = (props: ParticipantsProps) => {
  const { isListView, poll } = props;

  const alert = useAlert();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const { prevVotes, addVote } = useStoreVotes();
  const alreadyVoted = prevVotes.includes(pollSlug);

  const [submitLoading, setSubmitLoading] = useState(false);

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

  const participantsProps = {
    poll: poll,
    alreadyVoted: alreadyVoted,
    submitLoading: submitLoading,
    onSubmit: onSaveButtonClick,
    onSubmitError: onSubmitError,
  };
  // Todo: Handle functions and props in global state like context:
  return (
    <div className="participants-container">
      {isListView ? (
        <ParticipantList {...participantsProps} />
      ) : (
        <ParticipantTable {...participantsProps} />
      )}
    </div>
  );
};
