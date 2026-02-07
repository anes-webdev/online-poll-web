import {
  Box,
  Button,
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';

export const RotateDialog = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(isMobileView);
  const onClose = () => setIsOpen(false);

  return (
    <Dialog
      slotProps={{
        paper: {
          sx: {
            position: 'fixed',
            bottom: 50,
          },
        },
      }}
      hideBackdrop
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{
          maxWidth: 400,
          padding: '16px',
        }}
      >
        <ScreenRotationIcon color="primary" className="mr-2 text-xl!" />
        <Typography component="span" color="textSecondary">
          For the best experience, rotate your device.
        </Typography>
        <div className="flex justify-end mt-2">
          <Button
            variant="contained"
            size="small"
            color="info"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};
