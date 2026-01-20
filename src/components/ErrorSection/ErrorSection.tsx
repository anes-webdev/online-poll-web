import { Typography } from '@mui/material';
import NotFoundIcon from '../../assets/not-found.jpeg';
import type { ReactNode } from 'react';

type ErrorSectionProps = {
  message: string;
  children?: ReactNode;
};

export const ErrorSection = ({ message, children }: ErrorSectionProps) => {
  return (
    <div className="mx-auto max-w-md">
      <img src={NotFoundIcon} alt="Not found icon" className="w-full"></img>
      <Typography variant="h5" className="text-center" color="textSecondary">
        {message}
      </Typography>
      <div className="mt-7 flex justify-center">{children}</div>
    </div>
  );
};
