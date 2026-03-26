import '../styles.css';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { TapTooltip } from '../../../../../../components/TapTooltip/TapTooltip';
import { useMemo } from 'react';
import { groupArray } from '../../../../../../utils/groupArray';
import { ChoiceStatusIcon } from '../../participants/common/ChoiceStatusIcon';

const TOOLTIP_PLACEMENT = {
  mobile: {
    isSelected: 'left-end',
    notSelected: 'left-start',
  },
  desktop: {
    isSelected: 'top-end',
    notSelected: 'top-start',
  },
};

const findTooltipLocation = (isMobile: boolean, isSelected: boolean) => {
  return TOOLTIP_PLACEMENT[isMobile ? 'mobile' : 'desktop'][
    isSelected ? 'isSelected' : 'notSelected'
  ];
};

export type ChoiceStatusProps = {
  isSelected: boolean;
  participants: string[];
};

export const ChoiceStatus = ({
  isSelected,
  participants,
}: ChoiceStatusProps) => {
  const theme = useTheme();
  const showTooltip = participants.length > 0;
  const bgClass = isSelected ? 'bg-green-200' : 'bg-red-200';
  const textClass = isSelected ? 'text-green-600' : 'text-red-600';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const placement = findTooltipLocation(isMobile, isSelected);

  const groupedParticipants = useMemo(() => {
    return groupArray(participants, isMobile ? 2 : 3);
  }, [isMobile, participants]);

  const title = useMemo(() => {
    return groupedParticipants.map((group, i) => {
      return (
        <p className="max-w-34! sm:max-w-full!" key={i}>
          {group.map((name, i) => (
            <span className="text-sm font-normal" key={i}>
              {`${name}${group.length === i + 1 ? '' : ', '}`}
            </span>
          ))}
        </p>
      );
    });
  }, [groupedParticipants]);

  return (
    <TapTooltip title={showTooltip && title} placement={placement as any}>
      <div className={'choice-status ' + bgClass}>
        <ChoiceStatusIcon isSelected={isSelected} size="small" />
        <Typography variant="caption" className={'font-medium! ' + textClass}>
          {participants.length}
        </Typography>
      </div>
    </TapTooltip>
  );
};

//   const backgroundColor = isSelected ? '#bbf7d0' : '#fecaca';
