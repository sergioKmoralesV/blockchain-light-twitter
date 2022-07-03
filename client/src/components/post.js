import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, IconButton, Stack, Typography, Tooltip,
} from '@mui/material';
import Trash from '@material-ui/icons/Delete';
import { baseColor, secondaryColor } from '../lib/theme';

const Post = forwardRef((props, ref) => {
  const { tweetText, username, personal, onDelete, id } = props;

  return (<Grid ref={ref} width={'100%'} padding={'12px 16px'} borderBottom={`1px solid ${secondaryColor}`}>
    <Stack sx={{
      padding: '0 20px',
    }}>
      <Typography variant='subtitle1' fontWeight={600} fontSize={14}>
        {username}
      </Typography>
      <Typography>
        {tweetText}
      </Typography>
      <Grid container width={'100%'} direction={'column'} justifyContent={'space-between'}
            alignItems={'center'} display={'flex'}>
        <Tooltip placement={'top'} title={personal ? 'Delete tweet' : 'This is not your tweet'}>
          <IconButton disabled={!personal} sx={{
            width: 36,
            height: 36,
            '& :hover': {
              color: baseColor,
            },
          }} onClick={() => onDelete(id)}
          >
            <Trash fontSize={'inherit'} />
          </IconButton>
        </Tooltip>
      </Grid>
    </Stack>
  </Grid>);
});

Post.propTypes = {
  id: PropTypes.number.isRequired,
  tweetText: PropTypes.string.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  personal: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

Post.defaultProps = {
  personal: false,
};

Post.displayName = 'Post';

export default Post;
