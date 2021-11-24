import * as React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';

import { CategoryColor } from '../../../types/workout';
import { WorkoutItem, WorkoutSet } from '../../../types/workout';

const WorkoutSets = dynamic(import('../../../components/WorkoutSets'), { ssr: false });

export type Props = {
  workoutsets: WorkoutSet[];
  workoutitems: WorkoutItem[];
  categorycolor: CategoryColor[];
  userId: number;
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const userId = Number(ctx.query.userId);
  resetServerContext();
  const getWorkoutSets = await fetch(`http://localhost:8000/api/workouts/${userId}`);
  const workoutsets: WorkoutSet[] = await getWorkoutSets.json();

  const getWorkoutItems = await fetch(`http://localhost:8000/api/workout-items/${userId}`);
  const workoutitems: WorkoutItem[] = await getWorkoutItems.json();

  const getCategoryColorPair = await fetch(`http://localhost:8000/api/categories/${userId}`);
  const categorycolor = await getCategoryColorPair.json();

  // Pass workoutsets to the page via props
  return { props: { workoutsets, workoutitems, categorycolor, userId } };
};

const Edit = ({ workoutsets, workoutitems, categorycolor, userId }: Props) => {
  return (
    <>
      <WorkoutSets
        workoutsets={workoutsets}
        workoutitems={workoutitems}
        categorycolor={categorycolor}
        userId={userId}
      />
    </>
  );
};

export default Edit;
