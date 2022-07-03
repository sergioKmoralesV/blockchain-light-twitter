import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Typography } from '@mui/material';

const Widgets = () => (<div style={{
  width: 400,
  display: 'flex',
  padding: '20px 0',
  height: '100%',
  borderLeft: '1px solid #e1e8ed',
  flexDirection: 'column',
}}>
  <Typography variant='h5' fontWeight={600} lineHeight={'60px'}
              marginLeft={'20px'}
  >
    {"What's new"}
  </Typography>
  <div style={{
    display: 'flex',
    flexShrink: 1,
    height: 'calc(100% - 60px)',
  }}>
    <TwitterTimelineEmbed
      sourceType='profile'
      screenName='blockchain'
      options={{
        width: 400,
      }}
      autoHeight
      noHeader
      noFooter
    />
  </div>
</div>);

export default Widgets;
