export const useStoreVotes = () => {
  const prevVotes = JSON.parse(localStorage.getItem('votes') || '[]');
  const addVote = (pollSlug: string) => {
    localStorage.setItem(
      'votes',
      JSON.stringify(prevVotes ? [...prevVotes, pollSlug] : [pollSlug]),
    );
  };
  return { prevVotes, addVote };
};
