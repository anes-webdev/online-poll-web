import { useState } from 'react';
import { useNavigate } from 'react-router';
import PollItem from './components/PollItem';
import { APP_ROUTES } from '../../../constants/routes';
import DeleteModal from './components/DeleteModal';
import { Button, Skeleton, Typography } from '@mui/material';
import { usePoll } from '../../../network/hooks/main/usePoll';
import { useGetPolls } from '../../../network/hooks/get/useGetPolls';
import { useAlert } from '../../../hooks/useAlert';

// Todo: add search and sort
// Todo: change mui red color - Its too dark
// Todo: Add dayjs to the project and handle default sort of polls list

const PollList = () => {
  const navigate = useNavigate();
  const { deletePoll } = usePoll();
  const alert = useAlert();

  const [deletingPoll, setDeletingPoll] = useState('');
  const [deletePollLoading, setDeletePollLoading] = useState(false);
  const showDeleteModal = !!deletingPoll;
  const closeDeleteModal = () => setDeletingPoll('');

  const { data: polls, isLoading, error, refetch } = useGetPolls();
  const emptyList = polls?.length === 0;

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

  // Todo: replace this array:
  const skeletonArr = [1, 2, 3];

  const loadingSkeleton = (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-30! h-10! mb-2!" />
      {skeletonArr.map((item, index) => {
        return <Skeleton key={index} className="h-36! w-full!" />;
      })}
    </div>
  );

  // Todo: add empty section here:
  if (emptyList) {
    // Do something here
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          loadingSkeleton
        ) : (
          <>
            <Button
              onClick={navigateToCreatePoll}
              variant="outlined"
              color="neutral"
            >
              Create Poll
            </Button>
            {/* Todo: handle this error and refactor it: */}
            {error && (
              <>
                <Typography
                  color="textSecondary"
                  className="text-center mt-4"
                  variant="h5"
                >
                  {error?.message}
                </Typography>
              </>
            )}
            <div className="mt-5">{pollsList}</div>
          </>
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          title="Are you sure you want to delete this poll?"
          description="All data related to this poll includes participants and options will be lost"
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
