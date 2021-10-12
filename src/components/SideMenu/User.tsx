import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
//icons. this will be organized in one file under Icon directory
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

import DrawerMenu from './index';

enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

const DrawerUser = () => {
  const [state, setState] = React.useState(false);
  const toggleMenu = React.useCallback(() => {
    setState(!state);
  }, [state]);
  return (
    <>
      <React.Fragment key={Position.LEFT}>
        <Button onClick={toggleMenu}>This is a test button</Button>
        <Drawer anchor={Position.LEFT} open={state} onClose={toggleMenu}>
          <DrawerMenu
            href='/'
            icon={AccessibilityNewIcon}
            as={`/`}
            label={'ROOT'}
          />
          <Divider />
          <DrawerMenu href='/' icon={HomeIcon} as={`/`} label={'HOME'} />
          <DrawerMenu href='/' icon={PeopleIcon} as={`/`} label={'PEOPLE'} />
          <DrawerMenu href='/' icon={SettingsIcon} as={`/`} label={'SETTING'} />
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default DrawerUser;
