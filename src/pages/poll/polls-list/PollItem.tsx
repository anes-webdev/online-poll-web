import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { APP_BASE_URL } from '../../../constants/api';
import { APP_ROUTES } from '../../../constants/routes';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { alertAction } from '../../store/alert-slice';

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
  key: number;
};

const PollItem = ({ poll, editPoll, deletePoll, key }: PollItemProps) => {
  const [shareLinkToolTipMsg, setShareLinkToolTipMsg] =
    useState('Copy poll link');
  const dispatch = useDispatch();
  const { title, description, participantsCount, link, createdAt } = poll;
  const createdDate = createdAt.substring(0, 10);
  const createdTime = createdAt.substring(11, 19);
  const pollLink = `${APP_BASE_URL}${APP_ROUTES.POLL_LINK.build(link)}`;

  const onShareIconClick: React.MouseEventHandler<HTMLButtonElement> = () => {
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

  return (
    <div key={key} className="border-b border-gray-300 py-2.5 lg:py-3 px-2">
      <div className="flex justify-between">
        <Link
          to={`../pollDetails/${link}`}
          className="text-xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
        >
          {title}
        </Link>
        <div>
          {/* <CopyToClipboard text={pollLink}> */}
          <button onClick={onShareIconClick}>
            <Tooltip placement="top" title={shareLinkToolTipMsg}>
              <ShareIcon className="text-gray-500 hover:text-gray-600" />
            </Tooltip>
          </button>
          {/* </CopyToClipboard> */}

          <button
            onClick={() => {
              editPoll(link);
            }}
            className="mx-4 lg:mx-5"
          >
            <Tooltip placement="top" title="Edit poll">
              <EditIcon className="text-gray-500 hover:text-gray-600" />
            </Tooltip>
          </button>
          <button
            onClick={() => {
              deletePoll(link);
            }}
          >
            <Tooltip placement="top" title="Delete poll">
              <DeleteIcon className="text-gray-500 hover:text-gray-600" />
            </Tooltip>
          </button>
        </div>
      </div>

      <p className="mt-2 md:mt-3 text-gray-500">{description} </p>
      <div className="flex justify-between items-center mt-2 md:mt-3">
        <div className="flex items-center">
          <PeopleIcon className="text-gray-500" />
          <p className="ml-2 text-gray-500">{participantsCount}</p>
        </div>
        <p className="text-gray-500 font-light text-xs mr-2">
          {createdDate}
          &nbsp;&nbsp;
          {createdTime}
        </p>
      </div>
    </div>
  );
};
export default PollItem;
