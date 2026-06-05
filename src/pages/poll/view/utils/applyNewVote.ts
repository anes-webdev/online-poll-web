import type { Participant, Poll } from '../../../../api/polls/polls.types';

export const applyNewVote = (oldData: Poll, participant: Participant) => {
  if (!oldData) return oldData;
  // If the participant and vote already exists:
  if (oldData.participants.some((p) => p.id === participant.id)) return oldData;
  // Apply new vote:
  const choiceIds = participant.choices?.map((choice) => choice.id);
  const updatedParticipants = [...oldData.participants, participant];
  const updatedOptions = oldData.options.map((option) => {
    const isSelected = choiceIds?.includes(option.id);
    if (isSelected) {
      const newParticipants = [
        ...option.participants!,
        { id: participant.id, name: participant.name },
      ];
      return {
        ...option,
        participants: newParticipants,
      };
    }
    return option;
  });

  return {
    ...oldData,
    options: updatedOptions,
    participants: updatedParticipants,
  };
};
