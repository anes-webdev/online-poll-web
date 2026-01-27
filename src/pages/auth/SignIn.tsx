import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormHelperText, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { DEFAULT_ERROR } from '../../constants/errorMessages';
import { APP_ROUTES } from '../../constants/routes';
import { useAlert } from '../../hooks/useAlert';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import '../../index.css';
import { signIn } from '../../network/hooks/main/useSignIn';
import { authAction } from '../../store/slices/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const alert = useAlert();

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

  const onFormSubmit = async (data: LoginFormData) => {
    const { username, password } = data;
    setIsLoading(true);
    try {
      const token = await signIn(username, password);
      dispatch(authAction.login(token));
      navigate(APP_ROUTES.POLLS);
    } catch (error: any) {
      // Todo: When user pass is incorrect the response is 500!
      if (error.status === 404 || error.status === 500) {
        setError('username', { message: 'Incorrect username' });
        setError('password', { message: 'Incorrect password' });
        alert('Username or password is incorrect', 'error');
      } else {
        alert(DEFAULT_ERROR, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
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
      </form>
    </div>
  );
};
export default SignIn;
