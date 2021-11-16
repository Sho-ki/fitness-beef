import React from 'react';
import { Box } from '@mui/system';
import { Draggable } from 'react-beautiful-dnd';
import { ListItem, Typography } from '@material-ui/core';

import { CategoryColors } from '../../styles/Colors';
import { CloseIcon, DragIndicatorIcon } from '../Icon';
import { WorkoutSet } from '../../types/workout';
import { WorkoutSetItemContext } from '../../store/WokroutSetItemCxt';
import workoutDayStyle from './workoutDayStyle';

type Props = {
  workoutset: WorkoutSet;
  idx: number;
};
const SetItem = ({ workoutset, idx }: Props) => {
  const [isOnDeleteButton, setIsOnDeleteButton] = React.useState<boolean>(false);

  const { onDeleteSetItem, orderChangedWeek, dayOfToday } = React.useContext(WorkoutSetItemContext);

  const onDeleteSetItemHandler = () => {
    orderChangedWeek[dayOfToday].splice(idx, 1);

    onDeleteSetItem(orderChangedWeek, workoutset.id);
  };
  return (
    <>
      <Draggable
        draggableId={`${workoutset.day_of_week}${idx}`}
        index={idx}
        key={`${workoutset.day_of_week}${idx}`}
      >
        {(provided) => (
          <ListItem ref={provided.innerRef} {...provided.draggableProps}>
            <div {...provided.dragHandleProps}>
              <DragIndicatorIcon />
            </div>
            <button
              disabled={isOnDeleteButton}
              className='workout-set-item-btn'
              style={{ backgroundColor: `${CategoryColors[workoutset.color]}` }}
              onClick={() => console.log('Edit')}
            >
              <Box
                sx={{
                  display: 'flex',
                  marginLeft: '1em',
                  alignItems: 'center',
                  color: `${CategoryColors[workoutset.color] === '#000000' ? 'white' : 'black'}`,
                }}
              >
                <h4 className='set-item-number'>{idx + 1}.</h4>
                <p className='set-item-text'>
                  {workoutset.workout_item} {workoutset.reps} * {workoutset.sets}
                </p>
              </Box>
            </button>
            <button
              className='workout-set-item-delete-btn'
              onMouseOver={() => {
                setIsOnDeleteButton(true);
              }}
              onMouseLeave={() => {
                setIsOnDeleteButton(false);
              }}
              onClick={onDeleteSetItemHandler}
            >
              <CloseIcon />
            </button>
          </ListItem>
        )}
      </Draggable>
      <style jsx>{workoutDayStyle}</style>
    </>
  );
};

export default SetItem;
