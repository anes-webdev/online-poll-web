import { Button } from '@mui/material';
import { ErrorSection } from '../../components/ErrorSection/ErrorSection';
import { useNavigate } from 'react-router';

// Todo: add an icon here:

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorSection message="Page Not Found">
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
    </ErrorSection>
  );
};
export default NotFoundPage;
