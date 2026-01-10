import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import { useState, type MouseEventHandler } from 'react';
import { APP_ROUTES } from '../../../constants/routes';
import { Typography } from '@mui/material';
import './styles.css';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { alertAction } from '../../store/alert-slice';

// Todo: add mandatory key prop into map function as eslint rule.

type Poll = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  link: string;
  participantsCount: number;
};

type PollItemProps = {
  deletePoll: (pollSlug: string) => void;
  editPoll: (pollSlug: string) => void;
  poll: Poll;
};

const PollItem = ({ poll, editPoll, deletePoll }: PollItemProps) => {
  const [shareLinkToolTipMsg, setShareLinkToolTipMsg] =
    useState('Copy poll link');
  const navigate = useNavigate();
  const { title, description, participantsCount, link, createdAt } = poll;
  const createdDate = createdAt.substring(0, 10);
  const createdTime = createdAt.substring(11, 16);

  const onShareIconClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShareLinkToolTipMsg('Copied!');
    setTimeout(() => {
      setShareLinkToolTipMsg('Copy poll link');
    }, 2000);
    // dispatch(
    //   alertAction.showAlert({
    //     message: 'Poll link copied',
    //     type: 'success',
    //   }),
    // );
  };
  const navigateToPollView = () => navigate(APP_ROUTES.POLL_VIEW.build(link));
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
      // Todo: check if its ok for div to have an onClick action:
      onClick={navigateToPollView}
      className="poll-item-container border-border-default hover:border-fg-primary"
    >
      <div className="poll-item-head">
        <Typography className="text-left" variant="h6" color="textPrimary">
          {title}
        </Typography>
        <div className="flex gap-4">
          {/* Todo: handle copy to clipboard */}
          {/* <CopyToClipboard text={pollLink}> */}
          <button onClick={onShareIconClick}>
            <Tooltip placement="top" title={shareLinkToolTipMsg}>
              <ShareIcon color="action" />
            </Tooltip>
          </button>
          {/* </CopyToClipboard> */}
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
        <div className="flex items-center">
          <PeopleIcon color="action" />
          {/* Todo: Cal participants counts: */}
          <Typography color="textSecondary">{participantsCount}</Typography>
        </div>
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
