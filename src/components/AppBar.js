import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AppBarMenu from './AppBarMenu';
import CATEGORIES from '../utils/contants/category';
import CountrySelect from './CountrySelector';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ updateCategory, updateQuery }) {

  const changeCategory = (ev) => {
    updateCategory(ev.target.id);
  }

  const queryNews = (ev) => {
    updateQuery(ev.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', zIndex: 2, top: 0, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <AppBarMenu updateCategory={updateCategory} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            NewsWave
            {/* <CountrySelect /> */}
          </Typography>
          
          <Box sx={{ display: { md: 'none', lg: 'block', sm: 'none', xs: 'none' } }}>
            {CATEGORIES.map((item) => (
              <Button id={item} key={item} sx={{ color: '#fff' }} onClick={changeCategory}>
                {item}
              </Button>
            ))}
          </Box>
          
          <Search
            sx={{ mr: 1, display: { md: 'block', sm: 'block', xs: 'none' } }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Keyword..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={queryNews}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
