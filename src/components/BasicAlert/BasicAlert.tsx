import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { alertAction } from '../../store/slices/alert';

export const BasicAlert = () => {
  const dispatch = useAppDispatch();
  const { isDisplayed, message, type, delay } = useAppSelector(
    (state) => state.alert,
  );

  const handleClose = () => {
    dispatch(alertAction.hideAlert());
  };

  return (
    <Snackbar
      className="fixed! top-15! md:top-20!"
      open={isDisplayed}
      autoHideDuration={delay}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
