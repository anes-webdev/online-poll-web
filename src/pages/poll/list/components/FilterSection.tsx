import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SORT_OPTIONS } from '../constants/sortOptions';
import { generateOptionValue } from '../utils/generateOptionValue';

type FilterSectionProps = {
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  sortInput: string;
};

export const FilterSection = (props: FilterSectionProps) => {
  const { onSearch, onSort, sortInput } = props;

  const [searchInput, setSearchInput] = useState('');

  const onSortChange = (event: any) => {
    onSort(event.target.value);
  };

  const onSearchChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput);
    }, 600);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [onSearch, searchInput]);

  return (
    <div className="flex justify-between gap-4 mt-6">
      <TextField
        error={false}
        className="w-70!"
        label="Search"
        variant="outlined"
        hiddenLabel
        size="small"
        onChange={onSearchChange}
        value={searchInput}
      />
      <div>
        <Select
          size="small"
          className="pr-0!"
          value={sortInput}
          renderValue={() => ''}
          onChange={onSortChange}
          IconComponent={SortIcon}
          sx={{
            '& .MuiSelect-icon': {
              transform: 'none !important',
              transition: 'none !important',
            },
            '& .MuiSelect-select': {
              paddingRight: '26px !important',
            },
          }}
        >
          {SORT_OPTIONS.map((sortOption, index) => {
            const { label } = sortOption;
            return (
              <MenuItem key={index} value={generateOptionValue(sortOption)}>
                <Typography color="textPrimary">{label}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
};
