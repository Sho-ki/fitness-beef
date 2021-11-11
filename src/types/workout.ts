export type WorkoutSet = {
  id: number | null;
  day_of_week: DayOfWeek;
  users_id: number;
  set_order: number | null;
  reps: number | null;
  sets: number | null;
  workout_item: string | null;
  workout_item_id: number | null;
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
  tempId?: number;
};

export type WorkoutItem = {
  id: number;
  workout_item: string | null;
  workout_categories_id: number | null;
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
  users_id: number | null;
};

export enum DayOfWeek {
  Sun = 'Sun',
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  null = 'null',
}
