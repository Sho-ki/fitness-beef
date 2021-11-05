import { Container, Grid } from '@mui/material';
import { Props } from '../../pages/user/edit';
import WorkoutDay from '../WorkoutDay';
import ItemModal from '../WorkoutItems/ItemModal';

const WorkoutSets: React.FC<Props> = ({ workoutsets, workoutitems }: Props) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <WorkoutDay workoutsets={workoutsets} />
        </Grid>

        <Grid item xs={4}>
          <ItemModal workoutitems={workoutitems} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkoutSets;
