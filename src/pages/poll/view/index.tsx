import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useParams } from 'react-router';
// import './PollDetails.css';
import { useGetPoll } from '../../../network/hooks/get/useGetPoll';
import { Button } from '@mui/material';
import { useAlert } from '../../../hooks/useAlert';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { usePoll } from '../../../network/hooks/main/usePoll';
import { usePollLink } from '../../../hooks/usePollLink';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import OptionCell from './components/OptionCell';
import SelectedCell from './components/SelectedCell';
import UnSelectedCell from './components/UnSelectedCell';
import NameCell from './components/NameCell';
import CheckBoxCell from './components/CheckBoxCell';

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error?.message) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5">
        <h2 className="text-center text-gray-600 text-xl">{error.message}</h2>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5">
        <h2 className="text-center text-gray-600 text-xl"> No data </h2>
      </div>
    );
  }

  const tableHeader = poll.options.map((option) => {
    let limitedTextLength = option.optionName;
    if (option.optionName.trim().length > 10) {
      limitedTextLength = option.optionName.trim().substring(0, 10) + '..';
    }
    return (
      <OptionCell
        key={option.id}
        option={option}
        limitedTextLength={limitedTextLength}
      />
    );
  });

  const tableBody = poll.participants.map((participant, index) => {
    const choicesRow = poll.options.map((option, index) => {
      const filteredChoices = participant.choices.filter((choice) => {
        return choice.id === option.id;
      });
      if (filteredChoices.length > 0) {
        return <SelectedCell key={index} />;
      } else {
        return <UnSelectedCell key={index} />;
      }
    });

    return (
      <tr key={index}>
        <NameCell key={index} participant={participant} />
        {choicesRow}
      </tr>
    );
  });

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
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-4">
      <div className="px-2">
        <h2 className="text-4xl text-gray-700 font-thin">{poll.title}</h2>
        <p className="text-lg mt-5 font-normal text-gray-700">
          {poll.description}
        </p>
      </div>
      <div className="mt-6 overflow-scroll sm:overflow-auto">
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="p-4 w-44 min-w-44"></th>
              {tableHeader}
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
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
