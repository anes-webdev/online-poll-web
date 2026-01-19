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
  // Todo: handle these colors by palette - use hash:
  const backgroundColor = isSelected
    ? 'oklch(92.5% 0.084 155.995)'
    : 'oklch(88.5% 0.062 18.334)';
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
