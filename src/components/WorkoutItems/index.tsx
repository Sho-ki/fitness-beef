import { Button, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { Props } from '../../pages/user/edit';

const WorkoutItems = ({ workoutsets }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: 'smokewhite',
        width: '100%',
        border: 1,
        borderRadius: 5,
      }}
    >
      <List sx={{ width: '100%', height: '80vh' }}>
        {workoutsets.map(
          (workoutset, i) =>
            workoutset.workout_item && (
              <ListItem
                alignItems='center'
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  display: 'block',
                }}
                key={workoutset.id}
              >
                <Button
                  variant='outlined'
                  sx={{
                    borderRadius: 5,
                    width: '80%',
                    minHeight: '5em',
                  }}
                >
                  {workoutset.workout_item}
                </Button>
              </ListItem>
            )
        )}
      </List>
    </Box>
  );
};

export default WorkoutItems;
