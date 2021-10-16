import * as React from 'react';
import MaterialTable from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Header from './Header';
import Body from './Body';

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  format?: (value: number) => string;
};

const columns: readonly Column[] = [
  { id: 'category', label: 'category', minWidth: 170 },
  { id: 'workoutItem', label: 'Workout Item', minWidth: 100 },
  {
    id: 'amount',
    label: 'amount',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

export type Row = {
  category: string;
  workoutItem: string;
  reps: number;
  sets: number;
  [key: string]: string | number;
};

function createData(category: string, workoutItem: string): Row {
  const reps = Math.floor(Math.random() * 10) + 1;
  const sets = Math.floor(Math.random() * 4) + 1;
  return { category, workoutItem, reps, sets };
}

const rows: Row[] = [
  createData('India', 'IN'),
  createData('China', 'CN'),
  createData('Italy', 'IT'),
  createData('United States', 'warm up'),
  createData('Canada', 'CA'),
  createData('Australia', 'AU'),
  createData('Germany', 'DE'),
  createData('Ireland', 'IE'),
  createData('Mexico', 'MX'),
  createData('Japan', 'JP'),
];

const Table = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '50%', overflow: 'hidden', margin: '0 auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MaterialTable stickyHeader aria-label='sticky table'>
          <Header columns={columns} />
          <Body
            rows={rows}
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </MaterialTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;
