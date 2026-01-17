import type {
  Option,
  Participant,
} from '../../../../network/hooks/main/usePoll';
import { useState } from 'react';
import { Tooltip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import '../styles.css';

type ChoiceCellProps = {
  isSelected: boolean;
};

const ChoiceCell = ({ isSelected }: ChoiceCellProps) => {
  const backgroundColor = (isSelected ? 'bg-green' : 'bg-red') + '-200';
  const iconColor = (isSelected ? 'text-green' : 'text-red') + '-600';
  const icon = isSelected ? (
    <DoneIcon className={iconColor} />
  ) : (
    <CloseIcon className={iconColor} />
  );
  return (
    <td className="text-center">
      <div className={`poll-table-cell ${backgroundColor}`}>{icon}</div>
    </td>
  );
};

type NameCellProps = {
  name: string;
};

const NameCell = ({ name }: NameCellProps) => {
  const [isToolTipDisplayed, setIsToolTipDisplayed] = useState(false);

  if (name.trim().length > 16) {
    name = name.trim().substring(0, 16);
  }

  const onParticipantNameClick = () => {
    setIsToolTipDisplayed(true);
    setTimeout(() => {
      setIsToolTipDisplayed(false);
    }, 2000);
  };

  return (
    <td>
      <Tooltip
        onClick={onParticipantNameClick}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top-start"
        title={name}
        open={isToolTipDisplayed}
      >
        <div className="poll-table-cell bg-blue-100">
          <Typography color="textPrimary" className="limit-line-1!">
            {name}
          </Typography>
        </div>
      </Tooltip>
    </td>
  );
};

type ChoicesRowProps = {
  options: Option[];
  participantId: number;
};

const ChoicesRow = ({ options, participantId }: ChoicesRowProps) => {
  return (
    <>
      {options.map((option) => {
        const isSelected = option.participants?.some(
          ({ id }) => id === participantId,
        ) as boolean;
        return <ChoiceCell isSelected={isSelected} />;
      })}
    </>
  );
};

type TableBodyProps = {
  participants: Participant[];
  options: Option[];
};

export const TableBody = ({ participants, options }: TableBodyProps) => {
  return (
    <tbody>
      {participants.map((participant, index) => {
        return (
          <tr key={index}>
            <NameCell name={participant.name} />
            <ChoicesRow options={options} participantId={participant.id} />
          </tr>
        );
      })}
    </tbody>
  );
};
