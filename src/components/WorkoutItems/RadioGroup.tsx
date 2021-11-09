import React from 'react';
import { Radio } from '@mui/material';

import { CategoryColor, Colors } from '../../types/workout';

type Props = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name?: string;
  color: Colors;
};

const CategoryColorRadioGroup = ({ checked, onChange, value, name = 'category-color', color }: Props) => {
  const controlProps = (selection: string) => ({
    checked,
    onChange,
    value,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': selection },
  });
  return (
    <Radio
      {...controlProps(value)}
      sx={{
        color,
        '&.Mui-checked': {
          color,
        },
      }}
    />
  );
};

export default CategoryColorRadioGroup;
