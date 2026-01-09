import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/slices/auth';
import { Button, FormHelperText, Typography } from '@mui/material';
import './styles.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { API_BASE_URL } from '../../constants/api';

// Todo: add api calls
// Todo: use separate css file
// Todo: Add snackbar instead of error message under sign in button
// Todo: refactor form schema and validations

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = z.object({
    username: z.string().nonempty('Can not be empty'),
    password: z.string().nonempty('Can not be empty'),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onFormSubmit = (data: LoginFormData) => {
    const { username, password } = data;
    const signIn = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://${API_BASE_URL}/user/signing?username=${username}&password=${password}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status > 399) {
          throw new Error('Username or password is incorrect');
        }
        const data = await response.text();
        dispatch(authAction.login(data));
        setResponseMessage('');
        navigate('../pollList');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError('username', { message: 'Incorrect username' });
        setError('password', { message: 'Incorrect password' });
        setResponseMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    signIn();
  };

  return (
    // Todo: move border-default class into separate css file:
    <div className="sign-in-form-container sm:border-border-default">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography className="text-center" variant="h5" color="textSecondary">
          Sign in
        </Typography>
        <TextField
          {...register('username')}
          error={!!errors.username}
          className="w-full mt-6! lg:mt-8!"
          label="Username"
          variant="outlined"
        />
        <FormHelperText error>{errors.username?.message}</FormHelperText>
        <TextField
          {...register('password')}
          error={!!errors.password}
          className="w-full mt-4!"
          label="Password"
          variant="outlined"
          type="password"
        />
        <FormHelperText error>{errors.password?.message}</FormHelperText>
        <Button
          loading={isLoading}
          className="w-full h-11 mt-5!"
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
