import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogActions, IconButton, Divider } from '@mui/material';

import { CategoryColor } from '../../types/workout';
import CategoryModalBody from './CategoryModalBody';
import { CloseIcon } from '../Icon';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
  categorycolor: CategoryColor[];
  onUpdateCategoryColorPair: (userId: number | null, categoryColorPair: CategoryColor[]) => void;
};

const CustomizedDialogs = ({ categorycolor, onUpdateCategoryColorPair }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categoriesColors, setCategoriesColors] = React.useState(categorycolor);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    onUpdateCategoryColorPair(17, categoriesColors);
    setIsOpen(false);
  };
  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={isOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Modal
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant='middle' />
        <div className='category-modal-wrapper'>
          {categoriesColors.map((pair) => (
            <CategoryModalBody
              category={pair.category}
              color={pair.color}
              key={`${pair.category}-${pair.color}`}
              setCategoriesColors={setCategoriesColors}
              currentState={categoriesColors}
            />
          ))}
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <style jsx>
        {`
          .category-modal-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
};

export default CustomizedDialogs;
