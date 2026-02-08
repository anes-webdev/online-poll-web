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
import './styles.css';
import { InfoMessage } from '../../../components/InfoMessage/InfoMessage';

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
    navigator.clipboard.writeText(pollLink);
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
    <div className="poll-link-container">
      <Tooltip placement="top" title="Back">
        <button onClick={onBackButtonClick} className="absolute">
          <ArrowBackIosIcon className="absolute" color="action" />
        </button>
      </Tooltip>
      <Typography color="success" className="text-center text-xl! mx-8!">
        {pollLinkMessage}
      </Typography>
      <Typography color="textSecondary" className="text-center text-xl! mt-6!">
        Poll Link
      </Typography>
      <div className="link-field-wrapper">
        <TextField
          className="w-full"
          variant="outlined"
          value={pollLink}
          aria-readonly
        />
        <div className="copy-icon">
          <button onClick={onCopyButtonClick}>
            <Tooltip placement="top" title={copyLinkIconToolTipMsg}>
              <ContentCopyIcon color="action" />
            </Tooltip>
          </button>
        </div>
      </div>
      <InfoMessage
        className="mt-1"
        text="Share this link with others so they can vote in this poll."
      />
      {isAuthenticated && (
        <div className="text-center mt-6">
          <Button
            onClick={() => {
              navigate(APP_ROUTES.POLLS);
            }}
            variant="contained"
          >
            Back to polls list
          </Button>
        </div>
      )}
    </div>
  );
};
export default PollLink;
