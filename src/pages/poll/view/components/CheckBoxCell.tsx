import Checkbox from '@mui/material/Checkbox';
import type { ChangeEvent } from 'react';
import type { Option } from '../../../../network/hooks/main/usePoll';
import '../styles.css';

type CheckBoxProps = {
  onCheckBoxClick: (event: ChangeEvent<HTMLInputElement>) => void;
  option: Option;
};

const CheckBoxCell = ({ onCheckBoxClick, option }: CheckBoxProps) => {
  return (
    <td className="text-center">
      <div className="poll-table-cell py-0 px-0 bg-gray-100">
        <Checkbox onChange={onCheckBoxClick} value={option.id} />
      </div>
    </td>
  );
};
export default CheckBoxCell;
