import React from 'react';

import SideMenu from '../../components/SideMenu/User';
import Table from '../../components/Table';
import Tabs from '../../components/Tabs/user';

const index = () => {
  return (
    <>
      <SideMenu />
      <Tabs>
        <Table />
        Weekly Schedule will come here
      </Tabs>
    </>
  );
};

export default index;
