import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Typography } from '@mui/material';
import '../styles.css';
import type { Option, Participant } from '../../../../api/polls/polls.types';
import { TapTooltip } from '../../../../components/TapTooltip/TapTooltip';
import { truncateText } from '../../../../utils/truncateText';

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
  return (
    <td>
      <TapTooltip placement="top-start" title={name}>
        <div className="poll-table-cell bg-blue-100">
          <Typography color="textPrimary" noWrap>
            {truncateText(name, 14)}
          </Typography>
        </div>
      </TapTooltip>
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
