export type WorkoutSet = {
  id: number | null;
  day_of_week: DayOfWeek;
  users_id: number | null;
  set_order: number | null;
  reps: number | null;
  sets: number | null;
  workout_item: string | null;
  category: Categories;
  color: Colors;
  workout_item_id: number | null;
};

export type WorkoutItem = {
  id: number;
  workout_item: string | null;
  workout_categories_id: number | null;
  category: Categories;
  color: Colors;
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
export enum Categories {
  'Warm Up' = 'WarmUp',
  'Arms' = 'Arms',
  'Legs' = 'Legs',
  'Chest' = 'Chest',
  'Abs' = 'Abs',
  'Glutes' = 'Glutes',
  'Back' = 'Back',
  'Shoulders' = 'Shoulders',
  'Upper Body' = 'UpperBody',
  'Lower Body' = 'LowerBody',
  null = 'null',
}
export enum Colors {
  'gray' = 'gray',
  'blue' = 'blue',
  'darkblue' = 'darkblue',
  'green' = 'green',
  'darkgreen' = 'darkgreen',
  'purple' = 'purple',
  'red' = 'red',
  'pink' = 'pink',
  'orange' = 'orange',
  'black' = 'black',
}

export type CategoryColor = {
  category: Categories;
  color: Colors;
};

export const dayCombination: { [key: number]: DayOfWeek } = {
  0: DayOfWeek.Sun,
  1: DayOfWeek.Mon,
  2: DayOfWeek.Tue,
  3: DayOfWeek.Wed,
  4: DayOfWeek.Thu,
  5: DayOfWeek.Fri,
  6: DayOfWeek.Sat,
};

export type RealTimeColors = {
  [key in Categories]: Colors;
};
