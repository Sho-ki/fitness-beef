import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

type Props = {
  children: React.ReactNode[];
};

const UserTabs = ({ children }: Props) => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '80%',
        typography: 'body1',
        margin: '0 auto',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label='schedule-tabs'
            TabIndicatorProps={{
              style: { backgroundColor: 'red' },
            }}
          >
            <Tab label='Daily Schedule' value='0' style={{ padding: '10px' }} />
            <Tab
              label='Weekly Schedule'
              value='1'
              style={{ padding: '10px' }}
            />
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
