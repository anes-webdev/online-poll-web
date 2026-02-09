import { Typography } from '@mui/material';
import '../styles.css';
import type { Option } from '../../../../api/polls/polls.types';
import { truncateText } from '../../../../utils/truncateText';
import { TapTooltip } from '../../../../components/TapTooltip/TapTooltip';

type CheckBoxProps = {
  option: Option;
};

const OptionCell = ({ option }: CheckBoxProps) => {
  const { optionName } = option;
  return (
    <TapTooltip placement="top" title={optionName}>
      <th className="text-center">
        <div className="poll-table-cell px-2.5 py-2.5 bg-gray-200">
          <Typography color="textPrimary" className="text-sm!" noWrap>
            {truncateText(optionName, 14)}
          </Typography>
        </div>
      </th>
    </TapTooltip>
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
