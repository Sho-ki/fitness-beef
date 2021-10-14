export type PostUserWorkout = {
  id: number;
  name: string;
  category: string;
  sets: number;
  times: number;
  orderIndex: number;
};

export type WorkoutItem = {
  userId: number;
  user_workouts_id: number;
  training_name: string;
  sets: number;
  times: number;
  order_index: number;
  label: string;
  scheduled_day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | null;
};
