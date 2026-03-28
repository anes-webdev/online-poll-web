import { FormProvider } from 'react-hook-form';
import type { Poll } from '../../../../../../api/polls/polls.types';
import { useRegisterVoteForm } from '../common/hooks/useRegisterVoteForm';
import { SurveyOption } from './components/SurveyOption';
import './styles.css';
import { NameTextField } from '../common/components/NameTextField';
import { Button } from '@mui/material';
import type { RegisterVoteData } from '../../../../../../schemas/pollSchema';
import { ALREADY_VOTED_MESSAGE } from '../common/constants/infoMessages';
import { InfoMessage } from '../../../../../../components/InfoMessage/InfoMessage';
import { memo } from 'react';

type SurveyOptionsListProps = {
  poll: Poll;
  alreadyVoted: boolean;
};

const SurveyOptionsList = ({ poll, alreadyVoted }: SurveyOptionsListProps) => {
  // Todo: Should I pass classes to ul tag?
  // Todo: should I use ul, li for all lists?
  return (
    <ul className="flex flex-col gap-2">
      {poll.options.map((option) => {
        return (
          <SurveyOption
            disabled={alreadyVoted}
            option={option}
            allParticipants={poll.participants}
            key={option.id}
          />
        );
      })}
    </ul>
  );
};

const MemoizedSurveyOptionsList = memo(SurveyOptionsList);

type ParticipantListProps = {
  poll: Poll;
  alreadyVoted: boolean;
  submitLoading: boolean;
  onSubmit: (formData: RegisterVoteData) => Promise<void>;
  onSubmitError: (errors: any) => void;
};

export const ParticipantList = (props: ParticipantListProps) => {
  const { poll, alreadyVoted, onSubmit, onSubmitError, submitLoading } = props;
  const methods = useRegisterVoteForm();
  const { handleSubmit } = methods;

  return (
    <div className="flex justify-center">
      <div className="w-120">
        <FormProvider {...methods}>
          <MemoizedSurveyOptionsList poll={poll} alreadyVoted={alreadyVoted} />
          {/* Todo: Change the placement of this message: */}
          {alreadyVoted && (
            <InfoMessage
              className="my-2! text-right"
              text={ALREADY_VOTED_MESSAGE}
            />
          )}
          <div className="mt-2.5 flex justify-end gap-2">
            {/* Todo: Handle the size of this text field: */}
            <NameTextField className="w-46" disabled={alreadyVoted} />
            <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
              <Button
                disabled={alreadyVoted}
                loading={submitLoading}
                type="submit"
                className=""
                variant="contained"
              >
                Save
              </Button>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
