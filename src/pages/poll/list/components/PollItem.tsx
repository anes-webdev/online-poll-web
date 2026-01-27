import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import ShareIcon from '@mui/icons-material/Share';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { APP_BASE_URL } from '../../../../constants/baseUrls';
import { APP_ROUTES } from '../../../../constants/routes';
import { useAlert } from '../../../../hooks/useAlert';
import type { Poll } from '../../../../network/hooks/main/Poll';
import '../styles.css';

dayjs.extend(utc);
dayjs.extend(timezone);

// Todo: add mandatory key prop into map function as eslint rule.

type PollItemProps = {
  deletePoll: (pollSlug: string) => void;
  editPoll: (pollSlug: string) => void;
  poll: Poll;
};

const PollItem = ({ poll, editPoll, deletePoll }: PollItemProps) => {
  const navigate = useNavigate();
  const alert = useAlert();

  const [shareLinkToolTipMsg, setShareLinkToolTipMsg] =
    useState('Copy poll link');
  const { title, description, participants, link, createdAt } = poll;

  const formattedCreateDate = dayjs
    .utc(createdAt)
    .local()
    .format('MM/DD/YYYY, hh:mm A');

  const pollViewRoute = APP_ROUTES.POLL_VIEW.build(link);
  const pollLink = APP_BASE_URL + pollViewRoute;

  const onShareIconClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(pollLink);
    setShareLinkToolTipMsg('Copied!');
    setTimeout(() => {
      setShareLinkToolTipMsg('Copy poll link');
    }, 2000);
    alert('Poll link copied', 'success');
  };
  const navigateToPollView = () => navigate(pollViewRoute);
  const onEditPollClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    editPoll(link);
  };
  const onDeletePollClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    deletePoll(link);
  };
  return (
    <div onClick={navigateToPollView} className="poll-item-container">
      <div className="poll-item-head">
        <Typography className="text-left" variant="h6" color="textPrimary">
          {title}
        </Typography>
        <div className="flex gap-4.5">
          <button onClick={onShareIconClick}>
            <Tooltip placement="top" title={shareLinkToolTipMsg}>
              <ShareIcon color="action" className="text-xl!" />
            </Tooltip>
          </button>
          <button onClick={onEditPollClick}>
            <Tooltip placement="top" title="Edit poll">
              <EditIcon color="action" className="text-xl!" />
            </Tooltip>
          </button>
          <button onClick={onDeletePollClick}>
            <Tooltip placement="top" title="Delete poll">
              <DeleteIcon color="action" className="text-xl!" />
            </Tooltip>
          </button>
        </div>
      </div>
      <Typography className="mt-2! md:mt-3! text-left" color="textMuted">
        {description}
      </Typography>
      <div className="flex justify-between items-center mt-2 md:mt-3">
        <Tooltip title="Participants" placement="right">
          <div>
            <PeopleIcon color="action" className="mr-2 text-lg!" />
            <Typography component="span" color="textMuted" variant="body2">
              {participants.length}
            </Typography>
          </div>
        </Tooltip>
        <Typography color="textMuted" variant="caption">
          {formattedCreateDate}
        </Typography>
      </div>
    </div>
  );
};
export default PollItem;
