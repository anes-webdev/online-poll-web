import {
  Tooltip,
  useMediaQuery,
  useTheme,
  type TooltipProps,
} from '@mui/material';
import { useState } from 'react';

const MobileTooltip = (props: TooltipProps) => {
  const { children } = props;
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
      open={isTooltipOpen}
      onClick={showTooltip}
      disableHoverListener
      disableFocusListener
      disableTouchListener
    >
      {children}
    </Tooltip>
  );
};

export const TapTooltip = (props: TooltipProps) => {
  const { children } = props;
  const theme = useTheme();
  const isTouchDevice = useMediaQuery(theme.breakpoints.down('md'));

  if (isTouchDevice) {
    return <MobileTooltip {...props}>{children}</MobileTooltip>;
  } else {
    return <Tooltip {...props}>{children}</Tooltip>;
  }
};
