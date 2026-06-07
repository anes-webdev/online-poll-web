import { Typography } from '@mui/material';
import '../styles.css';
import { OptionStatus } from './OptionStatus';
import type {
  Option,
  Participant,
} from '../../../../../../../api/polls/polls.types';
import { OptionCheckBox } from '../../common/components/OptionCheckBox';

type SurveyOptionProps = {
  option: Option;
  allParticipants: Participant[];
  disabled: boolean;
};

export const SurveyOption = ({
  option,
  allParticipants,
  disabled,
}: SurveyOptionProps) => {
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
        <Typography>{option.name}</Typography>
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
      <OptionCheckBox optionId={option.id} disabled={disabled} />
    </li>
  );
};
