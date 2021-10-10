import { User } from '../types/user';

type State = {
  email: string;
  password: string;
};

const initialState: State = {
  email: '',
  password: '',
};
