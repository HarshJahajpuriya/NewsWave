import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CATEGORIES from '../utils/constants/category';

export default function AppBarMenu({ updateCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (ev) => {
    setAnchorEl(null);
    updateCategory(ev.currentTarget.id)
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { lg: 'none', md: 'block' } }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {CATEGORIES.map((item) => (
          <span key={item}>
            <MenuItem id={item} onClick={handleClose}>{item}</MenuItem>
            <Divider />
          </span>          
        ))}
      </Menu>
    </div>
  );
}