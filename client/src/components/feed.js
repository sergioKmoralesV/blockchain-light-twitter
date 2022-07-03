import React from 'react';
import { Grid, Typography } from '@mui/material';
import TweetInput from './tweetInput';

const Feed = () => (
  <Grid container direction='column' display='flex' flexShrink={1} padding={'20px'} height={'100%'}>
    <Typography variant='h5' fontWeight={600} lineHeight={'60px'}> Home </Typography>
    <TweetInput />
  </Grid>
);

export default Feed;
