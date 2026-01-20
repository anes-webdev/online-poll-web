import { useState } from 'react';
import { useParams } from 'react-router';
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

const PollView = () => {
  const alert = useAlert();
  const { registerVote } = usePoll();
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

  // Todo:Handle loading with skeleton:
  if (isLoading) {
    return <LoadingSpinner />;
  }
  // Todo: Handle these errors:
  if (error?.message) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <h2 className="text-center text-gray-600 text-xl">{error.message}</h2>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <h2 className="text-center text-gray-600 text-xl"> No data </h2>
      </div>
    );
  }

  const { options, participants } = poll;

  return (
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      <div className="md:px-4">
        <Typography variant="h4" className="font-thin!" color="textPrimary">
          {poll.title}
        </Typography>
        <Typography className="mt-5! font-normal! text-lg!" color="textPrimary">
          {poll.description}
        </Typography>
      </div>
      <div className="mt-8 overflow-scroll sm:overflow-auto">
        <table className="mx-auto">
          <TableHead options={options} />
          <TableBody options={options} participants={participants} />
          <FormProvider {...methods}>
            <TableFooter
              disabled={alreadyVoted}
              poll={poll}
              submitLoading={submitLoading}
              onSubmit={handleSubmit(onSaveButtonClick, onSubmitError)}
            />
          </FormProvider>
        </table>
      </div>
    </div>
  );
};
export default PollView;
