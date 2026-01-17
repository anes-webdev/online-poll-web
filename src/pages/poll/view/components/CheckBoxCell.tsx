import Checkbox from '@mui/material/Checkbox';
import type { ChangeEvent } from 'react';
import type { Option } from '../../../../network/hooks/main/usePoll';

type CheckBoxProps = {
  onCheckBoxClick: (event: ChangeEvent<HTMLInputElement>) => void;
  option: Option;
};

const CheckBoxCell = ({ onCheckBoxClick, option }: CheckBoxProps) => {
  return (
    <td className="text-center text-gray-700">
      <div className="m-0.5 bg-gray-50 rounded-md">
        <Checkbox onChange={onCheckBoxClick} value={option.id} />
      </div>
    </td>
  );
};
export default CheckBoxCell;
