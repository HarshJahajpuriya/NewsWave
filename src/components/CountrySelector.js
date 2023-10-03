import * as React from 'react';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import countries from '../utils/constants/countries';

export default function TmpCountrySelector({ changeCountry }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState({ code: 'IN', label: 'India', phone: '91' });
  const [filteredCountries, setFilteredCountries] = React.useState(countries);
  
  const open = Boolean(anchorEl);
  
  const filterCountries = (el) => {
    if(el.target.value.trim().length === 0) {
      setFilteredCountries(countries);
      return
    }
    let tmpCountries = countries.filter(country => {
      return (country.label.toLowerCase().includes(el.target.value.trim().toLowerCase()));
    })
    setFilteredCountries(tmpCountries);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setFilteredCountries(countries)
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'inline-block', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Change Country">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
              alt=""
            />
            <ArrowDropDownIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            overflowY: 'auto'
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <TextField
          sx={{ color: 'white', height: '56px', width: '100%' }}
          label="Search country"
          onChange={filterCountries}
        />
            
        </MenuItem>
        <Divider />
        <List>

        {
          filteredCountries.map((country) => {
            return (
              <Box 
                key={country.code} 
                onClick = {() => {
                  setCountry(country)
                  changeCountry(country)
                }}
                sx={{ 
                  cursor: 'pointer',
                  '& :hover': {
                    backgroundColor: 'whitesmoke'
                  }
                }}
              >
              <ListItem  onClick={handleClose}>
                <ListItemAvatar>
                  <img
                    style={{ paddingRight: '12px' }}
                    loading="lazy"
                    width="26"
                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                    alt=""
                  />
                </ListItemAvatar>
                <ListItemText>
                  {country.label} ({country.code})
                </ListItemText>
              </ListItem>
              </Box>
            )
          })
        }
        </List>
      </Menu>
    </React.Fragment>
  );
}
