// import Modal from '../UI/Modal';
import { useDispatch } from 'react-redux';
// import { modalAction } from '../../store/modal-slice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// import LoadingSpinner from '../UI/LoadingSpinner';
// import { alertAction } from '../../store/alert-slice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { API_BASE_URL } from '../../../constants/api';
import { authAction } from '../../../store/slices/auth';
import PollItem from './components/PollItem';
import type { RootState } from '../../../store';
import Button from '../../../components/button/Button';
import { APP_ROUTES } from '../../../constants/routes';
import DeleteModal from './components/DeleteModal';
import { Skeleton } from '@mui/material';

// Todo: add search and sort
// Todo: change mui red color - Its too dark

const PollList = () => {
  const [deletingPoll, setDeletingPoll] = useState('');
  const [deletePollLoading, setDeletePollLoading] = useState(false);
  const showDeleteModal = !!deletingPoll;
  const closeDeleteModal = () => setDeletingPoll('');

  const [fetchedPolls, setFetchedPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllPolls = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://${API_BASE_URL}/poll/find-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response.status > 399) {
        if (response.status === 403) {
          dispatch(authAction.logout());
          navigate('../');
        }
        throw new Error('Some thing went wrong');
      }

      const data = await response.json();
      if (data.length === 0) {
        setError('No polls found');
        return;
      }
      //   setError('');
      setFetchedPolls(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    getAllPolls();
  }, [getAllPolls]);

  const onDeletePollIconClick = (pollSlug: string) => setDeletingPoll(pollSlug);
  const onEditPollIconClick = (pollSlug: string) =>
    navigate(APP_ROUTES.EDIT_POLL.build(pollSlug));

  const deletePoll = async () => {
    try {
      setDeletePollLoading(true);
      const response = await fetch(
        `http://${API_BASE_URL}/poll/delete/${deletingPoll}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      if (response.status > 399) {
        if (response.status === 403) {
          dispatch(authAction.logout());
          navigate('../');
        }
        throw new Error('Some thing went wrong');
      }
      closeDeleteModal();
      //   dispatch(
      //     alertAction.showAlert({
      //       message: 'Poll successFully deleted',
      //       type: 'success',
      //     }),
      //   );
      await getAllPolls();
    } catch (error) {
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

  const pollsList = fetchedPolls.map((poll, index) => {
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
            {error === 'No polls found' && (
              <h2 className="text-center text-gray-600 text-xl mt-4">
                {error}
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
          onConfirm={deletePoll}
          confirmLoading={deletePollLoading}
          onClose={closeDeleteModal}
        />
      )}
    </>
  );
};
export default PollList;
