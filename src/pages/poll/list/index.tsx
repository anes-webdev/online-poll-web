import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import PollItem from './components/PollItem';
import { APP_ROUTES } from '../../../constants/routes';
import DeleteModal from './components/DeleteModal';
import { Skeleton } from '@mui/material';
import { deletePoll, type Poll } from '../../../network/hooks/main/Poll';
import { useGetPolls } from '../../../network/hooks/get/useGetPolls';
import { useAlert } from '../../../hooks/useAlert';
import { ErrorSection } from '../../../components/ErrorSection/ErrorSection';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';
import { CreatePollButton } from './components/CreatePollButton';
import { FilterSection } from './components/FilterSection';
import {
  SORT_OPTIONS,
  type SortByField,
  type SortOrderField,
} from './constants/sortOptions';
import { generateOptionValue } from './utils/generateOptionValue';
import { SearchNoResults } from './components/SearchNoResults';

// Todo: change mui red color - Its too dark

const PollList = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const [deletingPoll, setDeletingPoll] = useState('');
  const [deletePollLoading, setDeletePollLoading] = useState(false);
  const showDeleteModal = !!deletingPoll;
  const closeDeleteModal = () => setDeletingPoll('');

  const { data: polls, isLoading, error, refetch } = useGetPolls();

  const onDeletePollIconClick = (pollSlug: string) => setDeletingPoll(pollSlug);
  const onEditPollIconClick = (pollSlug: string) =>
    navigate(APP_ROUTES.EDIT_POLL.build(pollSlug));
  const navigateToCreatePoll = () => {
    navigate(APP_ROUTES.ADD_POLL);
  };

  const onDeletePoll = async () => {
    try {
      setDeletePollLoading(true);
      await deletePoll(deletingPoll);
      closeDeleteModal();
      alert('Poll successfully deleted', 'success');
      refetch();
    } catch (error: any) {
      alert(error.response.data, 'error');
    } finally {
      setDeletePollLoading(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const orderByInitialValue = generateOptionValue(SORT_OPTIONS[0]);
  const [sortInput, setSortInput] = useState(orderByInitialValue);
  const onSearch = useCallback((value: string) => setSearchQuery(value), []);
  const onSort = useCallback((value: string) => {
    setSortInput(value);
  }, []);

  const destructureSortInput = (
    value: string,
  ): { sortBy: SortByField; sortOrder: SortOrderField } => {
    const parts = value.split('_');
    const sortOrder = parts.pop() as SortOrderField;
    const sortBy = parts.join('_') as SortByField;
    return { sortBy, sortOrder };
  };

  const applySearchAndSort = (polls: Poll[] | undefined) => {
    const { sortBy, sortOrder } = destructureSortInput(sortInput);
    const findValues = (poll: Poll) => {
      if (sortBy === 'created_at') return new Date(poll.createdAt).getTime();
      if (sortBy === 'participants') return poll.participants.length;
    };
    const sorted = polls?.sort(
      (a, b) =>
        ((findValues(a) as number) - (findValues(b) as number)) *
        (sortOrder === 'asc' ? 1 : -1),
    );
    const filteredAndSorted = sorted?.filter((poll) =>
      poll.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return filteredAndSorted;
  };

  const pollsList = applySearchAndSort(polls)?.map((poll, index) => {
    return (
      <PollItem
        deletePoll={onDeletePollIconClick}
        editPoll={onEditPollIconClick}
        key={index}
        poll={poll}
      />
    );
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        <Skeleton className="w-30! h-10! mb-2!" />
        {[...Array(3)].map((item, index) => {
          return <Skeleton key={index} className="h-36! w-full!" />;
        })}
      </div>
    );
  }

  if (error) {
    return <ErrorSection message={DEFAULT_ERROR} />;
  }

  if (polls?.length === 0) {
    return (
      <ErrorSection message="There are no polls here">
        <CreatePollButton onClick={navigateToCreatePoll} className="mt-6" />
      </ErrorSection>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <CreatePollButton onClick={navigateToCreatePoll} />
        <FilterSection
          onSearch={onSearch}
          sortInput={sortInput}
          onSort={onSort}
        />
        {pollsList?.length === 0 && <SearchNoResults />}
        <div className="mt-3">{pollsList}</div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          title="Are you sure you want to delete this poll?"
          description="All data related to this poll including participants and options will be lost"
          isOpen={showDeleteModal}
          onConfirm={onDeletePoll}
          confirmLoading={deletePollLoading}
          onClose={closeDeleteModal}
        />
      )}
    </>
  );
};
export default PollList;
