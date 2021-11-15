import { ListItem, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Box } from '@mui/system';
import { WorkoutSet } from '../../types/workout';
import { WorkoutSetItemContext } from '../../store/WokroutSetItemCxt';
import { CategoryColors } from '../../styles/Colors';

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
              style={{}}
              className='workoutSetItemBtn'
              onClick={() => console.log('Edit')}
            >
              <Box sx={{ display: 'flex', marginLeft: '1em' }}>
                <Typography
                  style={{
                    textAlign: 'left',
                    display: 'inline-block',
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                  }}
                >
                  {idx + 1}.
                </Typography>
                <Typography
                  style={{
                    marginLeft: '2em',
                    display: 'inline-block',
                    textAlign: 'left',
                  }}
                >
                  {workoutset.workout_item} {workoutset.reps} * {workoutset.sets}
                </Typography>
              </Box>
            </button>
            <button
              className='workoutSetItemDelete'
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
      <style jsx>
        {`
          .workoutSetItemBtn {
            border: none;
            background-color: ${CategoryColors[workoutset.color]};
            border-radius: 30px;
            width: 95%;
            min-height: 7em;
            cursor: pointer;
          }

          .workoutSetItemBtn:hover {
            filter: brightness(0.8);
          }
          .workoutSetItemBtn:active {
            position: relative;
            top: 1px;
          }

          .workoutSetItemDelete {
            padding: 10px;
            cursor: pointer;
            background-color: transparent;
            border: none;
            color: lightgray;
          }

          .workoutSetItemDelete:hover {
            background-color: #ededed;
            border-radius: 50px;
            color: red;
          }

          .workoutSetItemDelete:active {
            position: relative;
            top: 1px;
            filter: brightness(0.8);
          }
        `}
      </style>
    </>
  );
};

export default SetItem;
