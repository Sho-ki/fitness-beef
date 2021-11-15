import { Container, Grid } from '@mui/material';
import WorkoutDay from '../WorkoutDay';
import ItemModal from '../WorkoutItems/ItemModal';
import { CategoryColor, dayCombination, WorkoutItem } from '../../types/workout';

import { Typography } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React from 'react';
import { WorkoutSet, DayOfWeek } from '../../types/workout';
import useWorkoutItems from '../WorkoutItems/hooks/useWorkoutItems';
import axios from 'axios';
import { WorkoutSetItemContext } from '../../store/WokroutSetItemCxt';

type Props = {
  workoutsets: WorkoutSet[];
  workoutitems: WorkoutItem[];
  categorycolor: CategoryColor[];
};

type Data = {
  workoutItemArray: WorkoutSet[][];
  deleteIdList: number[];
};

const WorkoutSets: React.FC<Props> = ({ workoutsets, workoutitems, categorycolor }: Props) => {
  let getDate = new Date();
  let today = getDate.getMonth() + 1 + ' / ' + getDate.getDate() + ' / ' + getDate.getFullYear();
  const [state, handlers] = useWorkoutItems(workoutitems);

  let dayOfWeek = getDate.getDay();

  const [dayOfToday, setDayOfToday] = React.useState(dayOfWeek);

  let week: Array<WorkoutSet[]> = [[], [], [], [], [], [], []];

  const [orderChangedWeek, setOrderChangedWeek] = React.useState(week);
  const [deleteIdList, setDeleteIdList] = React.useState<number[]>([]);

  console.log(deleteIdList);
  React.useEffect(() => {
    workoutsets.sort((a, b) => {
      if (!a.set_order || !b.set_order) {
        return -1;
      }
      return a?.set_order - b?.set_order;
    });
  }, [workoutsets]);
  workoutsets.map((workoutset, i) => {
    switch (workoutset.day_of_week) {
      case DayOfWeek.Sun:
        week[0].push(workoutset);
        break;
      case DayOfWeek.Mon:
        week[1].push(workoutset);
        break;
      case DayOfWeek.Tue:
        week[2].push(workoutset);
        break;
      case DayOfWeek.Wed:
        week[3].push(workoutset);
        break;
      case DayOfWeek.Thu:
        week[4].push(workoutset);
        break;
      case DayOfWeek.Fri:
        week[5].push(workoutset);
        break;
      case DayOfWeek.Sat:
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

  const onDeleteSetItem = React.useCallback((newWeekArr: WorkoutSet[][], deleteId: number | null) => {
    if (deleteId) {
      setDeleteIdList((prev) => [...prev, deleteId]);
    }
    setOrderChangedWeek([...newWeekArr]);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.droppableId === 'workoutItems') {
      return;
    }
    if (source.droppableId === 'workoutSetItems' && destination.droppableId === 'deleteList') {
      return;
    }

    const todaysItems = Array.from(orderChangedWeek[dayOfToday]);
    if (source.droppableId === 'workoutSetItems' && destination.droppableId === 'workoutSetItems') {
      orderChangedWeek[dayOfToday] = orderChange(todaysItems, source.index, destination.index);
      setOrderChangedWeek([...orderChangedWeek]);

      return;
    }

    const passedItemInfo: WorkoutItem = JSON.parse(draggableId).workoutitem;
    if (source.droppableId === 'workoutItems' && destination.droppableId === 'deleteList') {
      let confirmResult = window.confirm(
        `Delete ${passedItemInfo.workout_item}(${passedItemInfo.category})?`
      );
      if (!confirmResult) return;
      handlers.onDeleteWorkoutItem(passedItemInfo.id, source.index);
      let updatedWeek = itemDelete(passedItemInfo.id, orderChangedWeek);
      setOrderChangedWeek(updatedWeek);
      return;
    }

    if (source.droppableId === 'workoutItems' && destination.droppableId === 'workoutSetItems') {
      if (orderChangedWeek[dayOfToday].length <= 0) {
        setOrderChangedWeek((prev) => {
          return prev.map((arr, index) => {
            if (dayOfToday === index) {
              arr = [];
            }
            return arr;
          });
        });
      }

      orderChangedWeek[dayOfToday] = addItem(destination.index, todaysItems, passedItemInfo, dayOfToday);
      setOrderChangedWeek([...orderChangedWeek]);
    }
  };

  const saveSetItems = async () => {
    const args: Data = {
      workoutItemArray: orderChangedWeek,
      deleteIdList,
    };
    const url = `http://localhost:8000/api/workout-sets/17`;
    const res = await axios.put(url, args);
    setOrderChangedWeek([...orderChangedWeek]);
  };

  return (
    <WorkoutSetItemContext.Provider value={{ onDeleteSetItem, orderChangedWeek, dayOfToday, saveSetItems }}>
      <Container>
        <Typography>{today}</Typography>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <WorkoutDay
                onPrevDayChangeHandler={onPrevDayChangeHandler}
                onNextDayChangeHandler={onNextDayChangeHandler}
              />
            </Grid>
            <Grid item xs={4}>
              <ItemModal workoutitems={state} handlers={handlers} categorycolor={categorycolor} />
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>
    </WorkoutSetItemContext.Provider>
  );
};

export default WorkoutSets;

const orderChange = (todaysItems: WorkoutSet[], sourceIndex: number, destinationIndex: number) => {
  const [reorderedItem] = todaysItems.splice(sourceIndex, 1);
  todaysItems.splice(destinationIndex, 0, reorderedItem);
  return todaysItems;
};

const itemDelete = (passedItemId: number, orderChangedWeek: WorkoutSet[][]) => {
  return orderChangedWeek.map((eachWeek) => {
    return eachWeek.filter((item) => {
      return item.workout_item_id !== passedItemId;
    });
  });
};

const addItem = (
  destinationIndex: number,
  todaysItems: WorkoutSet[],
  passedItemInfo: WorkoutItem,
  dayOfToday: number
) => {
  const newItem: WorkoutSet = {
    workout_item: passedItemInfo.workout_item,
    category: passedItemInfo.category,
    color: passedItemInfo.color,
    day_of_week: dayCombination[dayOfToday],
    workout_item_id: passedItemInfo.id,
    id: null,
    reps: 12,
    set_order: destinationIndex,
    sets: 3,
    users_id: passedItemInfo.users_id,
  };

  todaysItems.splice(destinationIndex, 0, newItem);
  return todaysItems;
};
