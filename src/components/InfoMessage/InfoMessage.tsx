import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';

type InfoMessageProps = {
  text: string;
  className: string;
};

export const InfoMessage = ({ text, className = '' }: InfoMessageProps) => {
  return (
    <div className={`mt-0.5 ${className}`}>
      <InfoIcon color="info" className="text-lg! mr-1.5" />
      <Typography component="span" variant="caption" color="textMuted">
        {text}
      </Typography>
    </div>
  );
};
