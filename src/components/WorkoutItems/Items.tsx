import { Button, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import ItemModal from './ItemModal';
import useWorkoutItems from './hooks/useWorkoutItems';
import { State } from './hooks/useWorkoutItems';

type Props = {
  workoutitems: State[];
  onClickEdit: (userId: any, categoryName: any, name: any, itemId: any) => void;
};

const WorkoutItems = ({ workoutitems, onClickEdit }: Props) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
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
                    onClick={() =>
                      onClickEdit(
                        workoutitem.users_id,
                        workoutitem.category,
                        workoutitem.workout_item,
                        workoutitem.id
                      )
                    }
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
