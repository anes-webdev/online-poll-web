import { Button } from '@mui/material';

type CreatePollButtonProps = {
  onClick: () => void;
  className?: string;
};

export const CreatePollButton = (props: CreatePollButtonProps) => {
  const { onClick, className = '' } = props;
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color="neutral"
      className={className}
    >
      Create Poll
    </Button>
  );
};
