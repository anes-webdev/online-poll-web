import { useState } from 'react';
import { Tooltip } from '@mui/material';
import type { Participant } from '../../../../network/hooks/main/usePoll';
import '../styles.css';

type NameCellProps = {
  participant: Participant;
};

const NameCell = ({ participant }: NameCellProps) => {
  const [isToolTipDisplayed, setIsToolTipDisplayed] = useState(false);

  let participantName = participant.name;
  if (participantName.trim().length > 16) {
    participantName = participantName.trim().substring(0, 16);
  }

  const onParticipantNameClick = () => {
    setIsToolTipDisplayed(true);
    setTimeout(() => {
      setIsToolTipDisplayed(false);
    }, 2000);
  };

  return (
    <td className="text-gray-700">
      <Tooltip
        onClick={onParticipantNameClick}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top-start"
        title={participant.name}
        open={isToolTipDisplayed}
      >
        <div className="px-3.5 m-0.5 py-2 bg-blue-100 rounded-md">
          <p className="limit-line-1">{participantName}</p>
        </div>
      </Tooltip>
    </td>
  );
};
export default NameCell;
