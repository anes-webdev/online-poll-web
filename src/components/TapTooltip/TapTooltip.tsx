import {
  Tooltip,
  useMediaQuery,
  useTheme,
  type TooltipProps,
} from '@mui/material';
import { useState } from 'react';

export const TapTooltip = (props: TooltipProps) => {
  const { children } = props;
  const theme = useTheme();
  const isTouchDevice = useMediaQuery(theme.breakpoints.down('md'));
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const showTooltip = () => {
    setIsTooltipOpen(true);
    setTimeout(() => {
      setIsTooltipOpen(false);
    }, 3000);
  };
  return (
    <Tooltip
      {...props}
      open={isTouchDevice ? isTooltipOpen : undefined}
      onClick={showTooltip}
      disableHoverListener={isTouchDevice}
      disableFocusListener={isTouchDevice}
      disableTouchListener={isTouchDevice}
    >
      {children}
    </Tooltip>
  );
};
