import * as React from 'react';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Grid } from './index';
import { Props } from './index';
import Box from '@mui/material/Box';

type Data = {
  schedules: Props[];
};

type arrangedData = {
  [key: string]: Props[];
};

const Cell = ({ schedules }: Data) => {
  const arrangedData: arrangedData = {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  };

  schedules.sort((a, b) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0));
  schedules.map((schedule) => {
    arrangedData[schedule.workoutDayOfWeek].push(schedule);
  });
  return (
    <>
      {Object.keys(arrangedData).map((schedule) => (
        <Grid item xs key={schedule} sx={{ minWidth: 125 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& > :not(style)': {
                borderColor: 'black',
                width: '99%',
                margin: '0 auto',
                marginBottom: '5px',
              },
            }}
          >
            {schedule}
            {arrangedData[schedule].length > 0 ? (
              arrangedData[schedule].map((item) => (
                <Card
                  key={item.order}
                  variant='outlined'
                  sx={{ minHeight: 100, backgroundColor: item.color }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 12, textAlign: 'left' }} color='text.secondary' gutterBottom>
                      {item.workoutCategory}
                    </Typography>
                    <Typography
                      component='div'
                      sx={{
                        fontSize: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.workoutItem}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card
                variant='outlined'
                sx={{
                  minHeight: 100,
                  backgroundColor: 'gray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent>
                  <Typography component='div' sx={{ fontSize: 18 }}>
                    No Workout!
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default Cell;
