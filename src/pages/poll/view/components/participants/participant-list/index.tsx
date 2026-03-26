import type { Poll } from '../../../../../../api/polls/polls.types';
import { SurveyOption } from './components/SurveryOption';
import './styles.css';

type ParticipantListProps = {
  poll: Poll;
};

export const ParticipantList = ({ poll }: ParticipantListProps) => {
  return (
    // Todo: Should I pass classes to ul tag?
    // Todo: should I use ul, li for all lists?
    <div className="flex justify-center">
      <ul className="w-120 flex flex-col gap-2">
        {poll.options.map((option) => {
          return (
            <SurveyOption
              option={option}
              allParticipants={poll.participants}
              key={option.id}
            />
          );
        })}
      </ul>
    </div>
  );
};
