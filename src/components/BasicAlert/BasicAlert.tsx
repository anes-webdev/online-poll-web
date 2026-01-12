import { Alert } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { alertAction } from '../../store/slices/alert';

export const BasicAlert = () => {
  const dispatch = useAppDispatch();
  const { isDisplayed, message, type, delay } = useAppSelector(
    (state) => state.alert,
  );

  if (isDisplayed === true) {
    setTimeout(() => {
      dispatch(alertAction.hideAlert());
    }, delay);
  }

  if (isDisplayed) {
    return (
      <div className="fixed right-4 top-20 z-2000! rounded-md overflow-hidden">
        <Alert
          variant="filled"
          severity={type}
          onClose={() => {
            dispatch(alertAction.hideAlert());
          }}
        >
          {message}
        </Alert>
      </div>
    );
  }

  return null;
};
