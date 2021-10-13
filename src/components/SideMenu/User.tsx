import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import DrawerMenu from './index';
import {
  AccessibilityNewIcon,
  HomeIcon,
  PeopleIcon,
  SettingsIcon,
} from '../Icon/index';

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
        <Drawer
          anchor={Position.LEFT}
          open={state}
          onClose={toggleMenu}
          sx={{ width: 200 }}
        >
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
