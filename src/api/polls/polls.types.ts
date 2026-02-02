export type Option = {
  id: number;
  optionName: string;
  participants?: Participant[];
};

export type Participant = {
  id: number;
  name: string;
  choices: Option[];
};

export type Poll = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  link: string;
  participants: Participant[];
  options: Option[];
};
