import { Typography } from '@mui/material';
import noResultsImg from '../../../../assets/no-results.jpeg';

export const SearchNoResults = () => {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <img src={noResultsImg} className="max-w-50" />
      <Typography className="text-center" variant="body2" color="textMuted">
        No results found for your search
      </Typography>
    </div>
  );
};
