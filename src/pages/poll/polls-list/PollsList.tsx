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
import PollItem from './PollItem';
import type { RootState } from '../../../store';
import Button from '../../../components/button/Button';
import { APP_ROUTES } from '../../../constants/routes';

const PollList = () => {
  const [deletingPoll, setDeletingPoll] = useState('');
  const [editingPoll, setEditingPoll] = useState('');
  const showDeleteModal = deletingPoll;
  const showEditModal = editingPoll;

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
      setIsLoading(false);
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
      setIsLoading(false);
      setError(err.message);
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    getAllPolls();
  }, [getAllPolls]);

  const onDeletePollIconClick = (pollSlug: string) => setDeletingPoll(pollSlug);
  const onEditPollIconClick = (pollSlug: string) => setEditingPoll(pollSlug);

  const deletePoll = async () => {
    try {
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

  // Todo: add skeleton here:
  if (isLoading) {
    return 'Loading...';
    // return <LoadingSpinner />;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
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
          <h2 className="text-center text-gray-600 text-xl mt-4">{error}</h2>
        )}
        <div className="mt-5">{pollsList}</div>
      </div>

      {/* {isDeleteModalDisplayed && (
        <Modal
          handleYes={() => {
            deletePoll();
          }}
          hideModal={() => {
            setIsDeleteModalDisplayed(false);
          }}
        />
      )}
      {isEditModalDisplayed && (
        <Modal
          handleYes={() => {
            navigate(`../editPoll/${selectedPollForEdit}`);
          }}
          hideModal={() => {
            setIsEditModalDisplayed(false);
          }}
        />
      )} */}
    </>
  );
};
export default PollList;
