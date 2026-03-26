import ArrowBack from '@mui/icons-material/ArrowBackIos';
import {
  Button,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ErrorSection } from '../../../components/ErrorSection/ErrorSection';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { APP_ROUTES } from '../../../constants/routes';
import { useAlert } from '../../../hooks/useAlert';
import { useAuth } from '../../../hooks/useAuth';
import './styles.css';
import { useGetPoll } from '../../../api/polls/polls.hooks';
import { RotateDialog } from './components/ui/RotateDialog';
import { Chart } from './components/ui/Chart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { APP_BASE_URL } from '../../../constants/baseUrls';
import { OutlinedIconButton } from './components/ui/OutlinedIconButton';
import ShareIcon from '@mui/icons-material/Share';
import { ParticipantTable } from './components/participants/participant-table';
import { ParticipantList } from './components/participants/participant-list';
import Visibility from '@mui/icons-material/Visibility';

const PollView = () => {
  const alert = useAlert();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;
  const { data: poll, isLoading, error } = useGetPoll(pollSlug);
  const isDesktopView = useMediaQuery(theme.breakpoints.up(1024));

  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const closeChartModal = () => setIsChartModalOpen(false);
  const openChartModal = () => setIsChartModalOpen(true);

  const [isListView, setIsListView] = useState(true);
  const toggleParticipantsView = () => setIsListView((prev) => !prev);

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

  const { options } = poll;

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
      <div className="flex justify-end mt-6">
        <Button
          size="small"
          onClick={toggleParticipantsView}
          endIcon={<Visibility color="inherit" />}
        >
          {isListView ? 'Table View' : 'List View'}
        </Button>
      </div>
      <div className="participants-container">
        {isListView ? (
          <ParticipantList poll={poll} />
        ) : (
          <ParticipantTable poll={poll} />
        )}
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
