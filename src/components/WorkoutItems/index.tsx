import { Button, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { Props } from '../../pages/user/edit';
import React, { useEffect } from 'react';
import ItemModal from './ItemModal';

const WorkoutItems = ({ workoutitems }: Props) => {
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
        <List sx={{ width: '100%', height: '80vh', overflow: 'scroll' }}>
          {workoutitems.map(
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
        <ItemModal usersId={workoutitems[0].users_id} />
      </Box>
    </>
  );
};

export default WorkoutItems;
