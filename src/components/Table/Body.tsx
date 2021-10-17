import React from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';

import { Row, Column } from './index';

type Props = {
  rows: readonly Row[];
  columns: readonly Column[];
  page: number;
  rowsPerPage: number;
};

const Body: React.FC<Props> = ({ rows, columns, page, rowsPerPage }: Props) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role='checkbox' tabIndex={-1} key={row.category}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align || 'center'}>
                    {column.id === 'amount'
                      ? `${row.reps} x ${row.sets}`
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
