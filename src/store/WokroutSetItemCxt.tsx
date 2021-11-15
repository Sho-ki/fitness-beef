import React from 'react';
import { Handlers } from '../components/WorkoutItems/hooks/useWorkoutItems';
import { WorkoutSet } from '../types/workout';

type CtxType = {
  orderChangedWeek: Array<WorkoutSet[]>;
  dayOfToday: number;
  onDeleteSetItem: (newArr: WorkoutSet[][], deleteId: number | null) => void;
  saveSetItems: () => void;
};
const DefaultCtxData: CtxType = {
  orderChangedWeek: [],
  dayOfToday: -1,
  onDeleteSetItem: () => {},
  saveSetItems: () => {},
};
export const WorkoutSetItemContext = React.createContext<CtxType>(DefaultCtxData);
