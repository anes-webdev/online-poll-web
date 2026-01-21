import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { authAction } from '../../store/slices/auth';
import { Button, FormHelperText, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { APP_ROUTES } from '../../constants/routes';
import { useSignIn } from '../../network/hooks/main/useSignIn';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAlert } from '../../hooks/useAlert';
import '../../index.css';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signIn } = useSignIn();
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
      if (error.status === 404) {
        setError('username', { message: 'Incorrect username' });
        setError('password', { message: 'Incorrect password' });
        alert('Username or password is incorrect', 'error');
      } else {
        alert(error.response.data, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Todo: move border-default class into separate css file:
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
