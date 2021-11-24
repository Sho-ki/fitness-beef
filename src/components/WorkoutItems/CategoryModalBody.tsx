import React from 'react';

import { CategoryColor, Categories, Colors } from '../../types/workout';
import CategoryColorRadioGroup from './RadioGroup';

type Props = {
  category: Categories;
  color: Colors;
  currentState: CategoryColor[];
  setCategoriesColors: React.Dispatch<React.SetStateAction<CategoryColor[]>>;
};

const CategoryModalBody = ({ category, color, currentState, setCategoriesColors }: Props) => {
  const [selectedColor, setSelectedColor] = React.useState(color);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value as Colors);
    currentState.map((obj) => {
      if (obj.category === category) {
        obj.color = event.target.value as Colors;
      }
    });
    setCategoriesColors(currentState);
  };
  const colors = [
    'gray',
    'blue',
    'darkblue',
    'green',
    'darkgreen',
    'purple',
    'red',
    'pink',
    'orange',
    'black',
  ];
  return (
    <>
      <div className='category-modal'>
        <span>{category}:</span>
        {colors.map((clr) => (
          <CategoryColorRadioGroup
            key={`${category}-${color}-${clr}`}
            checked={selectedColor === clr}
            onChange={handleChange}
            value={clr}
            color={clr as Colors}
          />
        ))}
      </div>
      <style jsx>
        {`
          .category-modal {
            display: grid;
            grid-template-columns: 100px repeat(10, 1fr);
            align-items: center;
            padding: 0 30px;
          }
          .category-modal(:first-child) {
            width: 200px;
          }
        `}
      </style>
    </>
  );
};

export default CategoryModalBody;
