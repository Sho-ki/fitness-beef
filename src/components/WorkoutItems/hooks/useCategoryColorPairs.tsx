import axios from 'axios';
import * as React from 'react';

import { CategoryColor, Categories, Colors } from '../../../types/workout';

const updateCategoryColorPair = async (userId: number | null, categoryColorPair: State) => {
  const categorycolor: State = categoryColorPair;
  type Data = {
    [key: string]: Colors;
  };
  const send = {} as Data;
  categorycolor.map((pair) => {
    //@ts-ignore
    const thisCategory = Categories[pair.category];
    const thisColor = Colors[pair.color];
    send[thisCategory] = thisColor;
  });
  const url = `http://localhost:8000/api/categories/${userId}`;
  const res = await axios.put(url, { color: send });
  if (res.status === 200 || res.status === 201) {
    return await res.data;
  }
};

export type State = CategoryColor[];

export type Handlers = {
  onUpdateCategoryColorPair: (userId: number | null, categoryColorPair: State) => void;
};

const useCategoryColorPair = (initialState: State): [State, Handlers] => {
  const [categoryColorPair, setCategoryColorPair] = React.useState(initialState);

  const onUpdateCategoryColorPair = React.useCallback(
    async (userId: number | null, categoryColorPair: State) => {
      const resp = await updateCategoryColorPair(userId, categoryColorPair);
      if (resp.message) {
        setCategoryColorPair(categoryColorPair);
      }
    },
    []
  );

  return [categoryColorPair, { onUpdateCategoryColorPair }];
};

export default useCategoryColorPair;

// color:{"WarmUp":"pink",
//  "Arms":"green",
//  "Legs":"blue",
//  "Chest":"black",
// "Abs":"black",
// "Glutes":"darkblue",
// "Back":"purple",
// "Shoulders":"black",
// "UpperBody":"red",
// "LowerBody":"red"}
