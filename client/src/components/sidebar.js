import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { IconButton } from '@mui/material';

const Sidebar = () => (<div style={{
  width: 400,
  display: 'flex',
  padding: '20px',
  height: '100%',
  borderRight: '1px solid #e1e8ed',
  alignItems: 'baseline',
}}>
  <IconButton sx={{
    fontSize: '48px', color: '#55acee',
  }}>
    <TwitterIcon fontSize={'inherit'} />
  </IconButton>

</div>);

export default Sidebar;
