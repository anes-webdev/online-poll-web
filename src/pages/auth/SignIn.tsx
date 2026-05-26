import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { DEFAULT_ERROR } from '../../constants/errorMessages';
import { APP_ROUTES } from '../../constants/routes';
import { useAlert } from '../../hooks/useAlert';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import '../../styles/global.css';
import { signIn } from '../../api/auth/auth.api';
import { authAction } from '../../store/slices/auth';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLogin, setIsDemoLogin] = useState(false);
  const isDemoLoading = isLoading && isDemoLogin;
  const isSignInLoading = isLoading && !isDemoLogin;
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

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

  const onFormSubmit = async (data: LoginFormData, isDemoLogin?: boolean) => {
    const { username, password } = data;
    setIsLoading(true);
    setIsDemoLogin(!!isDemoLogin);
    try {
      await signIn(username, password);
      dispatch(authAction.login());
      navigate(APP_ROUTES.POLLS);
    } catch (error: any) {
      if (error.status === 404) {
        if (!isDemoLogin) {
          setError('username', { message: 'Incorrect username' });
          setError('password', { message: 'Incorrect password' });
        }
        alert('Username or password is incorrect', 'error');
      } else {
        alert(DEFAULT_ERROR, 'error');
      }
    } finally {
      setIsLoading(false);
      setIsDemoLogin(false);
    }
  };

  const onTryDemoClick = () => {
    onFormSubmit(
      {
        username: 'admin',
        password: 'demo123',
      },
      true,
    );
  };

  const onSignInClick = (data: LoginFormData) => onFormSubmit(data);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSignInClick)}>
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
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword}>
                    {showPassword ? (
                      <VisibilityOff color="action" />
                    ) : (
                      <Visibility color="action" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <FormHelperText error>{errors.password?.message}</FormHelperText>
        <Button
          disabled={isDemoLoading}
          loading={isSignInLoading}
          className="w-full h-11 mt-5!"
          variant="contained"
          type="submit"
        >
          Sign in
        </Button>
        <div className="mt-4! flex items-center">
          <Typography className="mr-1!" variant="body2" component="span">
            Just exploring?
          </Typography>
          <Button
            disabled={isSignInLoading}
            loading={isDemoLoading}
            color="secondary"
            size="small"
            variant="text"
            className="text-sm!"
            onClick={onTryDemoClick}
          >
            Try Demo
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
