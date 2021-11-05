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
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import axios from 'axios';

type Data = {
  name: string;
  category: string;
};

type Props = {
  usersId: number | null;
  category?:
    | 'Warm Up'
    | 'Arms'
    | 'Legs'
    | 'Chest'
    | 'Abs'
    | 'Glutes'
    | 'Back'
    | 'Shoulders'
    | 'Upper Body'
    | 'Lower Body';

  name?: string | null;
};

const ItemModal = ({ usersId }: Props) => {
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

  const [open, setOpen] = React.useState(false);

  const [workoutName, setWorkoutName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [message, setMessage] = React.useState();
  const [showMessage, setShowMessage] = React.useState(false);
  const [isItemAdded, setIsItemAdded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onNameChangeHandler = (event: string) => {
    setWorkoutName(event);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    if (isItemAdded) {
      window.location.reload();
    }
    setIsItemAdded(false);
    setCategory('');
    setWorkoutName('');
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const args: Data = {
      name: workoutName,
      category,
    };

    await axios
      .post('http://localhost:8000/api/workout-items/' + usersId, args)
      .then((res) => {
        setMessage(res.data.message);
        setIsItemAdded(true);
        setCategory('');
        setWorkoutName('');
        setIsLoading(false);
      });
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

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddIcon fontSize='medium' color='primary' />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          <form onSubmit={handleSubmit}>
            <Box sx={style}>
              {showMessage && (
                <Typography sx={{ position: 'absolute', top: '8em' }}>
                  {message}
                </Typography>
              )}
              <TextField
                required
                id='standard-basic'
                label='EXERCISE NAME'
                variant='standard'
                name='name'
                // error
                onChange={(e) => onNameChangeHandler(e.target.value)}
                value={workoutName}
                autoFocus
                sx={{ width: '50%' }}
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
                  <MenuItem value={'Legs'}>Legs</MenuItem>{' '}
                  <MenuItem value={'Chest'}>Chest</MenuItem>{' '}
                  <MenuItem value={'Abs'}>Abs</MenuItem>{' '}
                  <MenuItem value={'Glutes'}>Glutes</MenuItem>{' '}
                  <MenuItem value={'Back'}>Back</MenuItem>{' '}
                  <MenuItem value={'Shoulders'}>Shoulders</MenuItem>{' '}
                  <MenuItem value={'Upper Body'}>Upper Body</MenuItem>{' '}
                  <MenuItem value={'Lower Body'}>Lower Body</MenuItem>
                </Select>
              </FormControl>
              <div
                style={{ position: 'absolute', right: '3em', bottom: '2em' }}
              >
                <Stack spacing={2} direction='row'>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    Close
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
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
    </div>
  );
};

export default ItemModal;
