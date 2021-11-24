import React from 'react';
import { Box } from '@mui/system';
import { Draggable } from 'react-beautiful-dnd';
import { ListItem } from '@material-ui/core';
import { Stack, Typography } from '@mui/material';

import { CategoryColors } from '../../styles/Colors';
import { CloseIcon, DragIndicatorIcon } from '../Icon';
import { WorkoutSet } from '../../types/workout';
import { WorkoutSetItemContext } from '../WorkoutSets/index';
import workoutDayStyle from './workoutDayStyle';

type Props = {
  workoutset: WorkoutSet;
  idx: number;
};

const SetItem = ({ workoutset, idx }: Props) => {
  const [open, setOpen] = React.useState(false);

  const { onDeleteSetItem, orderChangedWeek, dayOfToday } = React.useContext(WorkoutSetItemContext);
  const onDeleteSetItemHandler = () => {
    orderChangedWeek[dayOfToday].splice(idx, 1);
    onDeleteSetItem(orderChangedWeek, workoutset.id);
  };

  const [reps, setReps] = React.useState(workoutset.reps);
  const [sets, setSets] = React.useState(workoutset.sets);
  const [focusedInput, setFocusedInput] = React.useState('reps');

  const onChangeReps = (input: number) => {
    setReps(input);
  };
  const onChangeSets = (input: number) => {
    setSets(input);
  };
  const onChangeRepsSets = () => {
    workoutset.reps = reps;
    workoutset.sets = sets;
    setOpen(false);
  };

  React.useEffect(() => {
    setReps(workoutset.reps);
    setSets(workoutset.sets);
    setOpen(false);
  }, [workoutset]);

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
            <Box
              sx={{
                border: 'none',
                borderRadius: '15px',
                width: '95%',
                padding: '0.5em 2em',
                display: 'flex',
                marginLeft: '1em',
                alignItems: 'center',
                color: `${CategoryColors[workoutset.color] === '#000000' ? '#F5F5F5' : '#000000'}`,
                backgroundColor: `${CategoryColors[workoutset.color]}`,
              }}
            >
              <Typography
                variant='h5'
                sx={{ width: '10%', textAlign: 'left', fontSize: '1.5em', fontWeight: 'bold' }}
              >
                {idx + 1}.
              </Typography>
              <Typography className='set-item-text' variant='h5' sx={{ width: '60%' }}>
                {workoutset.workout_item}
              </Typography>

              {open && (
                <Typography variant='h5' sx={{ width: '30%' }}>
                  <Box sx={{ fontSize: '13px', color: '#757575', display: 'flex', flexDirection: 'column' }}>
                    <label className={` ${focusedInput === 'reps' ? 'focusInput' : ''}`} htmlFor='reps'>
                      Reps
                    </label>
                    <input
                      className='numInput'
                      type='number'
                      id='reps'
                      name='reps'
                      min='1'
                      required
                      value={reps || 0}
                      onChange={(e) => onChangeReps(Number(e.target.value))}
                      onFocus={() => {
                        setFocusedInput('reps');
                      }}
                      autoFocus
                      onBlur={() => {
                        setFocusedInput('');
                      }}
                    />

                    <label className={` ${focusedInput === 'sets' ? 'focusInput' : ''}`} htmlFor='sets'>
                      Sets
                    </label>
                    <input
                      className='numInput'
                      type='number'
                      id='sets'
                      name='sets'
                      min='1'
                      required
                      value={sets || 0}
                      onChange={(e) => onChangeSets(Number(e.target.value))}
                      onFocus={() => {
                        setFocusedInput('sets');
                      }}
                      onBlur={() => {
                        setFocusedInput('');
                      }}
                    />
                  </Box>
                  <Stack spacing={2} direction='row' marginTop='5px'>
                    <button name='close' className='btn cancel-btn' onClick={() => setOpen(false)}>
                      CANCEL
                    </button>
                    <button name='submit' className='btn submit-btn' onClick={onChangeRepsSets}>
                      OK
                    </button>
                  </Stack>
                </Typography>
              )}
              {!open && (
                <Typography
                  variant='h5'
                  sx={{ width: '30%', cursor: 'pointer' }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {workoutset.reps} × {workoutset.sets}
                </Typography>
              )}
            </Box>
            <button className='workout-set-item-delete-btn' onClick={onDeleteSetItemHandler}>
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
