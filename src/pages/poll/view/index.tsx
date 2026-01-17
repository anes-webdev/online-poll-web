import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useParams } from 'react-router';
// import './PollDetails.css';
import { useGetPoll } from '../../../network/hooks/get/useGetPoll';
import { Button, Typography } from '@mui/material';
import { useAlert } from '../../../hooks/useAlert';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { usePoll } from '../../../network/hooks/main/usePoll';
import { usePollLink } from '../../../hooks/usePollLink';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import CheckBoxCell from './components/CheckBoxCell';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';

const PollView = () => {
  const alert = useAlert();
  const { registerVote } = usePoll();
  const { showPollLink } = usePollLink();
  const params = useParams<{ pollSlug: string }>();
  const pollSlug = params.pollSlug as string;

  const [nameInputValue, setNameInputValue] = useState('');
  const [isNameInputInvalid, setIsNameInputInvalid] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { data: poll, isLoading, error } = useGetPoll(pollSlug);

  const onCheckBoxClick = (event) => {
    const selectedOptionId = +event.target.value;
    const checkBoxValue = event.target.checked;
    setSelectedOptions((state) => {
      let updatedState = [];
      if (checkBoxValue) {
        return [...state, selectedOptionId];
      } else {
        updatedState = state.filter((optionId) => {
          return optionId !== selectedOptionId;
        });
        return updatedState;
      }
    });
  };

  const onSaveButtonClick = async () => {
    if (nameInputValue.trim().length === 0 || selectedOptions.length === 0) {
      if (nameInputValue.trim().length === 0) {
        setIsNameInputInvalid(true);
      }
      if (selectedOptions.length === 0) {
        alert('No option selected', 'error');
      }
      return;
    }

    const reqBody = {
      name: nameInputValue,
    };

    setSubmitLoading(true);
    try {
      await registerVote(selectedOptions.toString(), reqBody);
      showPollLink(pollSlug, 'The vote successfully registered');
    } catch (error: any) {
      alert(error.response.message || DEFAULT_ERROR, 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Todo:Handle loading with skeleton:
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error?.message) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <h2 className="text-center text-gray-600 text-xl">{error.message}</h2>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <h2 className="text-center text-gray-600 text-xl"> No data </h2>
      </div>
    );
  }

  const tableSelectionRow = poll.options.map((option) => {
    return (
      <CheckBoxCell
        key={option.id}
        option={option}
        onCheckBoxClick={onCheckBoxClick}
      />
    );
  });

  const tableVoteNumberRow = poll.options.map((option) => {
    return (
      <td key={option.id} className="text-center text-gray-700">
        <div className="m-0.5 py-2 rounded-md">
          {option.participants?.length}
        </div>
      </td>
    );
  });

  return (
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      <div className="md:px-4">
        <Typography variant="h4" className="font-thin!" color="textPrimary">
          {poll.title}
        </Typography>
        <Typography className="mt-5! font-normal! text-lg!" color="textPrimary">
          {poll.description}
        </Typography>
      </div>
      <div className="mt-8 overflow-scroll sm:overflow-auto">
        <table className="mx-auto">
          <TableHead options={poll.options} />
          <TableBody options={poll.options} participants={poll.participants} />
          <tfoot>
            <tr>
              <td className="text-gray-700">
                <div className="m-0.5 py-1 rounded-md">
                  <TextField
                    error={isNameInputInvalid}
                    className="w-full"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={nameInputValue}
                    onChange={(e) => {
                      setIsNameInputInvalid(false);
                      setNameInputValue(e.target.value);
                    }}
                  />
                </div>
              </td>
              {tableSelectionRow}
            </tr>
            <tr>
              <td className="text-gray-700">
                <div className="m-0.5 py-1 rounded-md">
                  <Button
                    loading={submitLoading}
                    onClick={onSaveButtonClick}
                    type="button"
                    className="w-1/3 h-9"
                    variant="contained"
                  >
                    Save
                  </Button>
                </div>
              </td>
              {tableVoteNumberRow}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default PollView;
