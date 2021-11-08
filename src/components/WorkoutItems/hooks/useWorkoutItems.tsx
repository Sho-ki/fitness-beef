import axios from 'axios';
import React from 'react';

const getWorkoutItems = async (userId: number | null) => {
  const url = `http://localhost:8000/api/workout-items/${userId}`;
  const res = await axios.get(url);
  if (res.status === 200 || res.status === 201) {
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
};

const useWorkoutItems = (initialState: State[]): [State[], Handlers] => {
  const [state, setWorkoutItems] = React.useState(initialState);

  const onGetWorkoutItems = React.useCallback(async (userId: number | null) => {
    setWorkoutItems(await getWorkoutItems(userId));
  }, []);

  return [state, { onGetWorkoutItems }];
};

export default useWorkoutItems;
