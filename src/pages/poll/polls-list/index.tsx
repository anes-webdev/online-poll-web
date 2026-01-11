import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { alertAction } from '../../store/alert-slice';
import { authAction } from '../../../store/slices/auth';
import PollItem from './components/PollItem';
import Button from '../../../components/button/Button';
import { APP_ROUTES } from '../../../constants/routes';
import DeleteModal from './components/DeleteModal';
import { Skeleton } from '@mui/material';
import { usePolls } from '../../../network/hooks/usePolls';
import { deletePoll } from '../../../network/polls';

// Todo: add search and sort
// Todo: change mui red color - Its too dark
// Todo: handle response 403 then logout in axios

const PollList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deletingPoll, setDeletingPoll] = useState('');
  const [deletePollLoading, setDeletePollLoading] = useState(false);
  const showDeleteModal = !!deletingPoll;
  const closeDeleteModal = () => setDeletingPoll('');

  const { data: polls, isLoading, error, refetch } = usePolls();
  const emptyList = polls?.length === 0;

  const onDeletePollIconClick = (pollSlug: string) => setDeletingPoll(pollSlug);
  const onEditPollIconClick = (pollSlug: string) =>
    navigate(APP_ROUTES.EDIT_POLL.build(pollSlug));

  const onDeletePoll = async () => {
    try {
      setDeletePollLoading(true);
      await deletePoll(deletingPoll);
      closeDeleteModal();
      //   dispatch(
      //     alertAction.showAlert({
      //       message: 'Poll successFully deleted',
      //       type: 'success',
      //     }),
      //   );
      refetch();
    } catch (error: any) {
      if (error.status === 403) {
        dispatch(authAction.logout());
        navigate(APP_ROUTES.LANDING);
      }
      //   dispatch(
      //     alertAction.showAlert({
      //       message: error.message,
      //       type: 'error',
      //     }),
      //   );
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
              component="a"
              href={APP_ROUTES.ADD_POLL}
              variant="outlined"
              color="neutral"
            >
              Create Poll
            </Button>
            {/* Todo: handle this error and refactor it: */}
            {error && (
              <h2 className="text-center text-gray-600 text-xl mt-4">
                {error?.message}
              </h2>
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
