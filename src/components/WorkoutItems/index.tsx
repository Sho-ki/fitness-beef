import { Button, List, ListItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import useWorkoutItems from './hooks/useWorkoutItems';
import { State } from './hooks/useWorkoutItems';

type Props = {
  workoutitems: State[];
};

const WorkoutItems = ({ workoutitems }: Props) => {
  const [state, handlers] = useWorkoutItems(workoutitems);

  return (
    <>
      <Box
        sx={{
          bgcolor: 'smokewhite',
          width: '100%',
          border: 1,
          borderRadius: 5,
        }}
      >
        <Button
          variant='outlined'
          sx={{
            borderRadius: 5,
            width: '80%',
            minHeight: '5em',
          }}
        ></Button>
        <List sx={{ width: '100%', height: '80vh', overflow: 'scroll' }}>
          {state.map(
            (workoutitem, i) =>
              workoutitem.workout_item && (
                <ListItem
                  alignItems='center'
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    display: 'block',
                  }}
                  key={workoutitem.id}
                >
                  <Button
                    variant='outlined'
                    sx={{
                      borderRadius: 5,
                      width: '80%',
                      minHeight: '5em',
                    }}
                  >
                    {workoutitem.workout_item}
                  </Button>
                </ListItem>
              )
          )}
        </List>
      </Box>
    </>
  );
};

export default WorkoutItems;
