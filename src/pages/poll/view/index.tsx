import { useState } from 'react';
import { useParams } from 'react-router';
// import './PollDetails.css';
import { useGetPoll } from '../../../network/hooks/get/useGetPoll';
import { Typography } from '@mui/material';
import { useAlert } from '../../../hooks/useAlert';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { usePoll } from '../../../network/hooks/main/usePoll';
import { usePollLink } from '../../../hooks/usePollLink';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import {
  registerVoteSchema,
  type RegisterVoteData,
} from '../../../schemas/pollSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import TableFooter from './components/TableFooter';

// Todo: Handle redundant votes:
// Todo: refactor localStorage part:

const PollView = () => {
  const alert = useAlert();
  const { registerVote } = usePoll();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const savedVotes = JSON.parse(localStorage.getItem('votes') || '[]');
  const alreadyVoted =
    Array.isArray(savedVotes) && savedVotes.includes(pollSlug);

  const [submitLoading, setSubmitLoading] = useState(false);

  const { data: poll, isLoading, error } = useGetPoll(pollSlug);

  const methods = useForm<RegisterVoteData>({
    resolver: zodResolver(registerVoteSchema),
    defaultValues: {
      name: '',
      choices: [],
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { handleSubmit, formState } = methods;
  type FormErrorsType = typeof formState.errors;
  // const str = JSON.stringify(['test']);
  // console.log(JSON.parse(str));

  const onSaveButtonClick = async (formData: RegisterVoteData) => {
    const { name, choices } = formData;
    const reqBody = {
      name: name,
    };

    setSubmitLoading(true);
    try {
      await registerVote(choices.toString(), reqBody);
      showPollLink(pollSlug, 'The vote successfully registered');
      const savedVotes = JSON.parse(localStorage.getItem('votes') || '[]');
      localStorage.setItem(
        'votes',
        JSON.stringify(savedVotes ? [...savedVotes, pollSlug] : [pollSlug]),
      );
    } catch (error: any) {
      alert(error.response.message || DEFAULT_ERROR, 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const onSubmitError = (errors: FormErrorsType) => {
    console.log(errors);
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
