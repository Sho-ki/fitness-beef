import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { DateTime } from 'luxon';

import css from './baseStyle';
import SideMenu from '../../components/SideMenu/User';
import { Hamburger, OpenHamburger } from '../Icon';

const Header = () => {
  const [date, setDate] = React.useState<string>('');
  const [sideMenuStatus, setsideMenuStatus] = React.useState<boolean>(false);
  const toggleSideMenu = React.useCallback(() => {
    setsideMenuStatus(!sideMenuStatus);
  }, [sideMenuStatus]);
  React.useEffect(() => {
    const today: DateTime = DateTime.now();
    const stringDate: string = DateTime.fromISO(today.toString())
      .setLocale('jp')
      .toFormat('yyyy/MM/dd (EEE)');
    setDate(stringDate);
  }, []);
  return (
    <div className='header-container'>
      <div className='header'>
        <IconButton type='button' onClick={() => toggleSideMenu()}>
          {!sideMenuStatus ? (
            <Hamburger style={{ color: '#990F22' }} />
          ) : (
            <OpenHamburger style={{ color: '#990F22' }} />
          )}
        </IconButton>
        {date}
      </div>
      <SideMenu isOpen={sideMenuStatus} onClose={() => toggleSideMenu()} />
      <style jsx>{css}</style>
    </div>
  );
};

export default Header;
