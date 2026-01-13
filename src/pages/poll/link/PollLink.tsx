import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useParams } from 'react-router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../../hooks/useAlert';
import { APP_ROUTES } from '../../../constants/routes';
import { APP_BASE_URL } from '../../../constants/baseUrls';
import { usePollLink } from '../../../hooks/usePollLink';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

// Todo: handle copy to clipboard:
// Todo: Search about the right folder of redux hooks

const PollLink = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { pollSlug } = useParams<{ pollSlug: string }>();
  const { hidePollLink, pollLinkMessage, isPollLinkDisplayed } = usePollLink();

  const [copyLinkIconToolTipMsg, setCopyLinkIconToolTipMsg] =
    useState('Copy link');

  const pollLink =
    APP_BASE_URL + APP_ROUTES.POLL_VIEW.build(pollSlug as string);

  const onBackButtonClick = () => {
    navigate(-1);
  };

  const onCopyButtonClick = () => {
    setCopyLinkIconToolTipMsg('Copied!');
    alert('Poll link copied', 'success');
    setTimeout(() => {
      setCopyLinkIconToolTipMsg('Copy link');
    }, 2000);
  };

  useEffect(() => {
    if (!isPollLinkDisplayed) navigate(-1);
    return () => {
      hidePollLink();
    };
  }, [hidePollLink, isPollLinkDisplayed, navigate]);

  return (
    <div className="max-w-md md:max-w-lg mx-auto">
      <div className="py-6 px-4 md:p-8 border border-border-default rounded-lg shadow-sm">
        <Tooltip placement="top" title="Back">
          <button onClick={onBackButtonClick} className="absolute">
            <ArrowBackIosIcon className="absolute" color="action" />
          </button>
        </Tooltip>
        <Typography color="success" className="text-center text-xl! mx-9">
          {pollLinkMessage}
        </Typography>
        <Typography
          color="textSecondary"
          className="text-center text-xl! mt-6!"
        >
          Poll Link
        </Typography>
        <div className="mt-4 lg:mt-6 flex items-center justify-between w-full relative">
          <TextField
            className="w-full"
            variant="outlined"
            value={pollLink}
            aria-readonly
          />
          <div className="flex justify-center items-center absolute top-3.5 w-10 right-2 bg-white z-10">
            {/* <CopyToClipboard text={pollLink}> */}
            <button onClick={onCopyButtonClick}>
              <Tooltip placement="top" title={copyLinkIconToolTipMsg}>
                <ContentCopyIcon color="action" />
              </Tooltip>
            </button>
            {/* </CopyToClipboard> */}
          </div>
        </div>
        {isAuthenticated && (
          <div className="text-center mt-6">
            <Button
              onClick={() => {
                navigate(APP_ROUTES.POLLS);
              }}
              variant="contained"
            >
              Back to pollList
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PollLink;
