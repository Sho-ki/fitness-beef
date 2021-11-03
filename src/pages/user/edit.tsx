import React from 'react';
import { GetServerSideProps } from 'next';

import SideMenu from '../../components/SideMenu/User';

import { WorkoutItem } from '../../types/workout';
import WorkoutSets from '../../components/WorkoutSets';

export type Props = {
  workoutsets: Array<WorkoutItem>;
};

export const rest = (workoutsets: Props) => {
  return { props: { workoutsets } };
};
// This gets called on every request
// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const res = await fetch(`http://localhost:8000/api/workouts/17`);
//   const workoutsets: WorkoutItem[] = await res.json();

//   console.log(workoutsets);
//   // Pass workoutsets to the page via props
//   return { props: { workoutsets } };
// };
const testWorkoutData: WorkoutItem[] = [
  {
    id: 3,
    users_id: 17,
    day_of_week: 'Mon',
    set_order: 2,
    reps: 12,
    sets: 3,
    workout_item: 'chest kicking',
    category: 'Chest',
    color: 'gray',
  },
  {
    id: 4,
    users_id: 17,
    day_of_week: 'Mon',
    set_order: 1,
    reps: 200,
    sets: 3,
    workout_item: 'chest punch',
    category: 'Chest',
    color: 'gray',
  },
  {
    id: 5,
    users_id: 17,
    day_of_week: 'Tue',
    set_order: 2,
    reps: 12,
    sets: 3,
    workout_item: 'legs punch',
    category: 'Legs',
    color: 'gray',
  },
  {
    id: 6,
    users_id: 17,
    day_of_week: 'Tue',
    set_order: 1,
    reps: 200,
    sets: 3,
    workout_item: 'glutes punch',
    category: 'Glutes',
    color: 'gray',
  },
  {
    id: 7,
    users_id: 17,
    day_of_week: 'Wed',
    set_order: 2,
    reps: 12,
    sets: 3,
    workout_item: 'glutes lick',
    category: 'Glutes',
    color: 'gray',
  },
  {
    id: 8,
    users_id: 17,
    day_of_week: 'Wed',
    set_order: 1,
    reps: 200,
    sets: 3,
    workout_item: 'glutes punch',
    category: 'Glutes',
    color: 'gray',
  },
  {
    id: null,
    users_id: 17,
    day_of_week: 'Thu',
    set_order: null,
    reps: null,
    sets: null,
    workout_item: null,
    category: null,
    color: null,
  },
  {
    id: null,
    users_id: 17,
    day_of_week: 'Fri',
    set_order: null,
    reps: null,
    sets: null,
    workout_item: null,
    category: null,
    color: null,
  },
  {
    id: null,
    users_id: 17,
    day_of_week: 'Sun',
    set_order: null,
    reps: null,
    sets: null,
    workout_item: null,
    category: null,
    color: null,
  },
  {
    id: null,
    users_id: 17,
    day_of_week: 'Sat',
    set_order: null,
    reps: null,
    sets: null,
    workout_item: null,
    category: null,
    color: null,
  },
];

const Edit = ({ workoutsets }: Props) => {
  return (
    <>
      <SideMenu />

      <WorkoutSets workoutsets={testWorkoutData} />
    </>
  );
};

export default Edit;
