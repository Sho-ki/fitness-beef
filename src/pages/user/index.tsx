import React from 'react';

import Table from '../../components/Table';
import WeeklySchedule from '../../components/WorkoutWeek';
import Tabs from '../../components/Tabs/user';
import Header from '../../components/Header';

const index = () => {
  return (
    <>
      <Header />
      <Tabs>
        <Table />
        <WeeklySchedule />
      </Tabs>
    </>
  );
};

export default index;
