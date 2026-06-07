export const useStoreVotes = () => {
  const prevVotes = JSON.parse(localStorage.getItem('votes') || '[]');
  const addVote = (pollId: string) => {
    localStorage.setItem(
      'votes',
      JSON.stringify(prevVotes ? [...prevVotes, pollId] : [pollId]),
    );
  };
  return { prevVotes, addVote };
};
