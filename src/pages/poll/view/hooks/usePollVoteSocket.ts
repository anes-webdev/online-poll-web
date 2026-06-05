import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import type { Participant, Poll } from '../../../../api/polls/polls.types';
import { useQueryClient } from '@tanstack/react-query';
import { applyNewVote } from '../utils/applyNewVote';
import { SOCKET_BASE_URL } from '../../../../constants/baseUrls';

export const usePollVoteSocket = (pollId: string, enabled: boolean) => {
  const queryClient = useQueryClient();

  const onNewVoteSocket = useCallback(
    (participant: Participant) => {
      queryClient.setQueryData(
        ['pollVotes', pollId],
        (oldData: Poll | undefined) => {
          return oldData ? applyNewVote(oldData, participant) : oldData;
        },
      );
    },
    [pollId, queryClient],
  );

  useEffect(() => {
    // Disabled on production because of vercel limits in supporting web socket
    if (!enabled || import.meta.env.PROD) return;
    const socket = io(SOCKET_BASE_URL, { withCredentials: true });
    socket.emit('join-poll', pollId);
    socket.on('new-vote', onNewVoteSocket);
    return () => {
      socket.emit('leave-poll', pollId);
      socket.disconnect();
    };
  }, [pollId, onNewVoteSocket, enabled]);
};
