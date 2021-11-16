import React from 'react';
import { WorkoutSet } from '../types/workout';

type setItemCtx = {
  orderChangedWeek: WorkoutSet[][];
  dayOfToday: number;
  onDeleteSetItem: (newArr: WorkoutSet[][], deleteId: number | null) => void;
  saveSetItems: () => void;
};
const DefaultCtxData: setItemCtx = {
  orderChangedWeek: [],
  dayOfToday: -1,
  onDeleteSetItem: () => {},
  saveSetItems: () => {},
};
export const WorkoutSetItemContext = React.createContext<setItemCtx>(DefaultCtxData);
