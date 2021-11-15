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
  onDeleteWorkoutItem: (workoutItemId: number, deleteIndex: number) => void;
};

const useWorkoutItems = (initialState: WorkoutItem[]): [State[], Handlers] => {
  const [state, setWorkoutItems] = React.useState(initialState);

  const onGetWorkoutItems = async (userId: number | null) => {
    setWorkoutItems(await getWorkoutItems(userId));
  };

  const onDeleteWorkoutItem = async (workoutItemId: number | null, deleteIndex: number) => {
    state.splice(deleteIndex, 1);
    console.log('2', state);
    setWorkoutItems([...state]);
    await deleteWorkoutItem(workoutItemId);
    console.log('5', state);
  };

  return [state, { onGetWorkoutItems, onDeleteWorkoutItem }];
};

export default useWorkoutItems;
