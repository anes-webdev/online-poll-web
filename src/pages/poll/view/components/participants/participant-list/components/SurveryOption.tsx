import { Checkbox, Typography } from '@mui/material';
import '../styles.css';
import { ChoiceStatus } from './ChoiceStatus';
import type {
  Option,
  Participant,
} from '../../../../../../../api/polls/polls.types';

type SurveyOptionProps = {
  option: Option;
  allParticipants: Participant[];
};
// Todo: Refactor component:
// Todo: Move this component to another folder:
export const SurveyOption = ({
  option,
  allParticipants,
}: SurveyOptionProps) => {
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
