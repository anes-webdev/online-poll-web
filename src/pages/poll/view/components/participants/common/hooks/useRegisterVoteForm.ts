import { useForm } from 'react-hook-form';
import {
  registerVoteSchema,
  type RegisterVoteData,
} from '../../../../../../../schemas/pollSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useRegisterVoteForm = () => {
  const methods = useForm<RegisterVoteData>({
    resolver: zodResolver(registerVoteSchema),
    defaultValues: {
      name: '',
      choices: [],
    },
  });
  return methods;
};
