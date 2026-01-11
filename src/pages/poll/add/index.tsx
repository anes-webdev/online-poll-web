import './styles.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OptionList from './components/OptionsList';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
// import { alertAction } from '../../../store/alert-slice';
import { FormHelperText, Tooltip, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSelector } from 'react-redux';
import { authAction } from '../../../store/slices/auth';
import type { RootState } from '../../../store';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_BASE_URL } from '../../../constants/api';
import { APP_ROUTES } from '../../../constants/routes';
// import { authAction } from '../../../store/auth-slice';
// import { pollLinkAction } from '../../../store/pollLink-slice';

// Todo: should I style form tag itself or I should use a div container for it?!
// Todo: Handle background colors
export type Option = { optionName: string };

// Todo: update these error messages:
const TITLE_LENGTH_ERROR_MESSAGE = 'Title length should be between 3 and 20';
const DESCRIPTION_LENGTH_ERROR_MESSAGE =
  'Description length should be between 5 and 255';

const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createPollSchema = z.object({
    title: z
      .string()
      .min(3, TITLE_LENGTH_ERROR_MESSAGE)
      .max(20, TITLE_LENGTH_ERROR_MESSAGE)
      .nonempty('Can not be empty'),
    description: z
      .string()
      .min(5, DESCRIPTION_LENGTH_ERROR_MESSAGE)
      .max(20, DESCRIPTION_LENGTH_ERROR_MESSAGE)
      .nonempty('Can not be empty'),
    options: z
      .array(
        z.object({
          optionName: z.string(),
        }),
      )
      .min(2, 'At least two options are needed'),
  });

  type CreatePollData = z.infer<typeof createPollSchema>;

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePollData>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      title: '',
      description: '',
      options: [],
    },
  });

  const [optionInput, setOptionInput] = useState('');
  const [optionInputError, setOptionInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector<RootState>((state) => state.auth.token) as string;

  const isNewOptionValid = (value: string) => {
    let isValid = true;
    if (optionInput.trim() === '') {
      setOptionInputError('Can not be empty');
      isValid = false;
    }
    if (optionInput.length > 20) {
      setOptionInputError('Options length can not be more than 20 characters');
      isValid = false;
    }
    if (
      watch('options').some(
        (option) => option.optionName.toLowerCase() === value.toLowerCase(),
      )
    ) {
      setOptionInputError('This option already added');
      isValid = false;
    }
    return isValid;
  };

  const addOption = (value: string) => {
    if (!isNewOptionValid(value)) return;
    setOptionInput('');
    setOptionInputError('');
    const option: Option = {
      optionName: value,
    };
    const updatedOptions = [option, ...watch('options')];
    const shouldValidate = updatedOptions.length >= 2;
    setValue('options', updatedOptions, { shouldValidate: shouldValidate });
  };

  const deleteOption = (value: string) => {
    setValue(
      'options',
      watch('options').filter(({ optionName }) => optionName !== value),
    );
  };

  const onFormSubmit = (data: CreatePollData) => {
    const createPoll = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/poll/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(data),
        });
        if (response.status > 399) {
          if (response.status === 403) {
            dispatch(authAction.logout());
            navigate('../');
          }
          throw new Error('Some thing went wrong');
        }
        const pollSlug = await response.text();
        navigate(APP_ROUTES.POLL_LINK.build(pollSlug, 'poll-create'));
      } catch (error) {
        // dispatch(
        //   alertAction.showAlert({
        //     message: error.message,
        //     type: 'error',
        //   }),
        // );
      } finally {
        setLoading(false);
      }
    };
    createPoll();
  };

  return (
    <div className="poll-form-container sm:border-border-default">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Tooltip placement="top" title="Back to poll list">
          <Link to={APP_ROUTES.POLLS}>
            <ArrowBackIosIcon color="action" className="absolute" />
          </Link>
        </Tooltip>
        <Typography className="text-center" variant="h5" color="textSecondary">
          Create Poll
        </Typography>
        <div className="flex flex-col mt-6 lg:mt-10">
          <TextField
            {...register('title')}
            error={!!errors.title}
            className="w-full"
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <FormHelperText error>{errors.title?.message}</FormHelperText>
          <TextField
            {...register('description')}
            error={!!errors.description}
            className="w-full mt-4!"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
          />
          <FormHelperText error>{errors.description?.message}</FormHelperText>
          <div className="flex justify-between items-center mt-4">
            <TextField
              error={!!optionInputError}
              className="w-8/12"
              id="outlined-basic"
              label="Add Option"
              variant="outlined"
              value={optionInput}
              onChange={(e) => {
                setOptionInput(e.target.value);
                setOptionInputError('');
              }}
            />
            <div className="w-3/12">
              <Button
                onClick={() => {
                  addOption(optionInput);
                }}
                className="w-full h-12"
                variant="outlined"
              >
                Add
              </Button>
            </div>
          </div>
          <FormHelperText error>{optionInputError}</FormHelperText>
          <OptionList
            error={!!errors.options}
            options={watch('options')}
            deleteOption={deleteOption}
          />
          <FormHelperText error={!!errors.options}>
            {errors.options?.message}
          </FormHelperText>
          <Button
            loading={loading}
            className="w-full h-11 mt-5! lg:mt-6!"
            variant="contained"
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreatePoll;
