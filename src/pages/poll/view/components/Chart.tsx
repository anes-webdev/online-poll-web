import { Dialog, IconButton } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import CloseIcon from '@mui/icons-material/Close';
import { palette } from '../../../../styles/palette';
import type { Option } from '../../../../api/polls/polls.types';
import { truncateText } from '../../../../utils/TruncateText';

const COLORS = [
  '#C8E6C9',
  '#80CBC4',
  '#4DD0E1',
  '#29B6F6',
  '#1976D2',
  '#FFB74D',
  '#F06292',
];

type ChartProps = {
  isOpen: boolean;
  onClose: () => void;
  options: Option[];
};

export const Chart = ({ isOpen, onClose, options }: ChartProps) => {
  const xLabels = options.map((option) => {
    const label = option.optionName;
    return label;
  });
  const data = options.map((option) => option.participants?.length) as number[];
  const categoryGapRatio = xLabels.length < 5 ? 0.5 : 0.3;
  const labelFontSize = xLabels.length < 6 ? 16 : 14;

  if (isOpen)
    return (
      <Dialog
        slotProps={{
          paper: {
            sx: {
              maxWidth: '95% !important',
              paddingTop: '16px',
              paddingRight: '16px',
            },
          },
        }}
        open={isOpen}
      >
        <div className="flex justify-end">
          <IconButton onClick={onClose}>
            <CloseIcon color="action" />
          </IconButton>
        </div>
        <BarChart
          series={[
            {
              data: data,
            },
          ]}
          height={480}
          width={950}
          grid={{ horizontal: true }}
          xAxis={[
            {
              data: xLabels,
              valueFormatter: (label, context) => {
                return context.location === 'tooltip'
                  ? label
                  : truncateText(label, 14);
              },
              height: 34,
              tickLabelStyle: {
                fill: palette.fg.secondary,
              },
              disableTicks: true,
              colorMap: {
                type: 'ordinal',
                colors: COLORS,
              },
              scaleType: 'band',
              categoryGapRatio: categoryGapRatio,
            },
          ]}
          yAxis={[
            {
              width: 34,
              tickMinStep: 1,
              disableTicks: true,
              tickLabelStyle: {
                fill: palette.fg.muted,
              },
              disableLine: true,
            },
          ]}
          borderRadius={8}
          sx={{
            '& .MuiChartsAxis-tickLabel': {
              fontSize: `${labelFontSize}px !important`,
            },
            '& .MuiChartsAxis-root line': {
              stroke: palette.border.default,
              strokeWidth: 1,
            },
            '& .MuiChartsGrid-line': {
              stroke: palette.border.default,
              strokeWidth: 0.5,
              strokeDasharray: '4 2',
            },
          }}
        />
      </Dialog>
    );
};
