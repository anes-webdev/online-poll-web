import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoIcon from '@mui/icons-material/Info';
import { FormHelperText, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { ErrorSection } from '../../../components/ErrorSection/ErrorSection';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { APP_ROUTES } from '../../../constants/routes';
import { useAlert } from '../../../hooks/useAlert';
import { usePollLink } from '../../../hooks/usePollLink';
import '../../../index.css';
import {
  createPollSchema,
  editPollSchema,
  type CreatePollData,
} from '../../../schemas/pollSchema';
import OptionList from './components/OptionsList';
import '../../../styles/global.css';
import { useGetPoll } from '../../../api/polls/polls.hooks';
import { createPoll, editPoll } from '../../../api/polls/polls.api';
import TextFieldWithCounter from '../../../components/TextFieldWithCounter/TextFieldWithCounter';
import { POLL_TITLE_MAX_LENGTH } from '../../../constants/poll';

const CreatePoll = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>() || '';
  const pollSlug = (params.pollSlug || '') as string;
  const isEditPage = pathname === APP_ROUTES.EDIT_POLL.build(pollSlug || '');
  const { data: poll, isLoading, error } = useGetPoll(pollSlug, isEditPage);

  const [optionInput, setOptionInput] = useState('');
  const [optionInputError, setOptionInputError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePollData>({
    resolver: zodResolver(isEditPage ? editPollSchema : createPollSchema),
    defaultValues: {
      title: '',
      description: '',
      options: [],
    },
  });

  useEffect(() => {
    if (poll && isEditPage) {
      const { title, description, options } = poll;
      setValue('title', title);
      setValue('description', description);
      setValue(
        'options',
        options.map(({ optionName }) => {
          return { optionName };
        }),
      );
    }
  }, [isEditPage, poll, setValue]);

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
    const option = {
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

  const onFormSubmit = async (data: CreatePollData) => {
    const { title, description } = data;
    setSubmitLoading(true);
    try {
      if (isEditPage) {
        await editPoll(pollSlug, { title, description });
        showPollLink(pollSlug, 'The poll successfully updated');
      } else {
        const createdPollSlug = await createPoll(data);
        showPollLink(createdPollSlug, 'The poll successfully created');
      }
    } catch (error: any) {
      alert(error.response.message, 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const navigateToPollList = () => {
    navigate(APP_ROUTES.POLLS);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <ErrorSection message={DEFAULT_ERROR}>
        <Button onClick={navigateToPollList} variant="contained">
          Back to polls list
        </Button>
      </ErrorSection>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Tooltip placement="top" title="Back to poll list">
          <Link to={APP_ROUTES.POLLS}>
            <ArrowBackIosIcon color="action" className="absolute" />
          </Link>
        </Tooltip>
        <Typography className="text-center" variant="h5" color="textSecondary">
          {isEditPage ? 'Edit' : 'Create'} Poll
        </Typography>
        <div className="flex flex-col mt-6 lg:mt-10">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextFieldWithCounter
                required
                maxLength={POLL_TITLE_MAX_LENGTH}
                {...field}
                error={!!errors.title}
                className="w-full"
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
            )}
          />
          <FormHelperText error>{errors.title?.message}</FormHelperText>
          <TextField
            required
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
          {isEditPage && (
            <div className="mt-3!">
              <InfoIcon color="info" className="text-lg!" />
              <Typography
                component="span"
                variant="caption"
                color="textMuted"
                className="ml-1!"
              >
                Updating options is not possible in edit mode
              </Typography>
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <TextFieldWithCounter
              maxLength={20}
              disabled={isEditPage}
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
                disabled={isEditPage}
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
            disabled={isEditPage}
            error={!!errors.options}
            options={watch('options')}
            deleteOption={deleteOption}
          />
          <FormHelperText error={!!errors.options}>
            {errors.options?.message}
          </FormHelperText>
          <Button
            loading={submitLoading}
            className="w-full h-11 mt-5! lg:mt-6!"
            variant="contained"
            type="submit"
          >
            {isEditPage ? 'Edit' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreatePoll;
