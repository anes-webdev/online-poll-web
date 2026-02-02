import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import type {
  Option,
  Participant,
} from '../../../../api/hooks/polls/polls.api';
import '../styles.css';

type ChoiceCellProps = {
  isSelected: boolean;
};

const ChoiceCell = ({ isSelected }: ChoiceCellProps) => {
  const backgroundColor = isSelected ? '#bbf7d0' : '#fecaca';
  const icon = isSelected ? (
    <DoneIcon className="text-green-600" />
  ) : (
    <CloseIcon className="text-red-600" />
  );
  return (
    <td className="text-center">
      <div
        style={{ backgroundColor: backgroundColor }}
        className="poll-table-cell"
      >
        {icon}
      </div>
    </td>
  );
};

type NameCellProps = {
  name: string;
};

const NameCell = ({ name }: NameCellProps) => {
  const [isToolTipDisplayed, setIsToolTipDisplayed] = useState(false);

  const onParticipantNameClick = () => {
    setIsToolTipDisplayed(true);
    setTimeout(() => {
      setIsToolTipDisplayed(false);
    }, 3000);
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
          {/* Handle this by truncated text */}
          <Typography color="textPrimary" className="participant-name">
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
        return <ChoiceCell key={option.id} isSelected={isSelected} />;
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
      {participants.map(({ id, name }, index) => {
        return (
          <tr key={index}>
            <NameCell name={name} />
            <ChoicesRow options={options} participantId={id} />
          </tr>
        );
      })}
    </tbody>
  );
};
