import axios from 'axios';
import React, { useEffect } from 'react';
import { WorkoutItem } from '../../../types/workout';
import { Data } from '../ItemModal';

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

export type State = {
  id: number;
  workout_item: string | null;
  workout_categories_id: number | null;
  category:
    | 'Warm Up'
    | 'Arms'
    | 'Legs'
    | 'Chest'
    | 'Abs'
    | 'Glutes'
    | 'Back'
    | 'Shoulders'
    | 'Upper Body'
    | 'Lower Body'
    | null;
  color:
    | 'gray'
    | 'blue'
    | 'darkblue'
    | 'green'
    | 'darkgreen'
    | 'purple'
    | 'red'
    | 'pink'
    | 'orange'
    | 'black'
    | null;
  users_id: number | null;
};

export type Handlers = {
  onGetWorkoutItems: (userId: number | null) => void;
  onDeleteWorkoutItem: (workoutItemId: number) => void;
};

const useWorkoutItems = (initialState: State[]): [State[], Handlers] => {
  const [state, setWorkoutItems] = React.useState(initialState);
  // useEffect(() => {
  //   setWorkoutItems(state);
  // }, [state]);

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
