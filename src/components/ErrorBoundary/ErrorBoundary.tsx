import { Typography } from '@mui/material';
import React, { type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props as ErrorBoundaryProps;

    if (hasError) {
      return (
        <div className="h-screen flex items-center justify-center">
          <Typography
            variant="h5"
            className="text-center"
            color="textSecondary"
          >
            Something went wrong, please contact support
          </Typography>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
