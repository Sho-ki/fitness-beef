import React from 'react';

import SideMenu from '../../components/SideMenu/User';
import Table from '../../components/Table';
import WeeklySchedule from '../../components/WorkoutWeek';

const index = () => {
  return (
    <>
      <SideMenu />
      {/* <Table /> */}
      <WeeklySchedule />
    </>
  );
};

export default index;
