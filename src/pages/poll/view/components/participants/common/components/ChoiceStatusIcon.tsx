import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

type ChoiceStatusIconProps = {
  isSelected: boolean;
  size: 'medium' | 'small';
};

export const ChoiceStatusIcon = ({
  isSelected,
  size,
}: ChoiceStatusIconProps) => {
  const iconFontSize = size === 'medium' ? 24 : 18;
  const colorClass = isSelected ? 'text-green-600' : 'text-red-600';
  return isSelected ? (
    <DoneIcon style={{ fontSize: iconFontSize }} className={colorClass} />
  ) : (
    <CloseIcon style={{ fontSize: iconFontSize }} className={colorClass} />
  );
};
