import type { SortOption } from '../constants/sortOptions';

export const generateOptionValue = (sortOption: SortOption) => {
  const { sortBy, sortOrder } = sortOption;
  return `${sortBy}_${sortOrder}`;
};
