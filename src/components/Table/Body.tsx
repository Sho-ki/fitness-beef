import React from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';

interface Row {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}
interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

type Props = {
  rows: readonly Row[];
  columns: readonly Column[];
  page: number;
  rowsPerPage: number;
};

const Body = ({ rows, columns, page, rowsPerPage }: Props) => {
  //   console.log('rows', rows);
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
              {columns.map((column) => {
                console.log('row', row);
                console.log('column', column);
                console.log(column.id + ': ' + row[column.id]);
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default Body;
