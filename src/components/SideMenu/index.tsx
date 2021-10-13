import * as React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { List, Icon, ListItemIcon, ListItemText } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

import css from './baseStyle';

type Props = {
  as: string;
  className?: string;
  href: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  label: string;
};

const Drawer: React.FC<Props> = ({
  as,
  className,
  href,
  icon,
  label,
}: Props) => {
  return (
    <Box
      sx={{
        width: 300,
        display: 'flex',
        '&:hover': { backgroundColor: 'red' },
      }}
    >
      <Link href={href}>
        <a className='sidebar-links'>
          <List>
            {icon ? (
              <div className='sidebar-menu'>
                <ListItemIcon key={label}>
                  <Icon component={icon} />
                </ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </div>
            ) : (
              <ListItemText>{label}</ListItemText>
            )}
          </List>
        </a>
      </Link>
      <style jsx>{css}</style>
    </Box>
  );
};

export default Drawer;
