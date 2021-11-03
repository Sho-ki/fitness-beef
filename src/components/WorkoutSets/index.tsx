import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { WorkoutItem } from '../../types/workout';
import { Props } from '../../pages/user/edit';
import WorkoutDay from '../WorkoutDay';
import WorkoutItems from '../WorkoutItems';

const WorkoutSets = ({ workoutsets }: Props) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <WorkoutDay workoutsets={workoutsets} />
        </Grid>

        <Grid item xs={4}>
          <WorkoutItems workoutsets={workoutsets} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkoutSets;
