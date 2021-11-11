import { Container, Grid } from '@mui/material';
import WorkoutDay from '../WorkoutDay';
import ItemModal from '../WorkoutItems/ItemModal';
import { WorkoutItem, WorkoutSet } from '../../types/workout';
import { CategoryColor } from '../../types/workout';

type Props = {
  workoutsets: WorkoutSet[];
  workoutitems: WorkoutItem[];
  categorycolor: CategoryColor[];
};

const WorkoutSets: React.FC<Props> = ({
  workoutsets,
  workoutitems,
  categorycolor,
}: Props) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <WorkoutDay workoutsets={workoutsets} />
        </Grid>

        <Grid item xs={4}>
          <ItemModal
            workoutitems={workoutitems}
            categorycolor={categorycolor}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkoutSets;
