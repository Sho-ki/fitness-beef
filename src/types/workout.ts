export type WorkoutItem = {
  id: number | null;
  day_of_week: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | null;
  users_id: number | null;
  set_order: number | null;
  reps: number | null;
  sets: number | null;
  workout_item: string | null;
  category:
    | 'Warm Up'
    | 'Arms'
    | 'Legs'
    | 'Chest'
    | 'Abs'
    | 'Glutes'
    | 'Back'
    | 'Shoulders'
    | 'Upper Body'
    | 'Lower Body'
    | null;
  color:
    | 'gray'
    | 'blue'
    | 'darkblue'
    | 'green'
    | 'darkgreen'
    | 'purple'
    | 'red'
    | 'pink'
    | 'orange'
    | 'black'
    | null;
};
