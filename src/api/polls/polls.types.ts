export type Option = {
  id: number;
  name: string;
  participants?: Participant[];
};

export type Participant = {
  id: string;
  name: string;
  choices?: Option[];
};

export type Poll = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  options: Option[];
  participants: Participant[];
  participantsCount: number;
};
