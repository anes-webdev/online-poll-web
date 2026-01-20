import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import { useState, type MouseEventHandler } from 'react';
import { APP_ROUTES } from '../../../../constants/routes';
import { Typography } from '@mui/material';
import '../styles.css';
import { useAlert } from '../../../../hooks/useAlert';
import type { Poll } from '../../../../network/hooks/main/usePoll';
import { APP_BASE_URL } from '../../../../constants/baseUrls';

// Todo: add mandatory key prop into map function as eslint rule.
// Todo: change poll item name.

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
  const createdDate = createdAt.substring(0, 10);
  const createdTime = createdAt.substring(11, 16);
  const pollViewRoute = APP_ROUTES.POLL_VIEW.build(link);

  const onShareIconClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(APP_BASE_URL + pollViewRoute);
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
    <div
      // Todo: Move these classes into separate css file:
      onClick={navigateToPollView}
      className="poll-item-container border-border-default hover:shadow-md"
    >
      <div className="poll-item-head">
        <Typography className="text-left" variant="h6" color="textPrimary">
          {title}
        </Typography>
        <div className="flex gap-4">
          <button onClick={onShareIconClick}>
            <Tooltip placement="top" title={shareLinkToolTipMsg}>
              <ShareIcon color="action" />
            </Tooltip>
          </button>
          <button onClick={onEditPollClick}>
            <Tooltip placement="top" title="Edit poll">
              <EditIcon color="action" />
            </Tooltip>
          </button>
          <button onClick={onDeletePollClick}>
            <Tooltip placement="top" title="Delete poll">
              <DeleteIcon color="action" />
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
          {createdDate}
          &nbsp;&nbsp;
          {createdTime}
        </Typography>
      </div>
    </div>
  );
};
export default PollItem;
