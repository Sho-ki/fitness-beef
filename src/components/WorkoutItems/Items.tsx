import { Button, List, ListItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { State } from './hooks/useWorkoutItems';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type Props = {
  workoutitems: State[];
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
            workoutitem.workout_item.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0) ||
          (workoutitem.category &&
            workoutitem.category.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0)
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

        <Droppable droppableId='workoutItems'>
          {(provided) => (
            <List
              sx={{ width: '100%', height: '70vh', overflow: 'scroll' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredItems.map(
                (workoutitem, idx) =>
                  workoutitem.workout_item && (
                    <Draggable
                      draggableId={JSON.stringify({
                        workoutitem: workoutitem,
                      })}
                      index={idx}
                      key={workoutitem.id}
                    >
                      {(provided) => (
                        <ListItem
                          sx={{
                            width: '100%',
                            textAlign: 'center',
                            display: 'block',
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DragIndicatorIcon />
                          <Button
                            variant='outlined'
                            style={{
                              borderRadius: 20,
                              width: '80%',
                              minHeight: '4em',
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
                      )}
                    </Draggable>
                  )
              )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Box>
    </>
  );
};

export default WorkoutItems;
