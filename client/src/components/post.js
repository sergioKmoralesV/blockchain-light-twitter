import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, IconButton, Stack, Typography, Tooltip,
} from '@mui/material';
import { Edit, Delete } from '@material-ui/icons';
import { baseColor, secondaryColor } from '../lib/theme';
import EditPost from './editPost';

const Post = forwardRef((props, ref) => {
  const { tweetText, username, personal, onDelete, id, onSubmitFunc } = props;

  const [openEdit, setOpenEdit] = useState(false);

  return (<Grid ref={ref} width={'100%'} padding={'12px 16px'} borderBottom={`1px solid ${secondaryColor}`}>
    <Stack sx={{
      padding: '0 20px',
    }}>
      <Typography variant='subtitle1' fontWeight={600} fontSize={14}>
        {username}
      </Typography>
      {!openEdit && <Typography>
        {tweetText}
      </Typography>}
      {openEdit && <EditPost onCancel={() => setOpenEdit(false)}
                             onSubmitFunc={onSubmitFunc}
                             tweet={{
                               tweetText, username, personal, id,
                             }}
      />}
      <Grid container width={'100%'} direction={'row'} justifyContent={'space-around'}
            alignItems={'center'} display={'flex'}>
        <Tooltip placement={'top'} title={personal ? 'Edit tweet' : 'This is not your tweet'}>
          <IconButton disabled={!personal || openEdit} sx={{
            width: 36,
            height: 36,
            '& :hover': {
              color: baseColor,
            },
          }} onClick={() => setOpenEdit(true)}
          >
            <Edit fontSize={'inherit'} />
          </IconButton>
        </Tooltip>
        <Tooltip placement={'top'} title={personal ? 'Delete tweet' : 'This is not your tweet'}>
          <IconButton disabled={!personal} sx={{
            width: 36,
            height: 36,
            '& :hover': {
              color: baseColor,
            },
          }} onClick={() => onDelete(id)}
          >
            <Delete fontSize={'inherit'} />
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
  onSubmitFunc: PropTypes.func,
};

Post.defaultProps = {
  personal: false,
};

Post.displayName = 'Post';

export default Post;
