import { alertAction, type AlertType } from '../store/slices/alert';
import { useAppDispatch } from './useAppDispatch';

export const useAlert = () => {
  const dispatch = useAppDispatch();
  const alert = (message: string, type: AlertType, delay?: number) => {
    dispatch(alertAction.showAlert({ message, type, delay }));
  };

  return alert;
};
