import TextField from '@mui/material/TextField';
import { useState, type FormEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/slices/auth';
import { Button, FormHelperText, Typography } from '@mui/material';

// Todo: add api calls
// Todo: add form validation
// Todo: update cont
// Todo: use separate css file

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [userNameValue, setUserNameValue] = useState('');
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (
      userNameValue.trim().length === 0 ||
      passwordValue.trim().length === 0
    ) {
      if (userNameValue.trim().length === 0) {
        setUserNameErrorMessage('Can not be empty');
        setIsUserNameInvalid(true);
      }
      if (passwordValue.trim().length === 0) {
        setIsPasswordInvalid(true);
        setPasswordErrorMessage('Can not be empty');
      }
      return;
    }

    const signIn = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://${API_BASE_URL}/user/signing?username=${userNameValue}&password=${passwordValue}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setIsLoading(false);
        if (response.status > 399) {
          setUserNameErrorMessage('Incorrect username');
          setPasswordErrorMessage('Incorrect password');
          setIsUserNameInvalid(true);
          setIsPasswordInvalid(true);
          throw new Error('Username or password is incorrect');
        }

        const data = await response.text();
        dispatch(authAction.login(data));
        setIsUserNameInvalid(false);
        setIsPasswordInvalid(false);
        setResponseMessage('');
        navigate('../pollList');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoading(false);
        setResponseMessage(error.message);
      }
    };
    signIn();
  };

  return (
    <div className="max-w-90 sm:max-w-104 mx-auto px-1 sm:p-8 py-6 sm:border sm:border-border-default rounded-lg sm:shadow-sm">
      <form onSubmit={onFormSubmit}>
        <Typography className="text-center" variant="h5" color="textSecondary">
          Sign in
        </Typography>
        <TextField
          error={isUserNameInvalid}
          className="w-full mt-6! lg:mt-8!"
          label="Username"
          variant="outlined"
          value={userNameValue}
          onChange={(e) => {
            setIsUserNameInvalid(false);
            setUserNameValue(e.target.value);
          }}
        />
        <FormHelperText error>
          {isUserNameInvalid ? userNameErrorMessage : ' '}
        </FormHelperText>
        <TextField
          id="standard-error-helper-text"
          error={isPasswordInvalid}
          className="w-full mt-3!"
          label="Password"
          variant="outlined"
          type="password"
          value={passwordValue}
          onChange={(e) => {
            setIsPasswordInvalid(false);
            setPasswordValue(e.target.value);
          }}
        />
        <FormHelperText error>
          {isPasswordInvalid ? passwordErrorMessage : ' '}
        </FormHelperText>
        <Button
          loading={isLoading}
          className="w-full h-11 mt-4! lg:mt-4!"
          variant="contained"
          type="submit"
        >
          Sing in
        </Button>
        {responseMessage && (
          <Typography className="mt-4!" color="error">
            {responseMessage} &nbsp;
          </Typography>
        )}
      </form>
    </div>
  );
};
export default SignIn;
