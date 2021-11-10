import { Button, IconButton, ListItem, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const SetItem = ({ workoutset, idx }: any) => {
  const [isOnDeleteButton, setIsOnDeleteButton] = React.useState<boolean>(false);

  return (
    <>
      <Draggable draggableId={`${workoutset.day_of_week}${idx}`} index={idx}>
        {(provided) => (
          <ListItem
            style={{
              width: '100%',
              textAlign: 'center',
              display: 'block',
              alignItems: 'center',
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div {...provided.dragHandleProps}>
              <DragIndicatorIcon />
            </div>
            <Button
              disabled={isOnDeleteButton}
              variant='outlined'
              style={{
                borderRadius: 20,
                width: '95%',
                minHeight: '5em',
                justifyContent: 'left',
              }}
              onClick={() => console.log('Edit')}
            >
              <Typography
                style={{
                  marginLeft: '2em',
                  borderRadius: 5,
                  width: '95%',
                  minHeight: '5em',
                  justifyContent: 'left',
                }}
              >
                {idx + 1}. {workoutset.workout_item} {workoutset.reps} * {workoutset.sets}
              </Typography>
            </Button>
            <IconButton
              onMouseOver={() => {
                setIsOnDeleteButton(true);
              }}
              onMouseLeave={() => {
                setIsOnDeleteButton(false);
              }}
              onClick={() => console.log('OK')}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        )}
      </Draggable>
    </>
  );
};

export default SetItem;
