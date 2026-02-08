import { Button, Tooltip } from '@mui/material';
import type { ReactNode } from 'react';

type IconButtonWithTooltipProps = {
  title: string;
  startIcon: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const OutlinedIconButton = ({
  title,
  startIcon,
  onClick,
  className = '',
}: IconButtonWithTooltipProps) => {
  return (
    <Tooltip title={title} placement="right">
      <Button
        onClick={onClick}
        disableRipple
        variant="outlined"
        color="primary"
        startIcon={startIcon}
        className={`py-2! px-3! min-w-10! ${className}`}
        sx={{
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        }}
      />
    </Tooltip>
  );
};
