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

const deleteWorkoutItem = async (workoutItemId: number | null) => {
  const url = `http://localhost:8000/api/workout-items/${workoutItemId}`;
  const res = await axios.delete(url);
  if (res.status === 200) {
    return await res.data;
  }
};

export type State = WorkoutItem;

export type Handlers = {
  onGetWorkoutItems: (userId: number | null) => void;
  onDeleteWorkoutItem: (workoutItemId: number) => void;
};

const useWorkoutItems = (initialState: WorkoutItem[]): [State[], Handlers] => {
  const [state, setWorkoutItems] = React.useState(initialState);

  const onGetWorkoutItems = React.useCallback(async (userId: number | null) => {
    setWorkoutItems(await getWorkoutItems(userId));
  }, []);

  const onDeleteWorkoutItem = React.useCallback(async (workoutItemId: number | null) => {
    await deleteWorkoutItem(workoutItemId);
    setWorkoutItems(state);
  }, []);

  return [state, { onGetWorkoutItems, onDeleteWorkoutItem }];
};

export default useWorkoutItems;
