import { TextField } from '@mui/material';
import React from 'react';

export enum textMargin {
  NONE = 'none',
  NORMAL = 'normal',
  DENSE = 'dense',
}
type Props = {
  margin: textMargin | undefined;
  required?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
  id: string;
  label: string;
  name: string;

  onChange: (input: string) => void;
};

const TextFieldInput = ({
  margin,
  required = true,
  fullWidth = true,
  autoFocus = true,
  autoComplete,
  type,
  id,
  label,
  name,
  onChange,
}: Props) => {
  return (
    <TextField
      margin={margin}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={name}
      autoFocus={autoFocus}
      type={type}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextFieldInput;
