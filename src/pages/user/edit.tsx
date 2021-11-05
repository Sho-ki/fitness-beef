import React from 'react';
import { GetServerSideProps } from 'next';

import SideMenu from '../../components/SideMenu/User';

import { WorkoutItem, WorkoutSet } from '../../types/workout';
import WorkoutSets from '../../components/WorkoutSets';

export type Props = {
  workoutsets: Array<WorkoutSet>;
  workoutitems: Array<WorkoutItem>;
};

export const rest = ({ workoutsets, workoutitems }: Props) => {
  return { props: { workoutsets, workoutitems } };
};
// This gets called on every request
export const getServerSideProps = async () => {
  const getWorkoutSets = await fetch(`http://localhost:8000/api/workouts/17`);
  const workoutsets: WorkoutSet[] = await getWorkoutSets.json();

  const getWorkoutItems = await fetch(
    `http://localhost:8000/api/workout-items/17`
  );
  const workoutitems: WorkoutSet[] = await getWorkoutItems.json();

  // Pass workoutsets to the page via props
  return { props: { workoutsets, workoutitems } };
};
// const testWorkoutData: WorkoutSet[] = [
//   {
//     id: 3,
//     users_id: 17,
//     day_of_week: 'Mon',
//     set_order: 2,
//     reps: 12,
//     sets: 3,
//     workout_item: 'chest kicking',
//     category: 'Chest',
//     color: 'gray',
//   },
//   {
//     id: 4,
//     users_id: 17,
//     day_of_week: 'Mon',
//     set_order: 1,
//     reps: 200,
//     sets: 3,
//     workout_item: 'chest punch',
//     category: 'Chest',
//     color: 'gray',
//   },
//   {
//     id: 5,
//     users_id: 17,
//     day_of_week: 'Tue',
//     set_order: 2,
//     reps: 12,
//     sets: 3,
//     workout_item: 'legs punch',
//     category: 'Legs',
//     color: 'gray',
//   },
//   {
//     id: 6,
//     users_id: 17,
//     day_of_week: 'Tue',
//     set_order: 1,
//     reps: 200,
//     sets: 3,
//     workout_item: 'glutes punch',
//     category: 'Glutes',
//     color: 'gray',
//   },
//   {
//     id: 7,
//     users_id: 17,
//     day_of_week: 'Wed',
//     set_order: 2,
//     reps: 12,
//     sets: 3,
//     workout_item: 'glutes lick',
//     category: 'Glutes',
//     color: 'gray',
//   },
//   {
//     id: 8,
//     users_id: 17,
//     day_of_week: 'Wed',
//     set_order: 1,
//     reps: 200,
//     sets: 3,
//     workout_item: 'glutes punch',
//     category: 'Glutes',
//     color: 'gray',
//   },
//   {
//     id: null,
//     users_id: 17,
//     day_of_week: 'Thu',
//     set_order: null,
//     reps: null,
//     sets: null,
//     workout_item: null,
//     category: null,
//     color: null,
//   },
//   {
//     id: null,
//     users_id: 17,
//     day_of_week: 'Fri',
//     set_order: null,
//     reps: null,
//     sets: null,
//     workout_item: null,
//     category: null,
//     color: null,
//   },
//   {
//     id: null,
//     users_id: 17,
//     day_of_week: 'Sun',
//     set_order: null,
//     reps: null,
//     sets: null,
//     workout_item: null,
//     category: null,
//     color: null,
//   },
//   {
//     id: null,
//     users_id: 17,
//     day_of_week: 'Sat',
//     set_order: null,
//     reps: null,
//     sets: null,
//     workout_item: null,
//     category: null,
//     color: null,
//   },
// ];

const Edit = ({ workoutsets, workoutitems }: Props) => {
  return (
    <>
      <WorkoutSets workoutsets={workoutsets} workoutitems={workoutitems} />
      {/* <WorkoutSets workoutsets={testWorkoutData} /> */}
    </>
  );
};

export default Edit;
