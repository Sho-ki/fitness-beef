import * as React from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { dayCombination } from '../../types/workout';
import { Droppable } from 'react-beautiful-dnd';
import SetItem from './SetItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { WorkoutSetItemContext } from '../../store/WokroutSetItemCxt';

type Props = {
  onPrevDayChangeHandler: () => void;
  onNextDayChangeHandler: () => void;
};

const WorkoutDay: React.FC<Props> = ({ onPrevDayChangeHandler, onNextDayChangeHandler }: Props) => {
  const { orderChangedWeek, dayOfToday, saveSetItems } = React.useContext(WorkoutSetItemContext);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '5em', alignItems: 'end' }}>
        <Button onClick={onPrevDayChangeHandler}>
          {dayCombination[dayOfToday === 0 ? 6 : dayOfToday - 1]}
        </Button>
        <Typography variant='h4'>{dayCombination[dayOfToday]}</Typography>
        <Button onClick={onNextDayChangeHandler}>
          {dayCombination[dayOfToday === 6 ? 0 : dayOfToday + 1]}
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
        <Droppable droppableId='workoutSetItems'>
          {(provided) => (
            <List
              sx={{ width: '100%', height: '80vh', overflow: 'scroll' }}
              className='workoutSetItems'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {orderChangedWeek[dayOfToday].length <= 0 && <p>No Workouts Are Registered</p>}
              {orderChangedWeek[dayOfToday] &&
                orderChangedWeek[dayOfToday].map(
                  (workoutset, i) =>
                    workoutset.workout_item && <SetItem workoutset={workoutset} key={i} idx={i} />
                )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <div style={{ textAlign: 'right', margin: '2em' }}>
          <Button variant='outlined' size='large' sx={{ mr: '1em' }}>
            CANCEL
          </Button>
          <Button variant='contained' size='large' endIcon={<FitnessCenterIcon />} onClick={saveSetItems}>
            SAVE
          </Button>
        </div>
      </Box>
    </>
  );
};

export default WorkoutDay;
