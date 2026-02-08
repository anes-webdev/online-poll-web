import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import {
  Button,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { ErrorSection } from '../../../components/ErrorSection/ErrorSection';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { APP_ROUTES } from '../../../constants/routes';
import { useAlert } from '../../../hooks/useAlert';
import { useAuth } from '../../../hooks/useAuth';
import { usePollLink } from '../../../hooks/usePollLink';
import { useStoreVotes } from '../../../hooks/useStoreVotes';
import {
  registerVoteSchema,
  type RegisterVoteData,
} from '../../../schemas/pollSchema';
import { TableBody } from './components/TableBody';
import TableFooter from './components/TableFooter';
import { TableHead } from './components/TableHead';
import './styles.css';
import { registerVote } from '../../../api/polls/polls.api';
import { useGetPoll } from '../../../api/polls/polls.hooks';
import { RotateDialog } from './components/RotateDialog';
import { Chart } from './components/Chart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { APP_BASE_URL } from '../../../constants/baseUrls';
import { OutlinedIconButton } from './components/OutlinedIconButton';
import ShareIcon from '@mui/icons-material/Share';

const PollView = () => {
  const alert = useAlert();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const { prevVotes, addVote } = useStoreVotes();
  const alreadyVoted = prevVotes.includes(pollSlug);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data: poll, isLoading, error } = useGetPoll(pollSlug);
  const isDesktopView = useMediaQuery(theme.breakpoints.up(1024));

  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const closeChartModal = () => setIsChartModalOpen(false);
  const openChartModal = () => setIsChartModalOpen(true);

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

  const copyPollLink = () => {
    const pollViewRoute = APP_ROUTES.POLL_VIEW.build(poll?.link as string);
    const pollLink = APP_BASE_URL + pollViewRoute;
    navigator.clipboard.writeText(pollLink);
    alert('Poll link copied', 'success');
  };

  const navigateToPollList = () => {
    navigate(APP_ROUTES.POLLS);
  };

  const navigateToPolls = () => {
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
              Back to polls list
            </Button>
          </div>
        )}
      </ErrorSection>
    );
  }

  const { options, participants } = poll;

  return (
    <div className="poll-view-container">
      <div className="flex">
        <div className="flex-1">
          {isAuthenticated && (
            <Tooltip title="Back to poll list" placement="top">
              <Button
                onClick={navigateToPolls}
                disableRipple
                className="px-0!"
                variant="navbar"
                color="neutral"
                startIcon={<ArrowBack color="inherit" />}
              >
                Back
              </Button>
            </Tooltip>
          )}
          <Typography
            variant="h4"
            className="font-thin! mt-4!"
            color="textPrimary"
          >
            {poll.title}
          </Typography>
          <Typography className="poll-description" color="textPrimary">
            {poll.description}
          </Typography>
        </div>
        <div className="w-12">
          {isDesktopView && (
            <OutlinedIconButton
              title="Show chart"
              startIcon={<BarChartIcon color="inherit" />}
              className="mb-3!"
              onClick={openChartModal}
            />
          )}
          <OutlinedIconButton
            title="Copy poll link"
            startIcon={<ShareIcon color="inherit" />}
            onClick={copyPollLink}
          />
        </div>
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
      <RotateDialog />
      <Chart
        isOpen={isChartModalOpen}
        onClose={closeChartModal}
        options={options}
      />
    </div>
  );
};
export default PollView;
