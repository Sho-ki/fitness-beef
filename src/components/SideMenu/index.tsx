import * as React from 'react';
import Link from 'next/link';
import { Icon } from '@mui/material';
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
    <>
      <Link href={href}>
        <a>
          {icon ? (
            <div className='sidebar-menu'>
              <Icon component={icon} />
              {label}
            </div>
          ) : (
            <div>{label}</div>
          )}
        </a>
      </Link>
      <style jsx>{css}</style>
    </>
  );
};

export default Drawer;
