import { Checkbox, Typography } from '@mui/material';
import type {
  Option,
  Participant,
  Poll,
} from '../../../../../api/polls/polls.types';
import { ChoiceStatus } from './components/ChoiceStatus';
import './styles.css';

type SurveyOptionProps = {
  option: Option;
  allParticipants: Participant[];
};
// Todo: Refactor component:
// Todo: Move this component to another folder:
const SurveyOption = ({ option, allParticipants }: SurveyOptionProps) => {
  // Todo: Use a better name:

  const selectedParticipantsName = option.participants?.map(
    (item) => item.name,
  );
  const notSelectedParticipantsName = allParticipants
    .filter(
      (item) =>
        !option.participants?.some((participant) => participant.id === item.id),
    )
    .map((item) => item.name);

  return (
    <li className="flex">
      <div className="survey-option-container">
        <Typography>{option.optionName}</Typography>
        <div className="flex flex-col sm:flex-row gap-2">
          <ChoiceStatus
            isSelected={true}
            participants={selectedParticipantsName as string[]}
          />
          <ChoiceStatus
            isSelected={false}
            participants={notSelectedParticipantsName}
          />
        </div>
      </div>
      <div className="checkbox-container">
        <Checkbox value={option.id} disabled={false} />
      </div>
    </li>
  );
};

type ParticipantListProps = {
  poll: Poll;
};

export const ParticipantList = ({ poll }: ParticipantListProps) => {
  return (
    // Todo: Should I pass classes to ul tag?
    // Todo: should I use ul, li for all lists?
    <div className="flex justify-center">
      <ul className="w-120 flex flex-col gap-2">
        {poll.options.map((option) => {
          return (
            <SurveyOption
              option={option}
              allParticipants={poll.participants}
              key={option.id}
            />
          );
        })}
      </ul>
    </div>
  );
};
