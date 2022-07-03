import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TweetInput from './tweetInput';

const Feed = ({ isAccConnected }) => (
  <Grid container direction='column' display='flex' flexShrink={1} padding={'20px'} height={'100%'}>
    <Typography variant='h5' fontWeight={600} lineHeight={'60px'}> Home </Typography>
    {isAccConnected && <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
      flexDirection: 'column',
    }}>
      <Button color='primary' variant='contained' fullWidth={false} type={'submit'} sx={{
        textTransform: 'none', marginBottom: '10px',
      }}>
        Connect to a Metamask account first
      </Button>
      <Typography variant='caption'> Connect to Goerly chain. If you disconnect, reload the page </Typography>
    </div>}
    <TweetInput isDisabled={isAccConnected} />
  </Grid>);

Feed.propTypes = {
  isAccConnected: PropTypes.bool.isRequired, account: PropTypes.string,
};

export default Feed;
