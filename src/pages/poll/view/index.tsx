import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetPoll } from '../../../network/hooks/get/useGetPoll';
import { Button, Typography } from '@mui/material';
import { useAlert } from '../../../hooks/useAlert';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { usePoll } from '../../../network/hooks/main/usePoll';
import { usePollLink } from '../../../hooks/usePollLink';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import {
  registerVoteSchema,
  type RegisterVoteData,
} from '../../../schemas/pollSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import TableFooter from './components/TableFooter';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { useStoreVotes } from '../../../hooks/useStoreVotes';
import './styles.css';
import { ErrorSection } from '../../../components/ErrorSection/ErrorSection';
import { useAuth } from '../../../hooks/useAuth';
import { APP_ROUTES } from '../../../constants/routes';

const PollView = () => {
  const alert = useAlert();
  const { isAuthenticated } = useAuth();
  const { registerVote } = usePoll();
  const navigate = useNavigate();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const { prevVotes, addVote } = useStoreVotes();
  const alreadyVoted = prevVotes.includes(pollSlug);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data: poll, isLoading, error } = useGetPoll(pollSlug);

  const methods = useForm<RegisterVoteData>({
    resolver: zodResolver(registerVoteSchema),
    defaultValues: {
      name: '',
      choices: [],
    },
  });

  const { handleSubmit } = methods;

  const onSaveButtonClick = async (formData: RegisterVoteData) => {
    const { name, choices } = formData;
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

  const navigateToPollList = () => {
    navigate(APP_ROUTES.POLLS);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error?.message || !poll) {
    return (
      <ErrorSection message={DEFAULT_ERROR}>
        {isAuthenticated && (
          <div className="flex justify-center">
            <Button onClick={navigateToPollList} variant="contained">
              Back to poll list
            </Button>
          </div>
        )}
      </ErrorSection>
    );
  }

  const { options, participants } = poll;

  return (
    <div className="poll-view-container">
      <div className="md:px-4">
        <Typography variant="h4" className="font-thin!" color="textPrimary">
          {poll.title}
        </Typography>
        <Typography className="poll-description" color="textPrimary">
          {poll.description}
        </Typography>
      </div>
      <div className="vote-table-container">
        <FormProvider {...methods}>
          <table className="mx-auto">
            <TableHead options={options} />
            <TableBody options={options} participants={participants} />
            <TableFooter
              disabled={alreadyVoted}
              poll={poll}
              submitLoading={submitLoading}
              onSubmit={handleSubmit(onSaveButtonClick, onSubmitError)}
            />
          </table>
        </FormProvider>
      </div>
    </div>
  );
};
export default PollView;
