export type WorkoutSet = {
  id: number | null;
  day_of_week: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | null;
  users_id: number | null;
  set_order: number | null;
  reps: number | null;
  sets: number | null;
  workout_item: string | null;
  category: Categories;
  color: Colors;
};

export type WorkoutItem = {
  id: number;
  workout_item: string | null;
  workout_categories_id: number | null;
  category: Categories;
  color: Colors;
  users_id: number | null;
};

export enum Categories {
  'Warm Up' = "WarmUp", 
  'Arms' = "Arms", 
  'Legs' = "Legs",
  'Chest' = "Chest",
  'Abs' = "Abs",
  'Glutes' = "Glutes",
  'Back' = "Back",
  'Shoulders' = "Shoulders",
  'Upper Body' = "UpperBody",
  'Lower Body' = "LowerBody",
  null = 'null'
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
  'black' = 'black'
}

export type CategoryColor = {
  category: Categories;
  color: Colors;
}
