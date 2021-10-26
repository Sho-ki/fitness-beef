import React from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

import Cell from './Cell';

export type Props = {
  color: string;
  order: number;
  workoutCategory: string;
  workoutDayOfWeek: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  workoutItem: string;
};

const MockData: Props[] = [
  {
    color: 'blue',
    order: 1,
    workoutCategory: 'Arms',
    workoutDayOfWeek: 'Sun',
    workoutItem: 'Push Up',
  },
  {
    color: 'green',
    order: 2,
    workoutCategory: 'Abs',
    workoutDayOfWeek: 'Sun',
    workoutItem: 'Squats hello jlaisdjoi oaisjdoi aoijdsad ',
  },
  {
    color: 'blue',
    order: 3,
    workoutCategory: 'Arms',
    workoutDayOfWeek: 'Sun',
    workoutItem: 'Push Up jalksd aksdj oiajsdoi ',
  },
  {
    color: 'red',
    order: 1,
    workoutCategory: 'Warm up',
    workoutDayOfWeek: 'Wed',
    workoutItem: 'Jogging',
  },
  {
    color: 'green',
    order: 3,
    workoutCategory: 'Abs',
    workoutDayOfWeek: 'Wed',
    workoutItem: 'Squats long long long',
  },
  {
    color: 'pink',
    order: 2,
    workoutCategory: 'Back',
    workoutDayOfWeek: 'Wed',
    workoutItem: 'Haikin',
  },
  {
    color: 'blue',
    order: 2,
    workoutCategory: 'Arms',
    workoutDayOfWeek: 'Mon',
    workoutItem: 'Push Up',
  },
  {
    color: 'orange',
    order: 1,
    workoutCategory: 'Chest WOrkout',
    workoutDayOfWeek: 'Mon',
    workoutItem: 'Chest Workoutdesuyo long long',
  },
];

export const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '80%',
  margin: '0 auto',
  textAlign: 'center',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const WeeklySchedule = () => {
  return (
    <div className='schedule-container'>
      <div
        className='table-label'
        style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
      >
        Weekly Schedule
      </div>
      <Grid container>
        <Cell schedules={MockData} />
      </Grid>
    </div>
  );
};

export default WeeklySchedule;
