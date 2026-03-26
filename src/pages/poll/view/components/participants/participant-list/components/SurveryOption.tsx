import { Checkbox, Typography } from '@mui/material';
import '../styles.css';
import { OptionStatus } from './OptionStatus';
import type {
  Option,
  Participant,
} from '../../../../../../../api/polls/polls.types';
import { useSelectOption } from '../../common/hooks/useSelectOption';

type SurveyOptionProps = {
  option: Option;
  allParticipants: Participant[];
  disabled: boolean;
};
// Todo: Refactor component:
// Todo: Move this component to another folder:
export const SurveyOption = ({
  option,
  allParticipants,
  disabled,
}: SurveyOptionProps) => {
  const onSelectOption = useSelectOption();

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
          <OptionStatus
            isSelected={true}
            participants={selectedParticipantsName as string[]}
          />
          <OptionStatus
            isSelected={false}
            participants={notSelectedParticipantsName}
          />
        </div>
      </div>
      <div className="checkbox-container">
        <Checkbox
          value={option.id}
          disabled={disabled}
          onChange={onSelectOption}
        />
      </div>
    </li>
  );
};
