import Tooltip from '@mui/material/Tooltip';
import type { Option } from '../../../../network/hooks/main/Poll';
import { Typography } from '@mui/material';
import '../styles.css';

type CheckBoxProps = {
  option: Option;
};

const OptionCell = ({ option }: CheckBoxProps) => {
  const { optionName } = option;
  let truncated = optionName;
  if (optionName.trim().length > 12) {
    truncated = optionName.trim().substring(0, 12) + '...';
  }
  return (
    <Tooltip placement="top" title={optionName}>
      <th className="text-center">
        <div className="poll-table-cell py-2.5 bg-gray-200">
          <Typography color="textPrimary" noWrap>
            {truncated}
          </Typography>
        </div>
      </th>
    </Tooltip>
  );
};
export default OptionCell;

type TableHeadProps = {
  options: Option[];
};

export const TableHead = ({ options }: TableHeadProps) => {
  return (
    <thead>
      <tr>
        <th className="p-4 w-44 min-w-44"></th>
        {options.map((option) => {
          return <OptionCell key={option.id} option={option} />;
        })}
      </tr>
    </thead>
  );
};
