import React from 'react';

import SideMenu from '../../components/SideMenu/User';
import Table from '../../components/Table';
import WeeklySchedule from '../../components/WorkoutWeek';
import Tabs from '../../components/Tabs/user';

const index = () => {
  return (
    <>
      <SideMenu />
      <Tabs>
        <Table />
        <WeeklySchedule />
      </Tabs>
    </>
  );
};

export default index;
