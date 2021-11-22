import React from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

import ItemModal from '../WorkoutItems/ItemModal';
import WorkoutDay from '../WorkoutDay';
import useWorkoutItems from '../WorkoutItems/hooks/useWorkoutItems';
import { CategoryColor, dayCombination, WorkoutItem } from '../../types/workout';
import { WorkoutSet, DayOfWeek } from '../../types/workout';

type Props = {
  workoutsets: WorkoutSet[];
  workoutitems: WorkoutItem[];
  categorycolor: CategoryColor[];
};

type Data = {
  workoutItemArray: WorkoutSet[][];
  deleteIdList: number[];
};

type setItemCtx = {
  orderChangedWeek: WorkoutSet[][];
  dayOfToday: number;
  onDeleteSetItem: (newArr: WorkoutSet[][], deleteId: number | null) => void;
  saveSetItems: () => void;
};
const DefaultCtxData: setItemCtx = {
  orderChangedWeek: [],
  dayOfToday: -1,
  onDeleteSetItem: () => {},
  saveSetItems: () => {},
};
export const WorkoutSetItemContext = React.createContext<setItemCtx>(DefaultCtxData);

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
    set_order: destinationIndex + 1,
    sets: 3,
    users_id: passedItemInfo.users_id,
  };

  todaysItems.splice(destinationIndex, 0, newItem);
  return todaysItems;
};

const WorkoutSets: React.FC<Props> = ({ workoutsets, workoutitems, categorycolor }: Props) => {
  let getDate = new Date();
  let today = getDate.getMonth() + 1 + ' / ' + getDate.getDate() + ' / ' + getDate.getFullYear();
  let dayOfWeek = getDate.getDay();
  const [dayOfToday, setDayOfToday] = React.useState(dayOfWeek);

  let week: Array<WorkoutSet[]> = [[], [], [], [], [], [], []];
  const [state, handlers] = useWorkoutItems(workoutitems);
  const [orderChangedWeek, setOrderChangedWeek] = React.useState(week);
  const [deleteIdList, setDeleteIdList] = React.useState<number[]>([]);
  console.log(deleteIdList);
  const [currWorkoutSets, setCurrWorkoutSets] = React.useState(workoutsets);
  React.useEffect(() => {
    currWorkoutSets.sort((a, b) => {
      if (!a.set_order || !b.set_order) {
        return -1;
      }
      return a?.set_order - b?.set_order;
    });

    currWorkoutSets.map((workoutset, i) => {
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
    setOrderChangedWeek([...week]);
  }, [currWorkoutSets]);

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

    // If an invalid DnD is operated, return and nothing happens
    if (!destination) return;
    if (destination.droppableId === 'workoutItems') return;
    if (source.droppableId === 'workoutSetItems' && destination.droppableId === 'deleteList') return;

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
    for (let i = 0; i < orderChangedWeek.length; i++) {
      for (let j = 0; j < orderChangedWeek[i].length; j++) {
        orderChangedWeek[i][j].set_order = j + 1;
      }
    }
    const args: Data = {
      workoutItemArray: orderChangedWeek,
      deleteIdList,
    };
    const url = `http://localhost:8000/api/workout-sets/17`;
    const res = await axios.put(url, args);
    setCurrWorkoutSets(res.data.userData);
    setDeleteIdList([]);
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
