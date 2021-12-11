import React from 'react';
import { Box } from '@mui/system';
import { Button, List, ListItem, TextField } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { CategoryColors } from '../../styles/Colors';
import { DragIndicatorIcon } from '../Icon';
import { RealTimeColors, WorkoutItem } from '../../types/workout';

type Props = {
  workoutitems: WorkoutItem[];
  realTimeColors: RealTimeColors;
  onClickEdit: (userId: number | null, categoryName: string, name: string | null, itemId: number) => void;
};

const WorkoutItems = ({ workoutitems, onClickEdit, realTimeColors }: Props) => {
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
          bgcolor: '#F5F5F5',
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
                              color: `${
                                CategoryColors[realTimeColors[workoutitem.category]] === '#000000'
                                  ? '#F5F5F5'
                                  : '#000000'
                              }`,
                              borderRadius: 20,
                              width: '80%',
                              minHeight: '4em',
                              border: `1px solid ${CategoryColors[realTimeColors[workoutitem.category]]}`,
                              backgroundColor: `${CategoryColors[realTimeColors[workoutitem.category]]}`,
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
