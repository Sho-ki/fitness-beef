import axios from 'axios';
import React from 'react';

import { WorkoutItem } from '../../../types/workout';

const getWorkoutItems = async (userId: number | null) => {
  const url = `http://localhost:8000/api/workout-items/${userId}`;
  const res = await axios.get(url);
  if (res.status === 200 || res.status === 201) {
    return await res.data;
  }
};

export type State = WorkoutItem;

export type Handlers = {
  onGetWorkoutItems: (userId: number | null) => void;
};

const useWorkoutItems = (initialState: WorkoutItem[]): [State[], Handlers] => {
  const [state, setWorkoutItems] = React.useState(initialState);

  const onGetWorkoutItems = React.useCallback(async (userId: number | null) => {
    setWorkoutItems(await getWorkoutItems(userId));
  }, []);

  return [state, { onGetWorkoutItems }];
};

export default useWorkoutItems;
