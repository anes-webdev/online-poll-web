import Button from "@mui/material/Button";
import pollImage from "../../assets/Poll.webp";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../constants/routes";
import { Typography } from "@mui/material";
import "./styles.css";

const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const onMainButtonClick = () =>
    navigate(APP_ROUTES[isAuthenticated ? "POLLS" : "SIGN_IN"]);

  return (
    <div className="landing-main-wrapper">
      <div className="landing-left-section">
        <Typography variant="h4">Create online poll easily</Typography>
        <Typography color="textMuted" className="mt-4! sm:mt-6! lg:w-9/12">
          Easily create, manage and share online polls and surveys, and analyze
          responses in real-time.
          <br />
          It's free!
        </Typography>
        <Button
          className="signin-button"
          variant="contained"
          onClick={onMainButtonClick}
        >
          {isAuthenticated ? "Manage Polls" : "Sign In"}
        </Button>
      </div>
      <div className="landing-right-section">
        <img className="landing-poll-image" alt="pollImage" src={pollImage} />
      </div>
    </div>
  );
};

export default Landing;
