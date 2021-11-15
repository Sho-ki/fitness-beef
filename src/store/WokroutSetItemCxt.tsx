import React from 'react';
import { Handlers } from '../components/WorkoutItems/hooks/useWorkoutItems';
import { WorkoutSet } from '../types/workout';

type WeekType = {
  orderChangedWeek: Array<WorkoutSet[]>;
  dayOfToday: number;
  onDeleteSetItem: (newArr: WorkoutSet[][], deleteId: number | null) => void;
};
const a: WeekType = {
  orderChangedWeek: [],
  dayOfToday: -1,
  onDeleteSetItem: () => {},
};
export const WorkoutSetItemContext = React.createContext<WeekType>(a);
