import Dialog from '@mui/material/Dialog';
import { Box, Button, Typography } from '@mui/material';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLoading: boolean;
  title: string;
  description: string;
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLoading,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 400,
          left: '50%',
          paddingTop: '32px',
          paddingBottom: '24px',
          paddingX: '24px',
        }}
      >
        <Typography className="text-center" variant="h5" color="textPrimary">
          {title}
        </Typography>
        <Typography color="textSecondary" className="mt-6! text-center">
          {description}
        </Typography>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            color="error"
            variant="outlined"
            size="small"
            className="px-12!"
            onClick={onClose}
          >
            No
          </Button>
          <Button
            loading={confirmLoading}
            color="error"
            size="small"
            variant="contained"
            className="px-12!"
            onClick={onConfirm}
            autoFocus
          >
            Yes
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};
export default DeleteModal;
