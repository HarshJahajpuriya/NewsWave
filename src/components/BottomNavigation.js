import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

export default function BottomNav({ loadNextPage, loadPreviousPage, pageNumber, totalPages }) {
  
  const next = () => {
    loadNextPage();
  }

  const prev = () => {
    loadPreviousPage(); 
  }

  return (
    
    <Box sx={{ width: '100%', display: 'block',textAlign: 'center', mt: 1, borderTop: '1px solid whitesmoke', position: 'fixed', bottom: 0, zIndex: 1}}>
      <BottomNavigation sx={{ justifyContent: 'space-around' }}>
        <Button onClick={prev} disabled={pageNumber <= 1}><SkipPreviousIcon /> </Button>
        <div style={{marginTop: "12px"}}>{pageNumber}/{totalPages}</div>
        <Button onClick={next} disabled={pageNumber+1 > totalPages}><SkipNextIcon /> </Button>
      </BottomNavigation>
    </Box>
  );
}