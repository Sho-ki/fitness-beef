import * as React from 'react';
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerUser = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <React.Fragment key={Position.LEFT}>
        <Drawer
          anchor={Position.LEFT}
          open={isOpen}
          onClose={onClose}
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
