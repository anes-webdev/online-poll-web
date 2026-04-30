import { FormProvider } from 'react-hook-form';
import { useRegisterVoteForm } from '../common/hooks/useRegisterVoteForm';
import { SurveyOption } from './components/SurveyOption';
import './styles.css';
import { NameTextField } from '../common/components/NameTextField';
import { Button } from '@mui/material';
import type { RegisterVoteData } from '../../../../../../schemas/pollSchema';
import { ALREADY_VOTED_MESSAGE } from '../common/constants/infoMessages';
import { InfoMessage } from '../../../../../../components/InfoMessage/InfoMessage';
import { memo, useContext } from 'react';
import { PollViewContext } from '../store/PollViewContext';

const SurveyOptionsList = () => {
  const { poll, alreadyVoted } = useContext(PollViewContext);
  return (
    <ul className="flex flex-col gap-2">
      {poll?.options.map((option) => {
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
  onSubmit: (formData: RegisterVoteData) => Promise<void>;
  onSubmitError: (errors: any) => void;
};

const ParticipantList = (props: ParticipantListProps) => {
  const { onSubmit, onSubmitError } = props;
  const { alreadyVoted, submitLoading } = useContext(PollViewContext);
  const methods = useRegisterVoteForm();
  const { handleSubmit } = methods;

  return (
    <div className="flex justify-center">
      <div className="w-120">
        <FormProvider {...methods}>
          <MemoizedSurveyOptionsList />
          {alreadyVoted && (
            <InfoMessage
              className="my-2! sm:text-right!"
              text={ALREADY_VOTED_MESSAGE}
            />
          )}
          <div className="mt-3 flex sm:justify-end gap-2">
            <NameTextField className="max-w-46" disabled={alreadyVoted} />
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

export default ParticipantList;
