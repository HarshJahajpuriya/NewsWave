import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';  

export default function NewsCard({ title, description, url, imageUrl, source, time }) {
  return (
    <Badge badgeContent={source} color="secondary" anchorOrigin={{ vertical: "top", horizontal: 'center' }} sx={{ textAlign: 'left' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          image={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX03kdEQbZj1BhJN-v6IDViylpWdYP_0zbQQ&usqp=CAU'}
          title={title.slice(0, 24) + "..."}
          sx={{ height: 280 }}
        />
        <Typography variant='body2' color="GrayText" align='right'>
          <small >{new Date(time).toUTCString()}</small>
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={url} target="_blank" size="small" variant='outlined'>Read more</Button>
        </CardActions>
      </Card>
    </Badge>
  );
}