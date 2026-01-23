export type SortByField = 'created_at' | 'participants';
export type SortOrderField = 'asc' | 'desc';

export type SortOption = {
  label: string;
  sortBy: SortByField;
  sortOrder: SortOrderField;
};

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Newest first',
    sortBy: 'created_at',
    sortOrder: 'desc',
  },
  {
    label: 'Oldest first',
    sortBy: 'created_at',
    sortOrder: 'asc',
  },
  {
    label: 'Most participants',
    sortBy: 'participants',
    sortOrder: 'desc',
  },
  {
    label: 'Fewest participants',
    sortBy: 'participants',
    sortOrder: 'asc',
  },
];
