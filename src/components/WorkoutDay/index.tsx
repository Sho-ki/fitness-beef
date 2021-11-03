import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Box } from '@mui/system';
import { Props } from '../../pages/user/edit';
import { Button, Grid, Typography } from '@mui/material';
import { WorkoutItem } from '../../types/workout';

const WorkoutDay = ({ workoutsets }: Props) => {
  const [workoutSet, setWorkoutSet] = React.useState();

  let getDate = new Date();
  let today =
    getDate.getDate() +
    '/' +
    (getDate.getMonth() + 1) +
    '/' +
    getDate.getFullYear();
  let dayOfWeek = getDate.getDay();

  const [dayOfToday, setDayOfToday] = React.useState(dayOfWeek);

  let week: Array<WorkoutItem[]> = [[], [], [], [], [], [], []];

  workoutsets.sort((a, b) => {
    if (!a.set_order || !b.set_order) {
      return -1;
    }
    return a?.set_order - b?.set_order;
  });

  workoutsets.map((workoutset) => {
    switch (workoutset.day_of_week) {
      case 'Sun':
        week[0].push(workoutset);
        break;
      case 'Mon':
        week[1].push(workoutset);
        break;
      case 'Tue':
        week[2].push(workoutset);
        break;
      case 'Wed':
        week[3].push(workoutset);
        break;
      case 'Thu':
        week[4].push(workoutset);
        break;
      case 'Fri':
        week[5].push(workoutset);
        break;
      case 'Sat':
        week[6].push(workoutset);
        break;
      default:
        break;
    }
  });

  const onPrevDayChangeHandler = () => {
    setDayOfToday(dayOfToday === 0 ? 6 : dayOfToday - 1);
  };

  const onNextDayChangeHandler = () => {
    setDayOfToday(dayOfToday === 6 ? 0 : dayOfToday + 1);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onPrevDayChangeHandler}>
          {dayOfToday === 0 ? 6 : dayOfToday - 1}
        </Button>
        <Typography variant='h4'>{dayOfToday}</Typography>
        <Button onClick={onNextDayChangeHandler}>
          {dayOfToday === 6 ? 0 : dayOfToday + 1}
        </Button>
      </div>
      <Box
        sx={{
          bgcolor: 'smokewhite',
          width: '100%',
          border: 1,
          borderRadius: 5,
        }}
      >
        <List sx={{ width: '100%', height: '80vh' }}>
          {!week[dayOfToday][0].id && (
            <Typography marginLeft='2em'>No Workouts Are Registered</Typography>
          )}

          {week[dayOfToday] &&
            week[dayOfToday].map(
              (workoutset, i) =>
                workoutset.workout_item && (
                  <ListItem
                    alignItems='center'
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                      display: 'block',
                    }}
                    key={workoutset.id}
                  >
                    <Button
                      variant='outlined'
                      sx={{
                        borderRadius: 5,
                        width: '95%',
                        minHeight: '5em',
                        justifyContent: 'left',
                      }}
                    >
                      <Typography marginLeft='2em'>
                        {workoutset.set_order}. {workoutset.workout_item}{' '}
                        {workoutset.reps} * {workoutset.sets}
                      </Typography>
                    </Button>
                  </ListItem>
                )
            )}
          {/* <ListItem sx={{ width: '100%', borderBottom: 1 }}>
          <ListItemText primary='Push ups' secondary='Jan 9, 2014' />
        </ListItem>
        <ListItem sx={{ width: '100%', borderBottom: 1 }}>
          <ListItemText primary='Work' secondary='Jan 7, 2014' />
        </ListItem>
        <ListItem sx={{ width: '100%', borderBottom: 1 }}>
          <ListItemText primary='Vacation' secondary='July 20, 2014' />
        </ListItem> */}
        </List>
      </Box>
    </>
  );
};

export default WorkoutDay;
