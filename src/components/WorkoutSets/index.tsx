import { Container, Grid } from '@mui/material';
import { Props } from '../../pages/user/edit';
import WorkoutDay from '../WorkoutDay';
import ItemModal from '../WorkoutItems/ItemModal';

import { Typography } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React from 'react';
import { WorkoutSet, DayOfWeek } from '../../types/workout';
import useWorkoutItems from '../WorkoutItems/hooks/useWorkoutItems';
import axios from 'axios';

const WorkoutSets: React.FC<Props> = ({ workoutsets, workoutitems }: Props) => {
  let getDate = new Date();
  let today = getDate.getMonth() + 1 + ' / ' + getDate.getDate() + ' / ' + getDate.getFullYear();
  const [state, handlers] = useWorkoutItems(workoutitems);

  let dayOfWeek = getDate.getDay();

  const [dayOfToday, setDayOfToday] = React.useState(dayOfWeek);

  let week: Array<WorkoutSet[]> = [[], [], [], [], [], [], []];

  React.useEffect(() => {
    workoutsets.sort((a, b) => {
      if (!a.set_order || !b.set_order) {
        return -1;
      }
      return a?.set_order - b?.set_order;
    });
  }, []);

  workoutsets.map((workoutset, i) => {
    switch (workoutset.day_of_week) {
      case DayOfWeek.Sun:
        workoutset.tempId = i;
        week[0].push(workoutset);
        break;
      case DayOfWeek.Mon:
        workoutset.tempId = i;
        week[1].push(workoutset);
        break;
      case DayOfWeek.Tue:
        workoutset.tempId = i;
        week[2].push(workoutset);
        break;
      case DayOfWeek.Wed:
        workoutset.tempId = i;
        week[3].push(workoutset);
        break;
      case DayOfWeek.Thu:
        workoutset.tempId = i;
        week[4].push(workoutset);
        break;
      case DayOfWeek.Fri:
        workoutset.tempId = i;
        week[5].push(workoutset);
        break;
      case DayOfWeek.Sat:
        workoutset.tempId = i;
        week[6].push(workoutset);
        break;
      default:
        break;
    }
  });

  const onPrevDayChangeHandler = () => {
    setDayOfToday(dayOfToday === 0 ? 6 : dayOfToday - 1);
  };

  const onNextDayChangeHandler = () => {
    setDayOfToday(dayOfToday === 6 ? 0 : dayOfToday + 1);
  };

  const [orderChangedWeek, setOrderChangedWeek] = React.useState(week);
  const [deleteIdList, setDeleteIdList] = React.useState<number[]>([]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.droppableId === 'workoutItems') {
      return;
    }
    if (source.droppableId === 'workoutSetItems' && destination.droppableId === 'workoutItems') {
      return;
    }

    const setItems = Array.from(orderChangedWeek[dayOfToday]);
    // const items = Array.from(workoutItems);
    if (destination.droppableId === 'workoutSetItems' && source.droppableId === 'workoutSetItems') {
      const [reorderedItem] = setItems.splice(result.source.index, 1);
      setItems.splice(destination.index, 0, reorderedItem);
      orderChangedWeek[dayOfToday] = setItems;
      setOrderChangedWeek(orderChangedWeek);
      return;
    }

    const passedItemInfo = JSON.parse(draggableId).workoutitem;
    if (source.droppableId === 'workoutItems' && destination.droppableId === 'deleteList') {
      let result = window.confirm(`Delete ${passedItemInfo.workout_item}(${passedItemInfo.category})?`);
      if (!result) return;

      state.splice(source.index, 1);
      handlers.onDeleteWorkoutItem(passedItemInfo.id);

      handlers.onGetWorkoutItems(state[0].users_id);

      let updatedWeek = orderChangedWeek.map((eachWeek) => {
        return eachWeek.filter((item) => {
          return item.workout_item_id !== passedItemInfo.id;
        });
      });

      setOrderChangedWeek(updatedWeek);

      return;
    }

    const newItemIdx = source.index;
    const newItem = {
      workout_item: passedItemInfo.workout_item,
      category: passedItemInfo.category,
      color: passedItemInfo.color,
      day_of_week: DayOfWeek.Tue,
      workout_item_id: passedItemInfo.id,
      id: null,
      reps: 12,
      set_order: newItemIdx,
      sets: 3,
      users_id: passedItemInfo.users_id,
    };
    if (!orderChangedWeek[dayOfToday][0].workout_item) {
      setOrderChangedWeek((prev) => {
        return prev.map((arr, index) => {
          if (dayOfToday === index) {
            arr = [];
          }
          return arr;
        });
      });
    }

    setItems.splice(destination.index, 0, newItem);
    orderChangedWeek[dayOfToday] = setItems;
    setOrderChangedWeek(orderChangedWeek);
  };

  console.log(week);
  return (
    <Container>
      <Typography>{today}</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <WorkoutDay
              week={orderChangedWeek}
              dayOfToday={dayOfToday}
              onPrevDayChangeHandler={onPrevDayChangeHandler}
              onNextDayChangeHandler={onNextDayChangeHandler}
            />
          </Grid>
          <Grid item xs={4}>
            <ItemModal state={state} handlers={handlers} />
          </Grid>
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default WorkoutSets;
