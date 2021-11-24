import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import { Droppable } from 'react-beautiful-dnd';
import React, { useEffect } from 'react';

import CustomizedDialogs from './CategoryModal';
import WorkoutItems from './Items';
import useCategoryColorPair from './hooks/useCategoryColorPairs';
import { AddIcon, DeleteIcon } from '../Icon';
import { CategoryColor } from '../../types/workout';
import { Handlers, State } from './hooks/useWorkoutItems';

export type Data = {
  name: string;
  category: string;
};

type Props = {
  workoutitems: State[];
  handlers: Handlers;
  categorycolor: CategoryColor[];
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  py: 18,
  px: 8,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
};

const ItemModal = ({ workoutitems, handlers, categorycolor }: Props) => {
  const [categoryColor, categorycolorHandlers] = useCategoryColorPair(categorycolor);

  const [open, setOpen] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [message, setMessage] = React.useState();
  const [showMessage, setShowMessage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editItemId, setEditItemId] = React.useState(null);

  const onNameChangeHandler = (event: string) => {
    setWorkoutName(event);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategory('');
    setWorkoutName('');
    setEditItemId(null);
    setMessage(undefined);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(undefined);
    setIsLoading(true);
    const args: Data = {
      name: workoutName,
      category,
    };
    if (editItemId) {
      const updateURL = `http://localhost:8000/api/workout-items/${workoutitems[0].users_id}/${editItemId}`;
      const res = await axios.put(updateURL, args);
      setMessage(res.data.message);
      if (res.status === 201) {
        handlers.onGetWorkoutItems(workoutitems[0].users_id);
        setOpen(false);
      }
    } else {
      const insertURL = `http://localhost:8000/api/workout-items/${workoutitems[0].users_id}`;
      const res = await axios.post(insertURL, args);
      setMessage(res.data.message);

      if (res.status === 201) {
        handlers.onGetWorkoutItems(workoutitems[0].users_id);
        setCategory('');
        setWorkoutName('');
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => {
      setShowMessage(true);
      clearTimeout(timeId);
    };
  }, [message]);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const onClickEdit = React.useCallback(async (userId, categoryName, name, itemId) => {
    setOpen(true);
    setEditItemId(itemId);
    setCategory(categoryName);
    setWorkoutName(name);
  }, []);

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'pink' : '',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
  });

  return (
    <div>
      <div className='workout-item-list'>
        <CustomizedDialogs
          categorycolor={categoryColor}
          onUpdateCategoryColorPair={categorycolorHandlers.onUpdateCategoryColorPair}
        />
      </div>
      <WorkoutItems workoutitems={workoutitems} onClickEdit={onClickEdit} />
      <div className='workout-item-btn-area'>
        <Button onClick={handleOpen}>
          <AddIcon fontSize='medium' color='primary' />
        </Button>

        <Droppable droppableId='deleteList'>
          {(provided, snapshot) => (
            <Button
              onClick={handleOpen}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <DeleteIcon fontSize='medium' color='primary' />
            </Button>
          )}
        </Droppable>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          <form onSubmit={handleSubmit}>
            <Box sx={style}>
              {showMessage && <Typography sx={{ position: 'absolute', top: '8em' }}>{message}</Typography>}
              <TextField
                required
                id='standard-basic'
                label='EXERCISE NAME'
                variant='standard'
                name='name'
                onChange={(e) => onNameChangeHandler(e.target.value)}
                value={workoutName}
                autoFocus
                sx={{ width: '50%' }}
                autoComplete={'off'}
              />
              <FormControl sx={{ width: '45%', marginLeft: '1em' }}>
                <InputLabel id='demo-simple-select-label'>CATEGORY</InputLabel>
                <Select
                  required
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={category}
                  name='category'
                  label='CATEGORY'
                  onChange={handleChange}
                >
                  <MenuItem value={'Warm Up'}>Warm Up</MenuItem>
                  <MenuItem value={'Arms'}>Arms</MenuItem>
                  <MenuItem value={'Legs'}>Legs</MenuItem> <MenuItem value={'Chest'}>Chest</MenuItem>
                  <MenuItem value={'Abs'}>Abs</MenuItem> <MenuItem value={'Glutes'}>Glutes</MenuItem>
                  <MenuItem value={'Back'}>Back</MenuItem> <MenuItem value={'Shoulders'}>Shoulders</MenuItem>
                  <MenuItem value={'Upper Body'}>Upper Body</MenuItem>
                  <MenuItem value={'Lower Body'}>Lower Body</MenuItem>
                </Select>
              </FormControl>
              <div className='modal-btn-area'>
                <Stack spacing={2} direction='row'>
                  <Button
                    name='on-close'
                    variant='outlined'
                    color='primary'
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    Close
                  </Button>
                  <Button
                    name='on-submit'
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Stack>
              </div>
            </Box>
          </form>
        </>
      </Modal>
      <style jsx>
        {`
          .workout-item-list {
            display: flex;
            justify-content: center;
            min-height: 5em;
            align-items: end;
          }
          .save-btn-area {
            text-align: right;
            margin: 2em;
          }

          .workout-item-btn-area {
            display: flex;
            justify-content: space-between;
          }

          .modal-btn-area {
            position: absolute;
            right: 3em;
            bottom: 2em;
          }
        `}
      </style>
    </div>
  );
};

export default ItemModal;
