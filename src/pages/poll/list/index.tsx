import { useState } from 'react';
import { useNavigate } from 'react-router';
import PollItem from './components/PollItem';
import { APP_ROUTES } from '../../../constants/routes';
import DeleteModal from './components/DeleteModal';
import { Button, Skeleton } from '@mui/material';
import { usePoll } from '../../../network/hooks/main/usePoll';
import { useGetPolls } from '../../../network/hooks/get/useGetPolls';
import { useAlert } from '../../../hooks/useAlert';
import { ErrorSection } from '../../../components/ErrorSection/ErrorSection';
import { DEFAULT_ERROR } from '../../../constants/errorMessages';

// Todo: add search and sort
// Todo: change mui red color - Its too dark
// Todo: Add dayjs to the project and handle default sort of polls list
// Todo: remove hover from all icons - And add it when its really needed

const PollList = () => {
  const navigate = useNavigate();
  const { deletePoll } = usePoll();
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

  const pollsList = polls?.map((poll, index) => {
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
        <Button
          onClick={navigateToCreatePoll}
          variant="outlined"
          color="neutral"
          className="mt-6"
        >
          Create Poll
        </Button>
      </ErrorSection>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <>
          <Button
            onClick={navigateToCreatePoll}
            variant="outlined"
            color="neutral"
          >
            Create Poll
          </Button>
          <div className="mt-5">{pollsList}</div>
        </>
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
