import { Container, Grid } from '@mui/material';
import { Props } from '../../pages/user/edit';
import WorkoutDay from '../WorkoutDay';
import WorkoutItems from '../WorkoutItems';

const WorkoutSets = ({ workoutsets, workoutitems }: Props) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <WorkoutDay workoutsets={workoutsets} workoutitems={[]} />
        </Grid>

        <Grid item xs={4}>
          <WorkoutItems workoutitems={workoutitems} workoutsets={[]} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkoutSets;
