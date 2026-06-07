import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import pollImage from '../../assets/select-poll.webp';
import { APP_ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';
import { DEFAULT_ERROR } from '../../constants/errorMessages';
import { demoSignIn } from '../../api/auth/auth.api';
import { authAction } from '../../store/slices/auth';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAlert } from '../../hooks/useAlert';

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const alert = useAlert();
  const onSignInClick = () => {
    navigate(APP_ROUTES.SIGN_IN);
  };
  const onManagePollsClick = () => navigate(APP_ROUTES.POLLS);

  const [isLoading, setIsLoading] = useState(false);

  const onTryDemoClick = async () => {
    setIsLoading(true);
    try {
      await demoSignIn();
      dispatch(authAction.login());
      navigate(APP_ROUTES.POLLS);
    } catch (error: any) {
      alert(DEFAULT_ERROR, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-main-wrapper">
      <div className="landing-left-section">
        <Typography variant="h4" color="textPrimary">
          Create online poll easily
        </Typography>
        <Typography color="textMuted" className="mt-4! sm:mt-6! lg:w-9/12">
          Easily create, manage and share online polls and surveys, and analyze
          responses in real-time.
          <br />
          It's free!
        </Typography>
        <div className="mt-4! flex items-center gap-3">
          {!isAuthenticated && (
            <Button
              loading={isLoading}
              className="signin-button w-44 sm:w-54 md:w-58"
              variant="contained"
              color="primary"
              onClick={onTryDemoClick}
            >
              Try Demo
            </Button>
          )}
          {isAuthenticated ? (
            <Button
              className="signin-button w-58"
              variant="contained"
              color="primary"
              onClick={onManagePollsClick}
            >
              Manage Polls
            </Button>
          ) : (
            <Button
              className="signin-button"
              variant="outlined"
              color="primary"
              onClick={onSignInClick}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      <div className="landing-right-section">
        <img className="landing-poll-image" alt="pollImage" src={pollImage} />
      </div>
    </div>
  );
};

export default Landing;
