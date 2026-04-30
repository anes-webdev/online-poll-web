import { useFormContext } from 'react-hook-form';
import type { RegisterVoteData } from '../../../../../../../schemas/pollSchema';
import type { ChangeEvent } from 'react';

export const useSelectOption = () => {
  const { setValue, watch } = useFormContext<RegisterVoteData>();
  const onSelectOption = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const optionId = +value;
    const choices = [...watch('choices')];
    const updatedChoices = checked
      ? [...choices, optionId]
      : choices.filter((choiceId) => choiceId !== optionId);
    setValue('choices', updatedChoices);
  };
  return onSelectOption;
};
