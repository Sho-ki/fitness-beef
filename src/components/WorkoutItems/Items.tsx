import { Button, List, ListItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import ItemModal from './ItemModal';
import useWorkoutItems from './hooks/useWorkoutItems';
import { State } from './hooks/useWorkoutItems';
import { WorkoutItem } from '../../types/workout';

type Props = {
  workoutitems: WorkoutItem[];
  onClickEdit: (userId: any, categoryName: any, name: any, itemId: any) => void;
};

const WorkoutItems = ({ workoutitems, onClickEdit }: Props) => {
  const [searchFilter, setSearchFilter] = React.useState('');

  const onSearchHandler = (e: string) => {
    setSearchFilter(e);
  };

  const filteredItems = React.useMemo(() => {
    return workoutitems
      .sort((a, b) => {
        return a.id - b.id;
      })
      .filter((workoutitem) => {
        return (
          (workoutitem.workout_item &&
            workoutitem.workout_item
              .toLowerCase()
              .indexOf(searchFilter.toLowerCase()) >= 0) ||
          (workoutitem.category &&
            workoutitem.category
              .toLowerCase()
              .indexOf(searchFilter.toLowerCase()) >= 0)
        );
      });
  }, [workoutitems, searchFilter]);
  return (
    <>
      <Box
        sx={{
          bgcolor: 'smokewhite',
          width: '100%',
          border: 1,
          borderRadius: 5,
          textAlign: 'center',
        }}
      >
        <TextField
          placeholder='search'
          id='outlined-size-small'
          size='small'
          sx={{ margin: '1em 0 0.5em 0' }}
          onChange={(e) => onSearchHandler(e.target.value)}
        />

        <List sx={{ width: '100%', height: '80vh', overflow: 'scroll' }}>
          {filteredItems.map(
            (workoutitem, i) =>
              workoutitem.workout_item && (
                <ListItem
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
