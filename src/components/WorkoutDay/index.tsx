import * as React from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/system';
import { Button, Dialog, Typography, DialogTitle, DialogActions, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import SetItem from './SetItem';
import { CloseIcon } from '../Icon';
import { Droppable } from 'react-beautiful-dnd';
import { FitnessCenterIcon } from '../Icon';
import { WorkoutSetItemContext } from '../WorkoutSets/index';
import { dayCombination } from '../../types/workout';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
  onPrevDayChangeHandler: () => void;
  onNextDayChangeHandler: () => void;
  resetState: () => void;
};

const WorkoutDay: React.FC<Props> = ({
  onPrevDayChangeHandler,
  onNextDayChangeHandler,
  resetState,
}: Props) => {
  const { orderChangedWeek, dayOfToday, saveSetItems } = React.useContext(WorkoutSetItemContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    resetState();
    setIsOpen(false);
  };

  return (
    <>
      <div className='show-today'>
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
          bgcolor: '#F5F5F5',
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
              {(orderChangedWeek[dayOfToday].length <= 0 ||
                orderChangedWeek[dayOfToday][0].workout_item === null) && <p>No Workouts Are Registered</p>}
              {orderChangedWeek[dayOfToday] &&
                orderChangedWeek[dayOfToday].map(
                  (workoutset, i) =>
                    workoutset.workout_item && <SetItem workoutset={workoutset} key={i} idx={i} />
                )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <div className='save-btn-area'>
          <Button variant='outlined' size='large' sx={{ mr: '1em' }} onClick={handleClickOpen}>
            CANCEL
          </Button>
          <Button variant='contained' size='large' endIcon={<FitnessCenterIcon />} onClick={saveSetItems}>
            SAVE
          </Button>
        </div>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={isOpen}>
        <DialogTitle sx={{ m: 0, p: 4 }} style={{ fontSize: '2rem' }}>
          Cancel?
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleCancel}>Ok</Button>
        </DialogActions>
      </BootstrapDialog>
      <style jsx>
        {`
          .show-today {
            display: flex;
            justify-content: center;
            min-height: 5em;
            align-items: end;
          }
          .save-btn-area {
            text-align: right;
            margin: 2em;
          }
        `}
      </style>
    </>
  );
};

export default WorkoutDay;
