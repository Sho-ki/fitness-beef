import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Table from '../../components/Table';

type Props = {
  children: React.ReactNode[];
};

const UserTabs = ({ children }: Props) => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%', typography: 'body1', margin: '0 auto' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label='lab API tabs example'
            indicatorColor='primary'
          >
            <Tab label='Item One' value='0' />
            <Tab label='Item Two' value='1' />
          </TabList>
        </Box>
        {children.map((child, idx) => (
          <TabPanel key={idx.toString()} value={idx.toString()}>
            {child}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default UserTabs;
